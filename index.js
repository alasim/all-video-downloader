const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });

function avd({ url }) {
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
}

module.exports = avd;
