/**
 * Fisher-Yates (Knuth) Array Shuffler
 * Generates an unbiased random permutation of array elements.
 */
export function fisherYatesShuffle(array) {
  if (!Array.isArray(array)) return [];
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
