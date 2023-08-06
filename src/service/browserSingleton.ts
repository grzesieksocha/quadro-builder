import { Browser, launch } from "puppeteer";

class BrowserSingleton {
  instance: Browser | null;

  constructor() {
    this.instance = null;
  }

  async getBrowser() {
    if (!this.instance) {
      const browser = await launch({
        headless: "new",
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
      });

      this.instance = browser;
    }

    return this.instance;
  }

  async closeBrowser() {
    if (!this.instance) {
      return;
    }

    this.instance.close();
    this.instance = null;

    return;
  }
}

const browser = new BrowserSingleton();

export default browser;
