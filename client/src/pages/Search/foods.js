const foods = [
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/sFfQMDy6sYBT7ToBWpqu4A/o.jpg",
    name: "Roaster Beef",
    description: "rare, medium, well done",
    price: 4.45,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/xMWlNEBkRa6MQHJRXWvXYA/o.jpg",
    name: "Grilled Chicken Breast",
    description: "well done",
    price: 4.45,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/zYncNoTRd2ensKAuYHaZsQ/o.jpg",
    name: "Hamburgers",
    description: "rare, medium, well done",
    price: 3.25,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/pRomkDs4DjApSnhnTn7lMg/o.jpg",
    name: "Cheeseburger",
    description: "rare, medium, well done",
    price: 3.7,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/58Cb1pPKlu2P7yRWsdPv-A/o.jpg",
    name: "Ribeye Steak",
    description: "rare, medium, well done",
    price: 5.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/mXJW6MEyOyPtoRdxiWJ6-A/o.jpg",
    name: "Fish Fillet",
    description: null,
    price: 4.45,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/GpG6bKbOAwyYoMgJpgLGkw/o.jpg",
    name: "Golden Fried Shrimp Cup",
    description: null,
    price: 5.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/avdlRI_NIY5HiNGI_MDwJQ/o.jpg",
    name: "Chicken Wings",
    description: "with hot garlic sauce",
    price: 6.65,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/AdFuWfX4bPFulZeihmDW-Q/o.jpg",
    name: "Chicken Tenders",
    description: "honey mustard, sweet and sour, bbq",
    price: 5.65,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/_03P9pcpISQjJ8_zu9IAlQ/o.jpg",
    name: "Roasted Onions",
    description: null,
    price: 0.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/C40q5LFKbLUrYu6MH5WZ2Q/o.jpg",
    name: "Lots",
    description: null,
    price: 0.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/21UG-3VMTK0z97zXgXxohA/o.jpg",
    name: "'you Can Have Cheez On Anything You Pleez' On Sandwich",
    description: null,
    price: 0.45,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/G0jeYncLPBKJY9phlTdRaw/o.jpg",
    name: "Lemonade, Orangeade",
    description: "freshly squeezed",
    price: 2.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/a3uJm1pXceoxA1g6VWVGgA/o.jpg",
    name: "Orange Juice",
    description: "freshly squeezed",
    price: 2.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/Hutsz3xJIfxSAMRLFWZh1Q/o.jpg",
    name: "Iced Tea",
    description: "freshly brewed",
    price: 1.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/Ed27OaIlUCY5-KulJy1Ubw/o.jpg",
    name: "Diet Coke",
    description: null,
    price: 1.4,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/Ub3-5DkMcGsVqZlK0y7g2A/o.jpg",
    name: "Root Beer",
    description: null,
    price: 1.4,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/mXJW6MEyOyPtoRdxiWJ6-A/o.jpg",
    name: "Thick Shakes",
    description: null,
    price: 3.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/Hutsz3xJIfxSAMRLFWZh1Q/o.jpg",
    name: "Tea",
    description: null,
    price: 1.25,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/zAqvOMh7d0dMpmCQImqVNA/o.jpg",
    name: "Budweiser, Bud Light",
    description: null,
    price: 2.5,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/RY88O7Y9Kx5BPhP0a0SqDA/o.jpg",
    name: "Moet",
    description: null,
    price: 59.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/E5JcGpMY6H5AaAPT0ikB0A/o.jpg",
    name: "Fries",
    description: null,
    price: 1.75,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/lzKsy0cFaE6RwipPNlS6vA/o.jpg",
    name: "Fries With Cheez",
    description: null,
    price: 2.65,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/78UhLe-BOeNnlZuXMOZVgg/o.jpg",
    name: "Onion Rings",
    description: null,
    price: 2.35,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/G0jeYncLPBKJY9phlTdRaw/o.jpg",
    name: "Mozzarella Sticks",
    description: null,
    price: 3.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/DlWR5p1atZPrBW5jGPngGg/o.jpg",
    name: "Corn Fritters",
    description: "golden fried",
    price: 2.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/7hPUlZ3tO7XHPvTxY4iR-A/o.jpg",
    name: "Mashed Potatoes",
    description: "freshly made with gravy",
    price: 2.35,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/L7W55qMrQVzMAEE5qvCCHA/o.jpg",
    name: "Baked Sweet Potato",
    description: "brawn sugar and butter",
    price: 2.35,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/78UhLe-BOeNnlZuXMOZVgg/o.jpg",
    name: "Cole Slaw",
    description: null,
    price: 1.25,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/OAsdnGVbgMh2HpG_sC3J_w/o.jpg",
    name: "Clam Chowder",
    description: "manhattan style",
    price: 2.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/fsNIiogFoes2slEJCvmyjA/o.jpg",
    name: "Sweet Potato Fries",
    description: null,
    price: 2.95,
  },
  {
    image_url:
      "https://s3-media0.fl.yelpcdn.com/bphoto/jgATQ3pBiQgsmepBbjkXnA/o.jpg",
    name: "Freshly Baked Apple Pies",
    description: null,
    price: 2.55,
  },
  {
    image_url: null,
    name: "Roaster Turkey",
    description: null,
    price: 4.45,
  },
  {
    image_url: null,
    name: "Grilled Chicken On Salad",
    description: null,
    price: 6.95,
  },
  {
    image_url: null,
    name: "Chicken Parmesan",
    description: null,
    price: 4.95,
  },
  {
    image_url: null,
    name: "12' Individual Pizza",
    description: null,
    price: 4.95,
  },
  {
    image_url: null,
    name: "Pepperoni",
    description: null,
    price: 1,
  },
  {
    image_url: null,
    name: "Sausage",
    description: null,
    price: 1,
  },
  {
    image_url: null,
    name: "Ricotta",
    description: null,
    price: 1,
  },
  {
    image_url: null,
    name: "Extra Mozzarella",
    description: null,
    price: 1,
  },
  {
    image_url: null,
    name: "Snapple",
    description: "peach, or lemon, both diet",
    price: 1.75,
  },
  {
    image_url: null,
    name: "Cola",
    description: null,
    price: 1.4,
  },
  {
    image_url: null,
    name: "Sprite",
    description: null,
    price: 1.4,
  },
  {
    image_url: null,
    name: "Bottled Spring Water",
    description: null,
    price: 1.4,
  },
  {
    image_url: null,
    name: "San Pellegrino",
    description: null,
    price: 1.95,
  },
  {
    image_url: null,
    name: "Coffee",
    description: null,
    price: 1.25,
  },
  {
    image_url: null,
    name: "Heineken Corona Extra",
    description: null,
    price: 3.25,
  },
  {
    image_url: null,
    name: "Red Or White Wine",
    description: "split",
    price: 3.25,
  },
  {
    image_url: null,
    name: "Pinot Grigio",
    description: "full bottle",
    price: 14.95,
  },
  {
    image_url: null,
    name: "Shiraz",
    description: "full bottle",
    price: 11.95,
  },
  {
    image_url: null,
    name: "Tossed Salad",
    description:
      "french, creamy italian, fat free 1, 000 island, virgin olive oil and balsamic vinegar",
    price: 2.95,
  },
  {
    image_url: null,
    name: "Steamed Vegetable Medley",
    description: null,
    price: 2.75,
  },
  {
    image_url: null,
    name: "Ice Cream Cones, Cups",
    description: null,
    price: 1.95,
  },
  {
    image_url: null,
    name: "Top Off Anything With Ice Cream",
    description: null,
    price: 1.25,
  },
];

export default foods;