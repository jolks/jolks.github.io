## jolks.github.io
* `sandbox` - contains misc test code.
* `.hexo` - directory to generate the static website.
```sh
# Setup
$ npm install
$ cd .hexo
$ npm install

# Update (2023/04/05)
# Not backward compatible with latest nodejs and npm
$ nvm use v10.18.1

# To create new post
$ ./node_modules/.bin/hexo --cwd .hexo new post "A New Post"
# Start writing inside .hexo/source/_posts/A-New-Post.md file

# Run both on different screens
$ npm run site:dev
$ npm run site:generate:watch

$ npm run site:clean
$ npm run site:generate
$ npm run site:deploy
```

### To develop and deploy

Description | URL
------------ | -------------
Responsive Tables in Pure CSS | [link](https://jolks.github.io/sandbox/responsive_table.html)
Japan Postcode to Address with Full-width romaji support | [link](https://jolks.github.io/sandbox/jp_postcode2address.html)
Client-side PDF generation | [link](https://jolks.github.io/sandbox/pdf.html)
Take photo with Camera on iOS and Android | [link](https://jolks.github.io/sandbox/camera.html)
Animation samples | [link](https://jolks.github.io/sandbox/animation.html)
Copy & Paste text or HTML | [link](https://jolks.github.io/sandbox/copy_paste.html)
