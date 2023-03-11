import aketumiHTML from "./restaurant-doms/aketumi-asian-bistro-brooklyn";
import hkTeaHTML from "./restaurant-doms/hk-tea-and-sushi-brooklyn";
import kfcHTML from "./restaurant-doms/kfc-brooklyn-18";
import mcdonaldsHTML from "./restaurant-doms/mcdonalds-new-york-137";
import tacoBellHTML from "./restaurant-doms/taco-bell-cantina-brooklyn-2";
import rollNRoaster from "./restaurant-doms/roll-n-roaster-brooklyn";
import { JSDOM } from "jsdom";
import { scrapeYelp } from "../../src/jobs/yelp-scraper";

function menuItemCount(DOM: Document): number {
  const menuItemClassName = ".menu-item";

  return DOM.querySelectorAll(menuItemClassName).length;
}

function testCorrectScrape(menuHTML: string): void {
  const menuDOM = new JSDOM(menuHTML).window.document;

  const expectedItemCount = menuItemCount(menuDOM);
  const scrapedItems = scrapeYelp(menuDOM);
  const NaNPrices = scrapedItems.filter((food) => isNaN(food.price));
  const emptyNames = scrapedItems.filter((food) => food.name.length === 0);

  expect(scrapedItems.length).toBe(expectedItemCount);
  expect(NaNPrices.length).toBe(0);
  expect(emptyNames.length).toBe(0);
}

test("Scrape Aketumi Asian Bistro", () => testCorrectScrape(aketumiHTML));

test("Scrape HK Tea", () => testCorrectScrape(hkTeaHTML));

test("Scrape KFC", () => testCorrectScrape(kfcHTML));

test("Scrape McDonald's", () => testCorrectScrape(mcdonaldsHTML));

test("Scrape Taco Bell", () => testCorrectScrape(tacoBellHTML));

test("Scrape Roll N' Roaster", () => testCorrectScrape(rollNRoaster));
