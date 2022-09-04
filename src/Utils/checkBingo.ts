//CheckLines: função que checa se a linha está marcada,. índices de exemplo na cartela (0, 5, 10, 15, 20)

// let mapIndex = [ 0, 1, 2, 3, 4, 5 ]; //**Exemplo. vem da função crossMap - Bingo Coluna
// let mapIndex = [ 0, 5, 10, 15, 20 ]; //**Exemplo. vem da função crossMap - Bingo Linha
// let mapIndex = [ 0, 6, 12, 18, 24 ]; //**Exemplo. vem da função crossMap - Bingo Diagonal 1
// let mapIndex = [ 4, 8, 12, 16, 20 ]; //**Exemplo. vem da função crossMap - Bingo Diagonal 2
// let mapIndex = [ 0, 1, 2, 7, 8, 9 ]; //**Exemplo. vem da função crossMap
// let mapIndex = [ 0, 2, 4, 6, 8, 10 ]; //**Exemplo. vem da função crossMap

// let bingo = CheckBingo(mapIndex);

// console.log(bingo);

export function CheckBingo(mapIndex: number[]): boolean {
  if (mapIndex.length < 5) {
    return false;
  }
  CheckLines(mapIndex);
  if (CheckLines(mapIndex)) {
    return true;
  }
  CheckDiagonals(mapIndex);
  if (CheckDiagonals(mapIndex)) {
    return true;
  }
  CheckCollumns(mapIndex);
  if (CheckCollumns(mapIndex)) {
    return true;
  } else {
    return false;
  }
}

function CheckLines(mapIndex: number[]) {
  let control = 1;

  const indexLine = [0, 5, 10, 15, 20];

  do {
    Check(mapIndex, indexLine);

    if (Check(mapIndex, indexLine)) {
      return true;
    }

    for (let x = 0; x < 5; x++) {
      indexLine[x]++;
    }

    control++;
  } while (control <= 5);
}

function CheckCollumns(mapIndex: number[]) {
  let control = 1;

  const indexLine = [0, 1, 2, 3, 4];

  do {
    Check(mapIndex, indexLine);

    if (Check(mapIndex, indexLine)) {
      return true;
    }

    for (let x = 0; x < 5; x++) {
      indexLine[x] += 5;
    }

    control++;
  } while (control <= 5);
}

function CheckDiagonals(mapIndex: number[]) {
  let control = 1;

  let indexLine = [0, 6, 12, 18, 24];

  do {
    Check(mapIndex, indexLine);

    if (Check(mapIndex, indexLine)) {
      return true;
    }

    indexLine = [4, 8, 12, 16, 20];

    control++;
  } while (control <= 5);
}

function Check(mapIndex: number[], indexLine: number[]) {
  const bingo = [];

  mapIndex.forEach((index) => {
    if (indexLine.indexOf(index) > -1) {
      bingo.push(index);
    }
  });

  if (bingo.length === 5) {
    return true;
  }
}
