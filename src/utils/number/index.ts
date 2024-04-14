/**
 * Use to round a `num` to `dec` th decimal.
 * @param num 
 * @param to 
 */
function roundTo(num: number, dec: number = 10) {
  return Math.round(num * dec) / dec;
}

/**
 * Use to get a random number from `min` to `max`.
 * @param min 
 * @param max 
 * @returns 
 */
function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1));
}

export const NumberUtils = {
  getRandom,
  roundTo
}