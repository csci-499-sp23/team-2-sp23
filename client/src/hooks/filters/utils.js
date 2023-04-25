/**
 * @description Generates an object using the values as keys
 * Maps each key to a boolean
 * @example: ["Monday", "Tuesday", "Wedensday"]
 * returns : { Monday: false, Tuesday: false, Wednesday: false}
 * @param {string[]} values - Array of strings
 * @returns {object} - The toggle object
 */
export function toggleObjectFromArray(values) {
  const result = {};
  for (const value of values) {
    result[value] = false;
  }

  return result;
}

/**
 * @description Determines whether two arrays have a common element
 * @example: [1,2,3,4], [7,6,5,4] => returns true
 * @param {any[]} valuesA - An array
 * @param {any[]} valuesB - Another array
 * @returns True if there is a common element, false otherwise
 */
export function sharesCommonElement(valuesA, valuesB) {
  const uniqueValuesA = new Set(valuesA);
  const uniqueValuesB = new Set(valuesB);

  const unionedValues = new Set([...uniqueValuesA, ...uniqueValuesB]);

  return unionedValues.size !== uniqueValuesA.size + uniqueValuesB.size;
}
