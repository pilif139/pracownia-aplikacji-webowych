def zadanie5_1(lines: dict, result_file):
    result = dict()
    for key in lines.keys():
        year = key.split("-")[0]
        if year in result:
            result[year] += lines[key]
        else:            
            result[year] = lines[key]
            
    maximum = 0
    year = 0
    for i in result.keys():
        if result[i] > maximum:
            maximum = result[i]
            year = i
    
    print(f"Maks: {maximum}, year: {year}")
    result_file.write(f"5.1: {year}")


file = open("./Dane_PR2/woda.txt", "r")
result_file = open("wynik5.txt", "w")

lines = dict()
for line in file:
    line = line.rstrip("\n")
    line = line.split("\t")
    lines[line[0]] = int(line[1])
    
zadanie5_1(lines, result_file)

file.close()
result_file.close()