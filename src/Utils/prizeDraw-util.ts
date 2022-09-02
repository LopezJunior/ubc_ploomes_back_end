// Função para criação de lista de sorteio.
// Recebe o limite de rodadas definido na criação da Room

export function PrizeDraw(limitPrizeDraw: number): number[] {
  const prizeOrder = [0];
  for (let i = 0; i < limitPrizeDraw; i++) {
    const ball = Math.ceil(Math.random() * 75); // Gerar número aleatório de 1 a 75

    if (prizeOrder.indexOf(ball) != -1) {
      // Caso o número exista na lista, sorteia de novo
      i--;
    } else {
      prizeOrder.push(ball); // Caso seja um novo número, adiciona à lista
    }
  }
  return prizeOrder;
}
