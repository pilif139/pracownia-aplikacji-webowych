from models.Student import Student
from models.Subject import Subject


__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4C"


class Grades:
    def __init__(self, student: Student, subject: Subject):
        self.grades: list[int] = []
        self.student = student
        self.subject = subject
    
    def add_grade(self, grade: int):
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)
        
    @property
    def average(self) -> float:
        if not self.grades:
            return 0.0
        return round(sum(self.grades) / len(self.grades), 2)