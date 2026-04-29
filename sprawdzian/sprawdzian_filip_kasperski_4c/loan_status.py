__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4c"


def loan_status(days: int) -> str:
    if days <= 14:
        return "OK"
    if days <= 30:
        return "WARNING"
    return "OVERDUE"
