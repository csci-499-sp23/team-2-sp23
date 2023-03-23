export function isDisjoint<Item>(listA: Item[], listB: Item[]): boolean {
  for (const item of listA) {
    if (listB.includes(item)) return false;
  }

  return true;
}
