__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Filip Kasperski 4C"


def year_grade(average):
    if average >= 5.5: return 6
    if average >= 4.7: return 5
    if average >= 3.7: return 4
    if average >= 2.7: return 3
    if average >= 1.85: return 2
    return 1