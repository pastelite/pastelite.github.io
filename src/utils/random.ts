export function randomBetween(min: number, max: number, decimalPlaces = 2) {
  const rand = Math.random() * (max - min) + min;
  return typeof decimalPlaces === 'number'
    ? Number(rand.toFixed(decimalPlaces))
    : rand;
}

// let shuffler = (array: string[]) =>
//   array.map((value) => ({ value, sort: Math.random() })).sort((a, b) =>
//     a.sort - b.sort
//   ).map(({ value }) => value);

export function shuffleArray<T>(array: T[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// export function shuffleArray<T>(array: T[]) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

export function randomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
