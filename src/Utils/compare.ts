//Função que cruza registro com bolas marcadas: Verifica se os números marcados estão de acordo com as bolas já sorteadas e remove os que não estiverem.

// let prizeDraw = [
//   3, 5, 7, 8, 9, 11, 15, 22, 25, 28, 31, 33, 34, 35, 41, 47, 48, 50, 51, 52, 54,
//   55, 60, 61, 63, 64, 66, 71, 73, 75,
// ];

// let bolasMarcadas = [3, 5, 7, 8, 9, 11, 15, 22, 25, 28, 31, 33, 34, 35, 41, 53];

export function Compare(prizeDraw: number[], markedNumbers: number[]) {
  const prizeNumbers = [];
  for (let i = 0; i < markedNumbers.length; i++) {
    if (prizeDraw.indexOf(markedNumbers[i]) > -1) {
      prizeNumbers.push(markedNumbers[i]);
    }
  }
  return prizeNumbers;
}
