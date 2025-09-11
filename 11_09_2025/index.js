import readline from "readline";

function powitanie(imie, nazwisko, wiek) {
  if (wiek < 0) return "Wiek nie może być ujemny!";
  return `Witaj, ${imie} ${nazwisko}, który ma ${wiek} lat!`;
}

function goodbye(imie, nazwisko) {
  if (!imie || !nazwisko) return "Brak imienia lub nazwiska!";
  return `Do widzenia, ${imie} ${nazwisko}!`;
}

function getPerson() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question("Podaj imię: ", (imie) => {
      rl.question("Podaj nazwisko: ", (nazwisko) => {
        rl.question("Podaj wiek: ", (wiek) => {
          rl.close();
          resolve({ imie, nazwisko, wiek: parseInt(wiek) });
        });
      });
    });
  });
}

const osoby = [];

for (let i = 0; i < 3; i++) {
  const osoba = await getPerson();
  const message = powitanie(osoba.imie, osoba.nazwisko, osoba.wiek);
  console.log(message);
  osoby.push(osoba);
}

for (const osoba of osoby) {
  const pozegnanie = goodbye(osoba.imie, osoba.nazwisko);
  console.log(pozegnanie);
}
