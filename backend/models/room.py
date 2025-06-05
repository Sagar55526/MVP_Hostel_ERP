from db import db

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    floor_id = db.Column(db.Integer, db.ForeignKey('floors.id'), nullable=False)
    beds = db.relationship('Bed', backref='room', lazy=True)
    capacity = db.Column(db.Integer, nullable=False)  # Add this line
    