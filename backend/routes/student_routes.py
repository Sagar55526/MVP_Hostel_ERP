from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from models.student import Student
from flask_cors import cross_origin
from db import db
import os
import logging

student_bp = Blueprint("student", __name__)

logging.basicConfig(level=logging.DEBUG)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@student_bp.route("/api/register-student", methods=["POST"])
@cross_origin(origin='http://localhost:5173', supports_credentials=True)
def register_student():
    data = request.form  # form fields
    file = request.files.get("photo")  # uploaded photo file

    filename = None
    student_id = data.get("studentId")

    if file and allowed_file(file.filename) and student_id:
        # Get file extension safely
        ext = file.filename.rsplit('.', 1)[1].lower()
        # Construct filename as studentId + extension, e.g. S1234.jpg
        filename = secure_filename(f"{student_id}.{ext}")

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
    else:
        filename = None  # or handle missing/invalid photo

    new_student = Student(
        studentId=student_id,
        name=data.get("name"),
        fatherName=data.get("fatherName"),
        dob=data.get("dob"),
        gender=data.get("gender"),
        email=data.get("email"),
        phone=data.get("phone"),  # fixed typo here
        emergencyContact=data.get("emergencyContact"),
        aadhar=data.get("aadhar"),
        address=data.get("address"),
        course=data.get("course"),
        photo=filename
    )
    db.session.add(new_student)
    db.session.commit()

    return jsonify({"message": "Student registered successfully"})


@student_bp.route('/api/students', methods=['GET'])
@cross_origin(origin='http://localhost:5173', supports_credentials=True)
def get_students():
    # Optional query params
    sort_by = request.args.get('sort_by', 'studentId')  # default sort by studentId
    order = request.args.get('order', 'asc')  # asc or desc

    # Basic filtering example (can add more filters later)
    filters = []
    # e.g., filter by course
    course = request.args.get('course')
    if course:
        filters.append(Student.course.ilike(f'%{course}%'))

    query = Student.query.filter(*filters)

    # Apply sorting
    if order == 'desc':
        query = query.order_by(db.desc(getattr(Student, sort_by)))
    else:
        query = query.order_by(db.asc(getattr(Student, sort_by)))

    students = query.all()

    result = []
    for s in students:
        result.append({
            'id': s.id,
            'studentId': s.studentId,
            'name': s.name,
            'fatherName': s.fatherName,
            'dob': s.dob,
            'gender': s.gender,
            'email': s.email,
            'phone': s.phone,
            'emergencyContact': s.emergencyContact,
            'aadhar': s.aadhar,
            'address': s.address,
            'course': s.course,
            'photo': s.photo  # relative path or URL
        })
    return jsonify(result)
