from flask import Blueprint, request, jsonify, current_app
from models.models import Student  # ✅ fixed import
from db import db
import os
from werkzeug.utils import secure_filename
from datetime import datetime

student_bp = Blueprint("student_bp", __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")

@student_bp.route('/students', methods=['POST'])
def register_student():
    try:
        studentId = request.form.get('studentId')
        name = request.form.get('name')
        fatherName = request.form.get('fatherName')
        dob_str = request.form.get('dob')
        gender = request.form.get('gender')
        email = request.form.get('email')
        phone = request.form.get('phone')
        emergencyContact = request.form.get('emergencyContact')
        aadhar = request.form.get('aadhar')
        address = request.form.get('address')
        course = request.form.get('course')
        photo = request.files.get('photo')

        # Convert date string to datetime object
        dob = None
        if dob_str:
            dob = datetime.strptime(dob_str, '%Y-%m-%d')

        # Handle photo upload
        photo_filename = None
        if photo:
            ext = os.path.splitext(photo.filename)[1]
            photo_filename = secure_filename(f"{studentId}{ext}")
            upload_folder = current_app.config['UPLOAD_FOLDER']
            photo.save(os.path.join(upload_folder, photo_filename))

        # Create new student object
        new_student = Student(
            studentId=studentId,
            name=name,
            fatherName=fatherName,
            dob=dob,
            gender=gender,
            email=email,
            phone=phone,
            emergencyContact=emergencyContact,
            aadhar=aadhar,
            address=address,
            course=course,
            photo=photo_filename
        )

        db.session.add(new_student)
        db.session.commit()

        return jsonify({"message": "Student registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@student_bp.route('/students', methods=['GET'])
def get_students():
    try:
        # Get query params for sorting and filtering
        sort_by = request.args.get('sortBy', 'studentId')
        order = request.args.get('order', 'asc')
        course_filter = request.args.get('course', None)

        # Validate sort_by column to avoid SQL injection
        valid_sort_columns = {'studentId', 'name', 'course'}
        if sort_by not in valid_sort_columns:
            sort_by = 'studentId'

        # Start query
        query = Student.query

        # Apply course filter if present
        if course_filter:
            query = query.filter(Student.course.ilike(f"%{course_filter}%"))

        # Apply ordering
        sort_column = getattr(Student, sort_by)
        if order == 'desc':
            sort_column = sort_column.desc()
        else:
            sort_column = sort_column.asc()

        query = query.order_by(sort_column)

        students = query.all()

        # Serialize students data
        students_list = []
        for s in students:
            students_list.append({
                "id": s.id,
                "studentId": s.studentId,
                "name": s.name,
                "fatherName": s.fatherName,
                "dob": s.dob.isoformat() if s.dob else None,
                "gender": s.gender,
                "email": s.email,
                "phone": s.phone,
                "emergencyContact": s.emergencyContact,
                "aadhar": s.aadhar,
                "address": s.address,
                "course": s.course,
                "photo": s.photo
            })

        return jsonify({"students": students_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500