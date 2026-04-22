from models.Teacher import Teacher

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4C"


class Subject:
    def __init__(self, id: int, name: str, teacher: Teacher):
        self._id = id
        self.name = name
        self.teacher = teacher
        
    def __str__(self):
        return f"{self.name} {self.teacher}"