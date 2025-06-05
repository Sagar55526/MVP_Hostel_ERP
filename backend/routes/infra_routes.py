from flask import request, jsonify, Blueprint
from models.bed import Bed
from models.floor import Floor
from models.room import Room
from models.student import Student
from flask_cors import cross_origin
from db import db

infra_bp = Blueprint("infra", __name__) 


@infra_bp.route('/api/floors')
def get_floors():
    floors = Floor.query.all()
    return jsonify([{"id": f.id, "name": f.name} for f in floors])

@infra_bp.route('/api/rooms/<int:floor_id>')
def get_rooms(floor_id):
    rooms = Room.query.filter_by(floor_id=floor_id).all()
    return jsonify([{"id": r.id, "name": r.name} for r in rooms])

@infra_bp.route('/api/beds/<int:room_id>')
def get_beds(room_id):
    beds = Bed.query.filter_by(room_id=room_id).all()
    return jsonify([
        {
            "id": b.id,
            "bed_number": b.bed_number,
            "student": {
                "id": b.student.id,
                "name": b.student.name,
                "photo": b.student.photo
            } if b.student else None
        }
        for b in beds
    ])


@infra_bp.route('/api/assign-bed', methods=['POST'])
def assign_bed():
    data = request.get_json()
    bed_id = data.get("bedId")
    student_id = data.get("studentId")

    bed = Bed.query.get(bed_id)
    student = Student.query.get(student_id)

    if not bed or not student:
        return jsonify({"error": "Bed or Student not found"}), 404

    if bed.student_id:
        return jsonify({"error": "Bed is already assigned"}), 400

    bed.student_id = student.id
    db.session.commit()

    return jsonify({"message": "Bed assigned successfully", "bedId": bed_id, "studentId": student_id}), 200

@infra_bp.route('/api/vacate-bed/<int:bed_id>', methods=['POST'])
def vacate_bed(bed_id):
    bed = Bed.query.get(bed_id)
    if not bed:
        return jsonify({"error": "Bed not found"}), 404

    bed.student_id = None
    db.session.commit()

    return jsonify({"message": "Bed vacated successfully", "bedId": bed_id}), 200

@infra_bp.route('/api/rooms', methods=["POST"])
@cross_origin()
def add_room():
    data = request.get_json()

    room_name = data.get("name")
    capacity = data.get("capacity")
    floor_id = data.get("floor_id")

    if not room_name or not capacity or not floor_id:
        return jsonify({"error": "Missing fields"}), 400

    try:
        new_room = Room(name=room_name, floor_id=floor_id, capacity=capacity)
        db.session.add(new_room)
        db.session.commit()

        for i in range(1, capacity + 1):
            bed = Bed(bed_number=i, room_id=new_room.id)
            db.session.add(bed)

        db.session.commit()

        return jsonify({"message": "Room created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

