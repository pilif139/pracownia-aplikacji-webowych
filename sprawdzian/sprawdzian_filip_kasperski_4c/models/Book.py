from .Author import Author

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4c"


class Book:
    def __init__(self, id: int, title: str, author: Author, year: int) -> None:
        self._id = id
        self.title = title
        self.author = author
        self.year = year

    def __str__(self) -> str:
        return f"{self.title} ({self.year}) {self.author}"
        
    