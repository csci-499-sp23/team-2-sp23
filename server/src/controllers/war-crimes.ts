import { Request, Response } from "express";
import { scrapeYelp } from "../middleware/yelp-scraper";
import { JSDOM } from "jsdom";
import axios from "axios";

export async function warCrimes(
  request: Request,
  response: Response
): Promise<void> {
  const restaurantId = request.query.restaurant;
  const yelpURL = `https://www.yelp.com/menu/${restaurantId}`;

  try {
    const scrapedMenu = await axios
      .get(yelpURL)
      .then((res: any) => res.data)
      .then((html: string) => {
        const yelpDOM = new JSDOM(html).window.document;
        return scrapeYelp(yelpDOM);
      })
      .catch(function (err: any) {
        console.warn("Something went wrong.", err);
      });

    response.status(200).send(scrapedMenu);
  } catch (error) {
    response.status(500);
    response.send(error);
  }
}
