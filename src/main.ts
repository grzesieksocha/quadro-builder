import startBrowser from "./browser/browser";
import scraperController from "./pageController";

const browser = startBrowser();

scraperController(browser);
