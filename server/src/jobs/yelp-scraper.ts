interface FoodItem {
  name: string;
  description: string | null;
  price: number;
  image_url?: string | null;
}

// Dig into a price table to retrieve the lowest price
function lowestTablePrice(table: HTMLTableElement): number {
  const priceOptions: string[] = table.innerText.split(/\n/);
  const prices = priceOptions.map((option: string) => {
    // the actual is price after a \t character
    const [_, priceString] = option.split(/\t/);

    // parse `$123` to `123`
    const price = parseFloat(priceString.slice(1));
    return price;
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
  const foodName: string = (details.children[0] as HTMLElement).innerText;

  const description: string | null = descriptionTag
    ? descriptionTag.innerText
    : null;

  const priceTable = priceDiv.querySelector("table");
  const hasPriceTable = !!priceTable;

  const priceString = priceDiv.innerText;
  const price = hasPriceTable
    ? lowestTablePrice(priceTable)
    : parseFloat(priceString.slice(1));

  return {
    image_url: null,
    name: foodName,
    description: description,
    price: price,
  };
}

export function scrapeYelp(document: Document): FoodItem[] {
  const foodsWithImage: FoodItem[] = [
    ...document.querySelectorAll<HTMLElement>(".menu-item"),
  ]
    .filter((el) => el.className === "menu-item")
    .map((itemCard) => {
      const [imageDiv, detailsDiv]: HTMLElement[] =
        getItemCardDetailsNode(itemCard);

      const imageSrc: string =
        imageDiv.querySelector<HTMLImageElement>(".photo-box-img")!.src;

      const fullImageSrc: string = imageSrc.replace("60s.jpg", "o.jpg");

      const details: FoodItem = {
        ...scrapeFromDetails(detailsDiv),
        image_url: fullImageSrc,
      };

      return details;
    });

  const foodWithPlaceholderImage = [
    ...document.querySelectorAll<HTMLElement>(".menu-item"),
  ]
    .filter((el) => el.className === "menu-item menu-item-placeholder-photo")
    .map((itemCard: HTMLElement) => {
      const [_, detailsDiv]: HTMLElement[] = getItemCardDetailsNode(itemCard);
      const details = scrapeFromDetails(detailsDiv);

      return details;
    });

  const foodWithNoImage = [...document.querySelectorAll(".menu-item")]
    .filter((el) => el.className.includes("menu-item menu-item-no-photo"))
    .map((itemCard) => {
      const [detailsDiv]: HTMLElement[] = [
        ...itemCard.children[0].children,
      ] as HTMLElement[];

      const details = scrapeFromDetails(detailsDiv);

      return details;
    });

  console.table(foodsWithImage);
  console.table(foodWithPlaceholderImage);
  console.table(foodWithNoImage);

  const scrapedFoods = [
    ...foodsWithImage,
    ...foodWithPlaceholderImage,
    ...foodWithNoImage,
  ];

  const totalScraped = scrapedFoods.length;

  const expectedMenuItems = document.querySelectorAll(".menu-item").length;

  if (expectedMenuItems !== totalScraped) {
    throw Error(
      `
      Expected ${expectedMenuItems}\n
      Scraped ${totalScraped}\n
      Missing${expectedMenuItems - totalScraped}
      `
    );
  }

  console.log(`Successfully scraped all ${totalScraped} items!`);

  return scrapedFoods;
}
