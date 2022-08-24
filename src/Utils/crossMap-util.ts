// Função que mapeia, na cartela, os índices dos números marcados corretamente e retorna uma lista com estes índices.
// Recebe lista de números da cartela (card) e lista dos números marcados já verificados (prizeNumbers)
// Objetivo da função é gerar uma lista que facilite a validação de bingo

export function CrossMap(
  cardNumbers: number[],
  prizeNumbers: number[],
): number[] {
  const mapIndex = [];
  prizeNumbers.forEach((num) => {
    const n = cardNumbers.indexOf(num);
    if (n != -1) {
      mapIndex.push(n);
    }
  });
  return mapIndex;
}
