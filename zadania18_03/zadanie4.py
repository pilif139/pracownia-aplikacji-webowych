def zadanie4_1(lines: list, result_file):
    result = ""

    for i in range(39, len(lines), 40):
        result += lines[i][9]
    
    print(f"4.1: {result}")
    result_file.write(f"4.1: {result}\n")
    

def zadanie4_2(lines: list, result_file):
    max_diffrent_chars = 0
    line_number = 0
    
    for i in range(len(lines)):
        hashSet = set()
        for j in range(len(lines[i])):
            if lines[i][j] != " " and lines[i][j] != "\n":
                hashSet.add(lines[i][j])
        if len(hashSet) > max_diffrent_chars:
            max_diffrent_chars = len(hashSet)
            line_number = i

    print(f"4.2: {max_diffrent_chars} - {lines[line_number]}")
    result_file.write(f"4.2: {lines[line_number]} {max_diffrent_chars}\n")
    

def odleglosc_liter(l1, l2):
    if l1 == l2:
        return 0
    alfabet = "abcdefghijklmnopqrstuvwxyz"
    return abs(alfabet.index(l1.lower()) - alfabet.index(l2.lower()))
    

def zadanie4_3(lines: list, result_file):
    slowa = []
    
    for item in lines:
        is_ok = True
        for i in range(len(item)):
            for j in range(i + 1, len(item)):
                if odleglosc_liter(item[i], item[j]) > 10:
                    is_ok = False
                    break
            if not is_ok:
                break
        if is_ok:
            slowa.append(item)

    print(f"4.3: {slowa}")
    result_file.write("4.3:\n")
    for item in slowa:
        result_file.write(f"{item}\n")


file = open("./Dane_PR2/sygnaly.txt", "r")
result_file = open("wynik4.txt", "w")

lines = file.readlines()
for i in range(len(lines)):
    lines[i] = lines[i].rstrip("\n")

# zadanie 4.1
zadanie4_1(lines, result_file)
zadanie4_2(lines, result_file)
zadanie4_3(lines, result_file)


    
file.close()
result_file.close()