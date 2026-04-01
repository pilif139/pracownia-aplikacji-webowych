from student_class import Student
from course_class import Course


if __name__ == "__main__":
    students_file = open("./Python - zadanie 2/students.txt", "r")
    courses_file = open("./Python - zadanie 2/courses.txt", "r")
    
    students : list[Student] = []
    courses : list[Course] = []
    
    for line in students_file:
        id, name, surname, age = line.strip().split(",")
        students.append(Student(int(id), name, surname, int(age)))
        
    for line in courses_file:
        student_id, name = line.strip().split(",")
        course = next((c for c in courses if c.name == name), None)
        if course is None:
            course = Course(name)
            courses.append(course)
        student = next((s for s in students if s.id == int(student_id)), None)
        if student:
            student.enroll(course)

    students_file.close()
    courses_file.close()
    
for student in students:
    print(student)
    f = open(f"{student.name.lower()}_{student.surname.lower()}.txt", "w")
    f.write("Kursy:\n")
    for course in student.courses:
        f.write(f" - {course.name}\n")