import cron from "node-cron";
import { scrapeCoordinates } from "./tasks/scrape-coordinates";

function scheduleJobs() {
  const everyThirtyMinutes = "*/30 * * * *";

  cron.schedule(everyThirtyMinutes, async () => {
    // pick a random coordinate and scrape it
    await scrapeCoordinates();
  });
}

export default scheduleJobs;
