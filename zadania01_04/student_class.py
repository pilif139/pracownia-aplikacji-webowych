from course_class import Course


class Student:
    def __init__(self, id, name, surname, age, courses: list[Course] = None):
        self._id = id
        self._name = name
        self._surname = surname
        self._age = age
        self._courses = courses if courses is not None else []
        
    @property
    def id(self):
        return self._id

    @property
    def name(self):
        return self._name
    
    @property
    def surname(self):
        return self._surname

    @property
    def age(self):
        return self._age
    
    @property
    def courses(self):
        return self._courses
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value
        
    @name.setter
    def name(self, value):
        if not value or value.strip() == "":
            raise ValueError("Name cannot be empty")
        self._name = value
        
    @surname.setter
    def surname(self, value):
        if not value or value.strip() == "":
            raise ValueError("Surname cannot be empty")
        self._surname = value
        
    @id.setter
    def id(self, value):
        if value <= 0:
            raise ValueError("ID must be a positive integer")
        self._id = value
        
    def enroll(self, course: Course):
        if course not in self._courses:
            self._courses.append(course)
        else:
            print(f"Student {self._name} is already enrolled in {course.name}")
            
    def __str__(self):
        return f"{self.name} {self.surname} ({self.age} lat): {', '.join([course.name for course in self.courses])}"