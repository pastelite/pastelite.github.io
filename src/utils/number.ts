
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

function isSorted(points: [number, number][]): boolean {
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i][0] > points[i + 1][0]) {
      return false;
    }
  }
  return true;
}

/**
 * For each points, first number is the value of n, and second is the output number
 */
export function mappingNumberPoint(n: number, ...points: [number, number][]) {
  
  // weird points case
  if (points.length === 0) {
    return 0;
  }
  if (points.length === 1) {
    return points[0][1];
  }

  // points.sort((a, b) => a[0] - b[0]);
  if (!isSorted(points)) {
    throw new Error("The 'points' array sorted from 0-1 to use mappingNumberPoint.");
  }

  // weird number
  if (n <= points[0][0]) {
    return points[0][1];
  }
  if (n >= points[points.length - 1][0]) {
    return points[points.length - 1][1];
  }

  // normal number
  let currentPoint: [number, number] = points[0];
  let nextPoint: [number, number] = points[1];

  for (let i = 0; i < points.length - 1; i++) {
    if (n >= points[i][0] && n <= points[i + 1][0]) {
      currentPoint = points[i];
      nextPoint = points[i + 1];
      break; 
    }
  }

  // mapped to one while avoid 0
  const numRange = nextPoint[0] - currentPoint[0];
  let mappedToOne: number;

  // Avoid division by zero if currentPoint[0] and nextPoint[0] are the same
  if (numRange === 0) {
    mappedToOne = 0; // Or 1, effectively meaning n is at currentPoint[0]
  } else {
    mappedToOne = (n - currentPoint[0]) / numRange;
  }

  return mappingNumber(mappedToOne, currentPoint[1], nextPoint[1]);
}

export function choosing<T>(n: number, array: T[]): T {
  if (n < 0 || n >= array.length) {
    return array[0];
  }
  return array[n];
}