from typing import List, Tuple


def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    """Czyta definicję grafu z pliku i zwraca listę sąsiedztwa oraz liczbę wierzchołków."""
    with open(filename, "r", encoding="utf-8") as file:
        lines: List[str] = [line.strip() for line in file if line.strip()]

    if not lines:
        raise ValueError("Plik jest pusty.")

    vertices_count: int = int(lines[0])
    adjacency_list: List[List[int]] = [[] for _ in range(vertices_count)]

    for line in lines[1:]:
        parts: List[int] = [int(x) for x in line.split()]
        if not parts:
            continue

        vertex: int = parts[0]
        if vertex < 0 or vertex >= vertices_count:
            raise ValueError(f"Niepoprawny numer wierzchołka: {vertex}")

        neighbours: List[int] = parts[1:]
        for neighbour in neighbours:
            if neighbour < 0 or neighbour >= vertices_count:
                raise ValueError(f"Niepoprawny numer sąsiada: {neighbour}")

        adjacency_list[vertex] = neighbours

    return adjacency_list, vertices_count


def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    """Wypisuje listę sąsiedztwa w czytelnej formie."""
    for vertex, neighbours in enumerate(adjacency_list):
        neighbours_text: str = ", ".join(str(neighbour) for neighbour in neighbours)
        print(f"Sąsiadami wierzchołka {vertex} są: {neighbours_text}")


def list_to_matrix(adjacency_list: List[List[int]]) -> List[List[int]]:
    """Przekształca listę sąsiedztwa do macierzy sąsiedztwa."""
    vertices_count: int = len(adjacency_list)
    matrix: List[List[int]] = [[0 for _ in range(vertices_count)] for _ in range(vertices_count)]

    for vertex, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[vertex][neighbour] = 1

    return matrix


def write_matrix(matrix: List[List[int]]) -> None:
    """Wypisuje macierz sąsiedztwa na ekran."""
    for row in matrix:
        print(" ".join(str(value) for value in row))


def main() -> None:
    """Funkcja główna programu."""
    filename: str = "graph.txt"

    adjacency_list, _ = read_graph(filename)
    print("Wczytana lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)

    print("\nMacierz sąsiedztwa:")
    matrix: List[List[int]] = list_to_matrix(adjacency_list)
    write_matrix(matrix)


if __name__ == "__main__":
    main()
