interface FoodItem {
  name: string;
  description: string | null;
  price: number;
  image_url?: string | null;
}

// removes extra whitespaces in text
// source: https://stackoverflow.com/questions/16974664/how-to-remove-the-extra-spaces-in-a-string
function removeExtraWhiteSpace(phrase: string): string {
  return phrase.replace(/\s+/g, " ").trim();
}

// Dig into a price table to retrieve the lowest price
// Used when a menu item has multiple prices - we decided to just take the cheapest one
function lowestTablePrice(table: HTMLTableElement): number {
  const prices = [...table.querySelectorAll("td")].map((cell) => {
    const priceCellContent = cell.textContent!;
    const price = removeExtraWhiteSpace(priceCellContent);

    return parseFloat(price.slice(1));
  });
  const lowestPrice = Math.min(...prices);

  return lowestPrice;
}

// Dig into a food item card to retrieve it's main content as an array of HTML elements
// A possible image tag, and a definite details div containing food details
function getItemCardDetailsNode(itemCard: HTMLElement): HTMLElement[] {
  return [...itemCard.children[0].children] as HTMLElement[];
}

// Parse food info from a details div
function scrapeFromDetails(detailsDiv: HTMLElement): FoodItem {
  const [details, priceDiv] = [
    ...detailsDiv.children[0].children,
  ] as HTMLElement[];

  const descriptionTag: HTMLElement = details.querySelector(
    ".menu-item-details-description"
  )!;
  const foodName: string = details.children[0].textContent!;

  const description: string | null = descriptionTag
    ? descriptionTag.textContent
    : null;

  const priceTable = priceDiv.querySelector("table")!;
  const hasPriceTable = !!priceTable;

  const priceString = removeExtraWhiteSpace(priceDiv.textContent!);
  const price = hasPriceTable
    ? lowestTablePrice(priceTable)
    : parseFloat(priceString.slice(1));

  return {
    image_url: null,
    name: removeExtraWhiteSpace(foodName),
    description: !!description ? removeExtraWhiteSpace(description) : null,
    price: price,
  };
}

export function scrapeYelp(document: Document): FoodItem[] {
  // Case 1: Food item has image
  const foodsWithImage: FoodItem[] = [
    ...document.querySelectorAll<HTMLElement>(".menu-item"),
  ]
    .filter((el) => el.className === "menu-item")
    .map((itemCard) => {
      const [imageDiv, detailsDiv]: HTMLElement[] =
        getItemCardDetailsNode(itemCard);

      const imageSrc: string =
        imageDiv.querySelector<HTMLImageElement>(".photo-box-img")!.src;

      // Little hack - get full resolution of image by text replacement
      // Size on website: https://s3-media0.fl.yelpcdn.com/bphoto/saiZeLbnPNTrPOjt3REjYg/60s.jpg
      // Full resolution: https://s3-media0.fl.yelpcdn.com/bphoto/saiZeLbnPNTrPOjt3REjYg/o.jpg
      const fullImageSrc: string = imageSrc.replace("60s.jpg", "o.jpg");

      const details: FoodItem = {
        ...scrapeFromDetails(detailsDiv),
        image_url: fullImageSrc,
      };

      return details;
    });

  // Case 2 : Food item has placeholder image
  const foodWithPlaceholderImage = [
    ...document.querySelectorAll<HTMLElement>(".menu-item"),
  ]
    .filter((el) => el.className === "menu-item menu-item-placeholder-photo")
    .map((itemCard: HTMLElement) => {
      const [_, detailsDiv]: HTMLElement[] = getItemCardDetailsNode(itemCard);
      const details = scrapeFromDetails(detailsDiv);

      return details;
    });

  // Case 3 : Food item has no image
  const foodWithNoImage = [...document.querySelectorAll(".menu-item")]
    .filter((el) => el.className.includes("menu-item menu-item-no-photo"))
    .map((itemCard) => {
      const [detailsDiv]: HTMLElement[] = [
        ...itemCard.children[0].children,
      ] as HTMLElement[];
      const details = scrapeFromDetails(detailsDiv);

      return details;
    });

  return [...foodsWithImage, ...foodWithPlaceholderImage, ...foodWithNoImage];
}
