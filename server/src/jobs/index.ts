import cron from "node-cron";
import { scrapeCoordinates } from "./tasks/scrape-coordinates";
import { deleteDeprecatedMenus } from "./tasks/delete-deprecated-menus";

function scheduleJobs() {
  const everyThirtyMinutes = "*/30 * * * *";
   deleteDeprecatedMenus();

  cron.schedule(everyThirtyMinutes, async () => {
    // pick a random coordinate and scrape it
    await scrapeCoordinates();
    await deleteDeprecatedMenus();
  });
}

export default scheduleJobs;
