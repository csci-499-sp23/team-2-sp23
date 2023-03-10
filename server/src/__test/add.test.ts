function add(a: number, b: number): number {
  return a + b;
}

test("10 + 10 = 20", () => {
  expect(add(10, 10)).toBe(20);
});
