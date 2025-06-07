from flask import Blueprint, request, jsonify
from db import db
from models.models import Floor, Bed, Room, Student

bed_bp = Blueprint('bed_bp', __name__)

@bed_bp.route('/floorsOnly', methods=['GET'])
def get_floors():
    floors = Floor.query.all()
    return jsonify([{'id': f.id, 'name': f.name} for f in floors])

# @bed_bp.route('/rooms/floor/<int:floor_id>', methods=['GET'])
# def get_rooms_by_floor(floor_id):
#     rooms = Room.query.filter_by(floor_id=floor_id).all()
#     return jsonify([
#         {
#             'id': room.id,
#             'room_no': room.room_no
#         } for room in rooms
#     ])


@bed_bp.route('/beds/room/<int:room_id>', methods=['GET'])
def get_beds_by_room(room_id):
    beds = Bed.query.filter_by(room_id=room_id).all()
    return jsonify([
        {
            'id': bed.id,
            'bed_no': bed.bed_no,
            'status': bed.status,
            'student': {
                'studentId': bed.student.studentId,  # <--- Changed here
                'name': bed.student.name
            } if bed.student else None
        } for bed in beds
    ])


@bed_bp.route('/beds/<int:bed_id>/assign', methods=['PUT'])
def assign_student(bed_id):
    data = request.get_json()
    student_id = data.get('student_id')

    bed = Bed.query.get(bed_id)
    if not bed:
        return jsonify({'error': 'Bed not found'}), 404

    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    bed.student_id = student_id
    bed.status = 'occupied'
    db.session.commit()

    return jsonify({'message': 'Student assigned to bed'})

@bed_bp.route('/beds/<int:bed_id>/vacate', methods=['PUT'])
def vacate_bed(bed_id):
    bed = Bed.query.get(bed_id)
    if not bed:
        return jsonify({'error': 'Bed not found'}), 404

    bed.student_id = None
    bed.status = 'vacant'
    db.session.commit()

    return jsonify({'message': 'Bed vacated'})

