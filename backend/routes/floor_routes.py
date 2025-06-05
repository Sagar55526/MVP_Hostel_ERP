# routes/floor_routes.py
from flask import Blueprint, request, jsonify
from models.floor import Floor
from db import db

floor_bp = Blueprint('floor_bp', __name__)

@floor_bp.route("/api/floors", methods=["POST"])
def add_floor():
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Floor name is required"}), 400

    new_floor = Floor(name=name)
    db.session.add(new_floor)
    db.session.commit()
    return jsonify({"message": "Floor added", "floor": {"id": new_floor.id, "name": new_floor.name}}), 201
