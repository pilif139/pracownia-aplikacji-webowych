__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4c"


class Author:
    def __init__(self, id: int, first_name: str, last_name: str) -> None:
        self._id = id
        self.first_name = first_name
        self.last_name = last_name

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
        