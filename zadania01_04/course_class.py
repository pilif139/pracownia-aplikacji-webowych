class Course:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value or value.strip() == "":
            raise ValueError("Course name cannot be empty")
        self._name = value
        