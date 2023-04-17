/**
 * @param {item[]} items the items to filter
 * @param {((item)=> boolean)[]} filterFunctions the filters to run items through
 * @returns {item[]} the filtered items
 */
export function applyFilters(items, filterFunctions) {
  let filteredItems = items;

  for (const filterFunction of filterFunctions) {
    filteredItems = filteredItems.filter(filterFunction);
  }

  return filteredItems;
}
