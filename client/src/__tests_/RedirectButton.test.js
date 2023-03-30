import React from "react";
import renderer from "react-test-renderer";
import RedirectButton from "../components/RedirectButton";

test("renders correctly", () => {
  const tree = renderer.create(<RedirectButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
