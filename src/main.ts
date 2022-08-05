import startBrowser from "./browser";
import scraperController from "./pageController";

const browser = startBrowser();

scraperController(browser);
