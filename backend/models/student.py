from db import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    studentId = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    fatherName = db.Column(db.String(100))
    dob = db.Column(db.String(20))
    gender = db.Column(db.String(10))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(15))
    emergencyContact = db.Column(db.String(15))
    aadhar = db.Column(db.String(12))
    address = db.Column(db.String(300))
    course = db.Column(db.String(100))
    photo = db.Column(db.String(200))

    def __init__(self, studentId, name, fatherName, dob, gender, email, phone,
                 emergencyContact, aadhar, address, course, photo):
        self.studentId = studentId
        self.name = name
        self.fatherName = fatherName
        self.dob = dob
        self.gender = gender
        self.email = email
        self.phone = phone
        self.emergencyContact = emergencyContact
        self.aadhar = aadhar
        self.address = address
        self.course = course
        self.photo = photo  # ✅ assign photo
