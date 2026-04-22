import datetime
import json
from pathlib import Path

from year_grade import year_grade
from models.Grades import Grades
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4C"


teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

data_dir = Path(__file__).resolve().parent.parent / "spr_python_praktyka"

f_teachers = open(data_dir / "teachers.txt", "r")
for line in f_teachers:
    id, first_name, last_name = line.strip().split()
    teacher = Teacher(int(id), first_name, last_name)
    teachers.append(teacher)
f_teachers.close()

f_subjects = open(data_dir / "subjects.txt", "r")
for line in f_subjects:
    id, name, teacher_id = line.strip().split()
    teacher = None
    for t in teachers:
        if t._id == int(teacher_id):
            teacher = t
            break
    if teacher is None:
        print(f"Teacher with id {teacher_id} not found for subject {name}")
        continue
    subject = Subject(int(id), name, teacher)
    subjects.append(subject)
f_subjects.close()

f_students = open(data_dir / "students.txt", "r")
for line in f_students:
    id, first_name, last_name, birth_date_from_file = line.strip().split()
    birth_date = datetime.datetime.strptime(birth_date_from_file, "%Y-%m-%d").date()
    student = Student(int(id), first_name, last_name, birth_date)
    students.append(student)
f_students.close()

f_grades = open(data_dir / "grades.txt", "r")
for line in f_grades:
    student_id, subject_id, grades_from_file = line.strip().split()
    grades_from_file = grades_from_file.split(",")
    student = None
    for s in students:
        if s._id == int(student_id):
            student = s
            break
    if student is None:
        print(f"Student with id {student_id} not found for grades")
        continue
    subject = None
    for s in subjects:
        if s._id == int(subject_id):
            subject = s
            break
    if subject is None:
        print(f"Subject with id {subject_id} not found for grades")
        continue
    grade = Grades(student, subject)
    for g in grades_from_file:
        grade.add_grade(int(g))
    grades.append(grade)
f_grades.close()

print("Oceny:")
for grade in grades:
    print(f"{grade.student} - {grade.average}")
    
students_json = []
    
for student in students:
    print(f"{student}:")
    student_json = {}
    for grade in grades:
        if grade.student._id == student._id:
            grade_json = {
                "Oceny": grade.grades,
                "Średnia": grade.average,
                "Ocena końcowa": year_grade(grade.average)
            }
            print(f"\t{grade.subject.name}:")
            print(f"\t\tOceny: {grade.grades}")
            print(f"\t\tŚrednia: {grade.average}")
            print(f"\t\tOcena końcowa: {year_grade(grade.average)}")
            student_json[grade.subject.name] = grade_json
    students_json.append({
        f"{student}" : student_json
    })
    print("")
    
    with open("students_grades.json", "w") as f:
        json.dump(students_json, f, indent=4, ensure_ascii=False)
    
print("="*50)
print("")

subjects_json = []

for subject in subjects:
    for grade in grades:
        if grade.subject._id == subject._id and grade.subject.teacher._id == subject.teacher._id:
            print(f"{subject.name}:")
            print(f"\tNauczyciel: {subject.teacher}")
            grade_json = {
                "Nauczyciel" : str(subject.teacher),
                "Oceny": grade.grades,
                "Średnia": grade.average
            }
            print(f"\t\tOceny: {grade.grades}")
            print(f"\t\tŚrednia: {grade.average}")
            subjects_json.append({
                f"{subject.name}" : grade_json
            })
    print("")

with open("subjects.json", "w") as f:
    json.dump(subjects_json, f, indent=4, ensure_ascii=False)
