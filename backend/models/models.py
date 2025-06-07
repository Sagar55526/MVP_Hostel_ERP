from db import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    studentId = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100))
    fatherName = db.Column(db.String(100))
    dob = db.Column(db.Date)
    gender = db.Column(db.String(10))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    emergencyContact = db.Column(db.String(20))
    aadhar = db.Column(db.String(12))
    address = db.Column(db.Text)
    course = db.Column(db.String(100))
    photo = db.Column(db.String(200))

class Hostel(db.Model):
    __tablename__ = 'hostels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.Text)
    capacity = db.Column(db.Integer)
    
    floors = db.relationship('Floor', backref='hostel', lazy=True)

class Floor(db.Model):
    __tablename__ = 'floors'
    id = db.Column(db.Integer, primary_key=True)
    hostel_id = db.Column(db.Integer, db.ForeignKey('hostels.id'))
    floor_no = db.Column(db.Integer)
    name = db.Column(db.String(100))
    
    rooms = db.relationship('Room', backref='floor', lazy=True)


class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    floor_id = db.Column(db.Integer, db.ForeignKey('floors.id'))
    room_no = db.Column(db.String(20))
    capacity = db.Column(db.Integer)

    __table_args__ = (
        db.UniqueConstraint('floor_id', 'room_no', name='unique_room_no_per_floor'),
    )

    beds = db.relationship('Bed', backref='room', lazy=True)


class Bed(db.Model):
    __tablename__ = 'beds'
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    bed_no = db.Column(db.String(10))
    status = db.Column(db.String(10))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    
    student = db.relationship('Student', backref='bed', uselist=False)
