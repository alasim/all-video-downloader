const puppeteer = require("puppeteer");
function avd(url, headless = true) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = "https://en.savefrom.net/65/";
      const browser = await puppeteer.launch({
        headless: headless,
        args: ["--disable-setuid-sandbox", "--disable-notifications"],
        ignoreHTTPSErrors: true,
      });
      const page = await browser.newPage();
      console.log("going to " + URL + ".............");
      await page.goto(URL);
      console.log("start typing...............");
      await page.type("#sf_url", url, { delay: 0 });
      console.log("submiting...............");
      await page.click("#sf_submit");
      console.log("waiting for .media-result...............");
      await page.waitForSelector(".media-result");
      console.log(".media-result loaded...............");
      const result = await page.evaluate(() => {
        const thub = document.querySelector(".media-result .clip img").src;
        const info = document.querySelector(".info-box");
        const title = info.querySelector(".title").innerText;
        const duration = info.querySelector(".duration").innerText;
        const link_group = [...info.querySelectorAll(".link-group a")];
        console.log(link_group);

        let links = link_group.map((link) => {
          const video_format = link.title;
          const href = link.href;
          const text = link.innerText;
          return { video_format, href, text };
        });
        if (links.length == 0) {
          console.log(links);
          const link = info.querySelector(".link-download");
          const video_format = "";
          const href = link.href;
          const text = link.innerText.replace("Download", "").trim();
          links.push({ video_format, href, text });
        }
        return {
          info: { title, thub, duration },
          links,
        };
      });
      resolve(result);
      browser.close();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = avd;

/* 
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show });
  return new Promise(async (resolve, reject) => {
    nightmare
      .goto("https://en.savefrom.net/65/")
      .insert("#sf_url", url)
      .click("#sf_submit")
      .wait(".media-result .clip img")
      .evaluate(() => {
        const thub = document.querySelector(".media-result .clip img").src;
        const info = document.querySelector(".info-box");
        const title = info.querySelector(".title").innerText;
        const duration = info.querySelector(".duration").innerText;
        const link_group = [...info.querySelectorAll(".link-group a")];
        console.log(link_group);

        let links = link_group.map((link) => {
          const video_format = link.title;
          const href = link.href;
          const text = link.innerText;
          return { video_format, href, text };
        });

        return {
          info: { title, thub, duration },
          links,
        };
      })
      .end()
      .then((result) => {
        // console.log(`from index result`, result);
        resolve(result);
      })
      .catch((error) => {
        reject("Search failed:", error);
      });
  });

*/
