import ReviewStars from "../index";
import { render, screen } from "@testing-library/react";

function assertCorrectStarCount(rating, expected) {
  render(<ReviewStars restaurantId={"idk"} rating={rating} />);

  // test ids from the mui icons
  const fullStarTestId = "StarIcon";
  const halfStarTestId = "StarHalfIcon";
  const blankStarTestId = "StarOutlineIcon";

  const fullStars = screen.queryAllByTestId(fullStarTestId);
  const partStars = screen.queryAllByTestId(halfStarTestId);
  const blankStars = screen.queryAllByTestId(blankStarTestId);

  expect(fullStars.length).toBe(expected.full);
  expect(partStars.length).toBe(expected.part);
  expect(blankStars.length).toBe(expected.blank);
}

test("Review stars of 1.0 show correct amount", () => {
  const expected = { full: 1, part: 0, blank: 4 };
  assertCorrectStarCount(1.0, expected);
});

test("Review stars of 3.7 show correct amount", () => {
  const expected = { full: 3, part: 1, blank: 1 };
  assertCorrectStarCount(3.7, expected);
});

test("Review stars of 5.0 show correct amount", () => {
  const expected = { full: 5, part: 0, blank: 0 };
  assertCorrectStarCount(5.0, expected);
});
