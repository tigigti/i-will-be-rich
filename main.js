const puppeteer = require("puppeteer");
const credentials = require("./credentials.js");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://discord.com/channels/478967551876136990/895015513435029575");

  const [button] = await page.$x("//button[contains(.,'Im Browser fortfahren')]");
  await button.click();

  await page.type("[name='email']", credentials.email, { delay: 20 });
  await page.type("[name='password']", credentials.password, { delay: 20 });

  await page.click("button[type='submit']");

  await page.waitForNavigation();

  // TODO: find a way to type into the textbox of discord
  //await page.click("div[role='textbox']");

  await page.keyboard.type("p!work", { delay: 50 });

  await page.keyboard.press("Enter");

  //   await browser.close();
})();
