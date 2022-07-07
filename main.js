const puppeteer = require("puppeteer");
const credentials = require("./credentials.js");

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ["--window-size=1366,800"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  console.log("Visiting Discord");
  await page.goto(credentials.channelAddress);

  const [button] = await page.$x("//button[contains(.,'Im Browser fortfahren')]");
  if (button) {
    console.log("Click on web version");
    await button.click();
  }

  console.log("Filling out form");
  await page.waitForSelector("input[name='email']");
  await page.type("[name='email']", credentials.email, { delay: 50 });
  await page.type("[name='password']", credentials.password, { delay: 50 });

  await page.click("button[type='submit']");

  await page.waitForNavigation();

  await page.waitForSelector("div[role='textbox']", { visible: true });

  async function goToWork(x) {
    console.log("Play high low");
    await page.keyboard.type("p!highlow", { delay: 50 });
    await page.keyboard.press("Enter");
    const randNumber = Math.floor(Math.random() * 2);
    const enterText = randNumber == 0 ? "higher" : "lower";
    await page.keyboard.type(enterText, { delay: 100 });
    await page.keyboard.press("Enter");

    if (x % 2 == 0) {
      console.log("Go fishing");
      await page.keyboard.type("p!withdraw 50", { delay: 50 });
      await page.keyboard.press("Enter");

      await page.keyboard.type("p!buy rod", { delay: 50 });
      await page.keyboard.press("Enter");

      try {
        await page.waitForSelector("div.reactionInner-YJjOtT", { timeout: 3000 });
      } catch {}

      const checkmark = await page.$("div.reactionInner-YJjOtT");
      if (checkmark) {
        console.log("Buying fishing rod");
        await page.evaluate(() => document.querySelector(".reactionInner-YJjOtT").click());
      }

      await page.keyboard.type("p!fish", { delay: 50 });
      await page.keyboard.press("Enter");
    }

    if (x % 20 == 0) {
      console.log("Playing trivia");
      await page.keyboard.type("p!trivia hard", { delay: 50 });
      await page.keyboard.press("Enter");
      await page.waitForTimeout(2000);
      const randNumber = Math.floor(Math.random() * 4) + 1;
      await page.keyboard.type(randNumber.toString());
      await page.keyboard.press("Enter");
    }

    if (x % 10 == 0) {
      console.log("time to go to work");
      await page.keyboard.type("p!work", { delay: 50 });
      await page.keyboard.press("Enter");

      console.log("Selling all items");
      await page.keyboard.type("p!sell all", { delay: 50 });
      await page.keyboard.press("Enter");
      try {
        await page.waitForSelector("div.reactionInner-YJjOtT", { timeout: 3000 });

        const checkmark = await page.$("div.reactionInner-YJjOtT");
        if (checkmark) {
          await page.evaluate(() => document.querySelector(".reactionInner-YJjOtT").click());
        }
      } catch {}

      await page.keyboard.type("p!deposit all", { delay: 50 });
      await page.keyboard.press("Enter");
    }
    console.log("Waiting for 30 seconds...");
    await page.waitForTimeout(1000 * 30);
    await goToWork((x + 1) % 20);
  }
  await goToWork(0);

  // await browser.close();
})();
