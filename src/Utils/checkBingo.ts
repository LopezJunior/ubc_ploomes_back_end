//CheckLines: função que checa se a linha está marcada,. índices de exemplo na cartela (0, 5, 10, 15, 20)

// let indicesBolasMarcadas = [0, 1, 6, 11, 12, 16, 18, 21, 24]; //**Exemplo. vem da função crossMap

// let bingo = CheckBingo(indicesBolasMarcadas);

// console.log(bingo);

export function CheckBingo(indicesBolasMarcadas) {
  if(indicesBolasMarcadas < 5){
    return false
  }
  CheckLines(indicesBolasMarcadas);
  if (CheckLines(indicesBolasMarcadas)) {
    return true;
  }
  CheckDiagonals(indicesBolasMarcadas);
  if (CheckDiagonals(indicesBolasMarcadas)) {
    return true;
  }
  CheckCollumns(indicesBolasMarcadas);
  if (CheckCollumns(indicesBolasMarcadas)) {
    return true;
  } else {
    return false;
  }
}

function CheckLines(indicesBolasMarcadas) {
  let control = 1;

  let indexLine = [0, 5, 10, 15, 20];

  do {
    Check(indicesBolasMarcadas, indexLine);

    console.log(control);
    console.log(indexLine);
    if (Check(indicesBolasMarcadas, indexLine)) {
      return true;
    }

    for (let x = 0; x < 5; x++) {
      indexLine[x]++;
    }

    control++;
  } while (control <= 5);
}

function CheckCollumns(indicesBolasMarcadas) {
  let control = 1;

  let indexLine = [0, 1, 2, 3, 4];

  do {
    Check(indicesBolasMarcadas, indexLine);

    console.log(control);
    console.log(indexLine);
    if (Check(indicesBolasMarcadas, indexLine)) {
      return true;
    }

    for (let x = 0; x < 5; x++) {
      indexLine[x] += 5;
    }

    control++;
  } while (control <= 5);
}

function CheckDiagonals(indicesBolasMarcadas) {
  let control = 1;

  let indexLine = [0, 6, 12, 18, 24];

  do {
    Check(indicesBolasMarcadas, indexLine);

    console.log(control);
    console.log(indexLine);
    if (Check(indicesBolasMarcadas, indexLine)) {
      return true;
    }

    indexLine = [4, 8, 12, 16, 20];

    control++;
  } while (control <= 5);
}

function Check(indicesBolasMarcadas, indexLine) {
  let bingo = [];

  indicesBolasMarcadas.forEach((index) => {
    if (indexLine.indexOf(index) > -1) {
      bingo.push(index);
    }
  });

  if (bingo.length === 5) {
    return true;
  }
}
