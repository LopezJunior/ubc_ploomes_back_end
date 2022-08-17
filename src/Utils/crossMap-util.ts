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
