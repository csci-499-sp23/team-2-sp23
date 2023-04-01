import { FastAverageColor } from "fast-average-color";

// retrives the average color from an image url
// if the url is invalid, returns #d4d4d4 by default
export async function getAverageColor(imageUrl) {
  const colorRender = new FastAverageColor();
  return colorRender
    .getColorAsync(imageUrl)
    .then((color) => color.hex)
    .catch(() => "#d4d4d4");
}
