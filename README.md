# asim-video-downloader

A social video downloader npm package which helps to ganerate downloadable urls for all kind of social videos

# Installation

```sh
npm i asim-video-downloader
```

then...

```js
const avd = require("asim-video-downloader");

const data = avd("https://www.youtube.com/watch?v=-DEPDfN8ZYk").then(
  (result) => {
    console.log(result);
    return result;
  }
);

/*
output:
{
  info: {
    duration: '10:08',
    thub: 'https://i.ytimg.com/vi/-DEPDfN8ZYk/hqdefault.jpg',
    title: 'Top New Zach King Magic Vines 2017 - Best Magic Tricks Ever'
  },
  links: [
    {
      href: downloadabe video url,
      text: 'MP4 720',
      video_format: 'video format: 720'
    },
    {
      href: href: downloadabe video url,
      text: 'MP4 360',
      video_format: 'video format: 360'
    }
  ]
}
*/
```

## All Supported Platforms:

| youtube.com        | facebook.com    | instagram.com | twitter.com |
| ------------------ | --------------- | ------------- | ----------- |
| tiktok.com         | dailymotion.com | vimeo.com     | vk.com      |
| odnoklassniki.ru   | soundcloud.com  | bilibili.com  | hotstar.com |
| openloadmovies.net | streamago.com   | tiktok.com    | tune.pk     |
| viu.com            | ---             | ---           | ---         |

[![Best Buildup](https://res.cloudinary.com/alasim/image/upload/v1638729338/hosting%20content/best_buldup.png)](https://www.bestbuildup.com/)
