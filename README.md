## jolks.github.io

Static personal site — pure HTML, CSS, and vanilla JS. No frameworks, no build step.

### Structure
* `index.html` — landing page
* `post.html` — redirects old `?slug=` URLs to `/posts/<slug>.html`
* `posts/` — blog posts as Markdown files, plus generated HTML pages with OG meta tags
* `build.py` — generates `posts/<slug>.html` from `posts/posts.json`
* `css/style.css` — single stylesheet
* `images/` — static assets
* `sandbox/` — misc test code

### Adding a new blog post
1. Add an entry to `posts/posts.json` (newest-first):
   ```json
   { "slug": "my-new-post", "title": "My New Post", "date": "2026-01-01" }
   ```
2. Create `posts/my-new-post.md` (no front matter needed — metadata lives in `posts.json`)
3. Run `python3 build.py` to generate the HTML page with OG meta tags

### Local development
```sh
python3 -m http.server
# Open http://localhost:8000
```

### Sandbox

Description | URL
------------ | -------------
Responsive Tables in Pure CSS | [link](https://jolks.github.io/sandbox/responsive_table.html)
Japan Postcode to Address with Full-width romaji support | [link](https://jolks.github.io/sandbox/jp_postcode2address.html)
Client-side PDF generation | [link](https://jolks.github.io/sandbox/pdf.html)
Take photo with Camera on iOS and Android | [link](https://jolks.github.io/sandbox/camera.html)
Animation samples | [link](https://jolks.github.io/sandbox/animation.html)
Copy & Paste text or HTML | [link](https://jolks.github.io/sandbox/copy_paste.html)
