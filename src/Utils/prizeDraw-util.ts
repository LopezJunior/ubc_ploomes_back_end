// Função para criação de lista de sorteio. 
// Recebe o limite de rodadas definido na criação da Room


export function PrizeDraw(limitPrizeDraw: number) {
  const drawList = [];
  for (let i = 0; i < limitPrizeDraw; i++) {
    const ball = Math.ceil(Math.random() * 75);     // Gerar número aleatório de 1 a 75

    if (drawList.indexOf(ball) != -1) {             // Caso o número exista na lista, sorteia de novo
      i--;
    } else {
      drawList.push(ball);                          // Caso seja um novo número, adiciona à lista
    }
  }
  return drawList;
}
