export function PrizeDraw(limitPrizeDraw: number) {
  const drawList = [];
  for (let i = 0; i < limitPrizeDraw; i++) {
    const ball = Math.ceil(Math.random() * 75);

    if (drawList.indexOf(ball) != -1) {
      i--;
      continue;
    } else {
      drawList.push(ball);
    }
  }
  return drawList;
}
