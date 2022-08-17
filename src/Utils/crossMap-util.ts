// Função que mapeia, na cartela, os índices dos números marcados corretamente e retorna uma lista com estes índices.
// Recebe lista de números da cartela (card) e lista dos números marcados já verificados (prizeNumbers)
// Objetivo da função é gerar uma lista que facilite a validação de bingo

export function CrossMap(card, prizeNumbers) {
  const list = [];
  prizeNumbers.forEach((num) => {     
    const n = card.indexOf(num);
    if (n != -1) {
      list.push(n);
    }
  });
  return list;
}
