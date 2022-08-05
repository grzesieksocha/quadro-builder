import { launch } from "puppeteer";

async function startBrowser() {
  // let browser: Browser | null = null;
  // try {
  // console.log("Opening the browser......");
  const browser = await launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
  // } catch (err) {
  // console.log("Could not create a browser instance => : ", err);
  // }

  return browser;
}

export default startBrowser;
