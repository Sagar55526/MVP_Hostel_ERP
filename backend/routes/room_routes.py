# routes/rooms.py

from flask import Blueprint, request, jsonify
from db import db
from models.models import Floor, Room, Bed

room_bp = Blueprint('room_bp', __name__)

@room_bp.route('/rooms/floor/<int:floor_id>', methods=['GET'])
def get_rooms_by_floor(floor_id):
    rooms = Room.query.filter_by(floor_id=floor_id).all()
    return jsonify([{'id': r.id, 'room_no': r.room_no} for r in rooms])


@room_bp.route('/rooms', methods=['POST'])
def add_room():
    try:
        data = request.get_json()
        room_no = data.get('room_no')
        floor_id = data.get('floor_id')
        capacity = int(data.get('capacity'))

        if not all([room_no, floor_id, capacity]):
            return jsonify({'error': 'Missing data'}), 400

        # Check if the floor exists
        floor = Floor.query.get(floor_id)
        if not floor:
            return jsonify({'error': 'Floor not found'}), 404

        # Create Room
        new_room = Room(room_no=room_no, floor_id=floor_id, capacity=capacity)
        db.session.add(new_room)
        db.session.flush()  # to get the new room ID before commit

        # Create Beds
        for i in range(capacity):
            bed = Bed(
                room_id=new_room.id,
                bed_no=chr(65 + i),  # A, B, C...
                status='vacant'
            )
            db.session.add(bed)

        db.session.commit()

        return jsonify({'message': 'Room added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

