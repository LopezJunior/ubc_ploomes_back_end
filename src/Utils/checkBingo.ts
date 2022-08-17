//Função que cruza registro com bolas marcadas: Verifica se os números marcados estão de acordo com as bolas já sorteadas e remove os que não estiverem.

//let card = [9, 11, 13,  10,  8, 27, 30, 28, 17, 20, 37, 42, 35, 44, 34, 59, 60, 58, 47, 48, 71, 74, 72, 64, 75];

let prizeDraw = [
  3, 5, 7, 8, 9, 11, 15, 22, 25, 28, 31, 33, 34, 35, 41, 47, 48, 50, 51, 52, 54,
  55, 60, 61, 63, 64, 66, 71, 73, 75,
];

let bolasMarcadas = [3, 5, 7, 8, 9, 11, 15, 22, 25, 28, 31, 33, 34, 35, 41, 53];

let x = Compare(prizeDraw, bolasMarcadas);

function Compare(prizeDraw, bolasMarcadas) {
  let acertos = [];
  for (let i = 0; i < bolasMarcadas.length; i++) {
    if (prizeDraw.indexOf(bolasMarcadas[i]) > -1) {
      acertos.push(bolasMarcadas[i]);
    }
  }
  return acertos;
}

console.log('Você acertou ' + x.length + ' números: ', x);
