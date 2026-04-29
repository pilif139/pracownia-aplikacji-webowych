from .Reader import Reader
from .Book import Book

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4c"


class Loan:
    def __init__(self, reader: Reader, book: Book, days: int) -> None:
        self.reader = reader
        self.book = book
        self.days = days

    def get_fee(self) -> int:
        if self.days <= 14:
            return 0
        return self.days - 14
        
    