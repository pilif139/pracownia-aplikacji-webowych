import datetime
import json
from pathlib import Path
from typing import Dict, List

from loan_status import loan_status
from models.Author import Author
from models.Book import Book
from models.Loan import Loan
from models.Reader import Reader

__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4c"


base_dir = Path(__file__).resolve().parent
authors_path = base_dir / "authors.txt"
books_path = base_dir / "books.txt"
readers_path = base_dir / "readers.txt"
loans_path = base_dir / "loans.txt"

authors: List[Author] = []
with authors_path.open("r", encoding="utf-8") as file:
    for line in file:
        row = line.strip()
        if not row:
            continue
        parts = row.split()
        author_id = int(parts[0])
        first_name = parts[1]
        last_name = " ".join(parts[2:])
        authors.append(Author(author_id, first_name, last_name))
authors_by_id: Dict[int, Author] = {author._id: author for author in authors}

books: List[Book] = []
with books_path.open("r", encoding="utf-8") as file:
    for line in file:
        row = line.strip()
        if not row:
            continue
        parts = row.split()
        book_id = int(parts[0])
        title = parts[1].replace("_", " ")
        author_id = int(parts[2])
        year = int(parts[3])
        author = authors_by_id.get(author_id)
        if author is None:
            continue
        books.append(Book(book_id, title, author, year))
books_by_id: Dict[int, Book] = {book._id: book for book in books}

readers: List[Reader] = []
with readers_path.open("r", encoding="utf-8") as file:
    for line in file:
        row = line.strip()
        if not row:
            continue
        parts = row.split()
        reader_id = int(parts[0])
        first_name = parts[1]
        last_name = parts[2]
        birthdate_from_file = parts[3]
        birthdate = datetime.datetime.strptime(birthdate_from_file, "%Y-%m-%d").date()
        readers.append(Reader(reader_id, first_name, last_name, birthdate))
readers_by_id: Dict[int, Reader] = {reader._id: reader for reader in readers}

loans: List[Loan] = []
with loans_path.open("r", encoding="utf-8") as file:
    for line in file:
        row = line.strip()
        if not row:
            continue
        parts = row.split()
        reader_id = int(parts[0])
        book_id = int(parts[1])
        days = int(parts[2])
        reader = readers_by_id.get(reader_id)
        book = books_by_id.get(book_id)
        if reader is None or book is None:
            continue
        loans.append(Loan(reader, book, days))

print("Historia wypożyczeń")
loans_by_reader: Dict[int, List[Loan]] = {}
for loan in loans:
    loans_by_reader.setdefault(loan.reader._id, []).append(loan)

for reader in readers:
    print(f"{reader}:")
    for loan in loans_by_reader.get(reader._id, []):
        status = loan_status(loan.days)
        fee = loan.get_fee()
        print(f"Książka: {loan.book.title}")
        print(f"Dni: {loan.days}")
        print(f"Status: {status}")
        print(f"Opłata: {fee} zł")
        print()

loans_by_reader: Dict[int, List[Loan]] = {}
for loan in loans:
    loans_by_reader.setdefault(loan.reader._id, []).append(loan)
    

readers_json: List[Dict[str, List[Dict[str, object]]]] = []
for reader in readers:
    loan_items: List[Dict[str, object]] = []
    for loan in loans_by_reader.get(reader._id, []):
        loan_items.append({
                    "Tytuł": loan.book.title,
                    "Dni": loan.days,
                    "Status": loan_status(loan.days),
                    "Opłata": loan.get_fee(),
                })
    readers_json.append({str(reader): loan_items})

with open(base_dir / "readers.json", "w", encoding="utf-8") as file:
    json.dump(readers_json, file, ensure_ascii=False, indent=4)

print("=" * 30)
print()

loans_by_book: Dict[int, List[Loan]] = {}
for loan in loans:
    loans_by_book.setdefault(loan.book._id, []).append(loan)

for book in books:
    book_loans = loans_by_book.get(book._id, [])
    count = len(book_loans)
    average = sum(loan.days for loan in book_loans) / count if count else 0.0
    print(f"{book.title}:")
    print(f"Autor: {book.author}")
    print(f"Liczba wypożyczeń: {count}")
    print(f"Średni czas: {average:.1f} dni")
    print()
    
    
loans_by_book: Dict[int, List[Loan]] = {}
for loan in loans:
    loans_by_book.setdefault(loan.book._id, []).append(loan)

books_json: List[Dict[str, Dict[str, object]]] = []
for book in books:
    book_loans = loans_by_book.get(book._id, [])
    count = len(book_loans)
    average = sum(loan.days for loan in book_loans) / count if count else 0.0
    loan_entries = [
        {"Czytelnik": str(loan.reader), "Dni": loan.days} for loan in book_loans
    ]
    books_json.append({
                book.title: {
                    "Autor": str(book.author),
                    "Wypożyczenia": loan_entries,
                    "Średnia": round(average, 1),
                }
            })

with open(base_dir / "books.json", "w", encoding="utf-8") as file:
        json.dump(books_json, file, ensure_ascii=False, indent=4)

