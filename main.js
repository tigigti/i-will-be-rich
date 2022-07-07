const puppeteer = require("puppeteer");
const credentials = require("./credentials.js");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.setViewport({ width: 1366, height: 768 });
  console.log("Visiting Discord");
  await page.goto("https://discord.com/channels/478967551876136990/895015513435029575");

  const [button] = await page.$x("//button[contains(.,'Im Browser fortfahren')]");
  if (button) {
    console.log("Click on web version");
    await button.click();
  }

  console.log("Filling out form");
  await page.waitForSelector("input[name='email']");
  await page.type("[name='email']", credentials.email, { delay: 20 });
  await page.type("[name='password']", credentials.password, { delay: 20 });

  await page.click("button[type='submit']");

  await page.waitForNavigation();

  await page.waitForSelector("div[role='textbox']", { visible: true });

  console.log("Entering pancake commands");
  await page.keyboard.type("p!work", { delay: 50 });
  await page.keyboard.press("Enter");

  await page.keyboard.type("p!deposit all", { delay: 50 });
  await page.keyboard.press("Enter");

  await browser.close();
})();
