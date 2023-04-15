// Capitalizes the first letter of a word
const titled = (word) => {
  if (word.length === 0) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Converts "restaurant_reservation" to Restaurant Reservation
export function snakeCaseToTitle(phrase) {
  const sectionedWords = phrase.split("_").filter((word) => word.length > 0);

  const titledWords = sectionedWords.map((word) => titled(word));

  return titledWords.join(" ");
}
