
/**
 * Maps a number from range [0, 1] to range [min, max]
 *
 * @param {number} n - The number to map
 * @param {number} min - value of the 0
 * @param {number} max - value of the 1
 * @param {boolean} [clamp=true] - If true, the n will be clamped between 0 and 1
 * @returns {number} - The mapped number
 */
export function mappingNumber(n: number, min: number, max: number, clamp: boolean = true) {
  if (clamp) {
    n = Math.min(Math.max(n, 0), 1);
  }
  return n * (max - min) + min;
}