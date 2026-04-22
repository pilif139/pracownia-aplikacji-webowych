from datetime import date

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4C"


class Student:
    def __init__(self, id: int, first_name: str, last_name: str, birth_date: date):
        self._id = id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date
        
    @property
    def age(self) -> int:
        today = date.today()
        age = today.year - self.birth_date.year
        return age
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.age})"