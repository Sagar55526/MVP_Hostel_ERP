from flask import Blueprint, request, jsonify
from db import db
from models.models import Floor, Bed, Room

floor_bp = Blueprint('floor_bp', __name__)

@floor_bp.route('/floors', methods=['GET'])
def get_floors():
    try:
        floors = Floor.query.all()

        floors_list = []
        for floor in floors:
            floors_list.append({
                "id": floor.id,
                "name": floor.name,
                "floor_no": floor.floor_no,
                "rooms": [
                    {
                        "id": room.id,
                        "beds": [
                            {
                                "id": bed.id,
                                "bed_no": bed.bed_no, 
                                "status": bed.status,
                                "student": {
                                    "name": bed.student.name if bed.student else None,
                                    "student_id": bed.student.studentI if bed.student else None 
                                } if bed.student else None
                            }
                            for bed in room.beds
                        ]
                    }
                    for room in floor.rooms
                ]
            })

        return jsonify({"floors": floors_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@floor_bp.route('/api/floors', methods=['POST'])
def add_floor():
    try:
        data = request.get_json()
        hostel_id = data.get("hostel_id")
        floor_no = data.get("floor_no")
        name = data.get("name")

        if not hostel_id or not floor_no or not name:
            return jsonify({"error": "hostel_id, floor_no and name are required"}), 400

        # Check if floor_no already exists for this hostel (optional)
        existing = Floor.query.filter_by(hostel_id=hostel_id, floor_no=floor_no).first()
        if existing:
            return jsonify({"error": "Floor number already exists for this hostel"}), 400

        new_floor = Floor(hostel_id=hostel_id, floor_no=floor_no, name=name)
        db.session.add(new_floor)
        db.session.commit()

        return jsonify({"message": "Floor added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
