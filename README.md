# Logan Liang May — Portfolio

A professional portfolio site built for **GitHub Pages**.  
Live URL: **https://loganliangmay.github.io**

---

## Deploy to GitHub Pages (free hosting)

### 1. Use your existing repo

Your repo is: **https://github.com/LoganLiangMay/loganliangmay.github.io**

Because the repo is named `loganliangmay.github.io`, the site will be served at:

**https://loganliangmay.github.io**

(No `/portfolio` path — the root of the repo is your site.)

### 2. Push these files to the repo

**Option A — Clone, copy, push**

```bash
# Clone your GitHub Pages repo
git clone https://github.com/LoganLiangMay/loganliangmay.github.io.git
cd loganliangmay.github.io

# Copy in the portfolio files from logan_portfolio_website:
# - index.html, styles.css, script.js, images/, fonts/, README.md, Logan_May_Resume.docx
cp /path/to/logan_portfolio_website/index.html .
cp /path/to/logan_portfolio_website/styles.css .
cp /path/to/logan_portfolio_website/script.js .
cp /path/to/logan_portfolio_website/Logan_May_Resume.docx .
cp -r /path/to/logan_portfolio_website/fonts .

git add index.html styles.css script.js images/ fonts/ README.md Logan_May_Resume.docx
git commit -m "Add portfolio website"
git push origin main
```

**Option B — Use this project as the repo**

If this folder (`logan_portfolio_website`) is already a git repo, or you want it to be the source:

```bash
cd /Users/logan/Projects/logan_portfolio_website

git init
git remote add origin https://github.com/LoganLiangMay/loganliangmay.github.io.git

# If the repo already has a main branch (e.g. from README):
git pull origin main --rebase

git add index.html styles.css script.js images/ fonts/ README.md Logan_May_Resume.docx
git commit -m "Add portfolio website"
git push -u origin main
```

### 3. Turn on GitHub Pages

1. Open: **https://github.com/LoganLiangMay/loganliangmay.github.io**
2. Go to **Settings** → **Pages** (under “Code and automation”).
3. Under **Source**, choose **“Deploy from a branch”**.
4. **Branch:** `main` — **Folder:** `/ (root)`.
5. Click **Save**.

After a few minutes, the site will be at **https://loganliangmay.github.io**.

---

## Updating content

The site is pre-filled from **Logan_May_Resume.docx**. To update: edit **index.html** (contact info, experience, projects, about, skills). To change the downloadable resume, replace **Logan_May_Resume.docx** in the project root; for a PDF, update the "Download Resume" link in `index.html` to point to your PDF file.

---

## Project structure

```
loganliangmay.github.io/
├── index.html      # Main page (required at root for GitHub Pages)
├── styles.css
├── script.js
├── images/         # Profile photo, project screenshots
├── fonts/          # Gotham-Bold.woff2 (+ .woff) for headings; see fonts/README.md
└── README.md
```

- Use **relative** paths: `href="styles.css"`, `src="images/photo.jpg"`.
- `index.html` must be in the **root** of the repo.

---

## Features

- **Light/dark theme** — Toggle in the nav; preference saved in `localStorage`.
- **Responsive** — Works on phone, tablet, and desktop.
- **Smooth scrolling** — In-page links scroll to sections.
- **Static** — No backend; works with GitHub Pages’ free hosting.

---

## Other free hosting (alternatives)

If you ever want to move off GitHub Pages:

- **Vercel** — Good for static and Next.js; connect the same repo.
- **Netlify** — Similar to Vercel; drag-and-drop or Git deploy.
- **Cloudflare Pages** — Fast CDN; connect repo or upload build.

For this static HTML/CSS/JS site, **GitHub Pages is enough and stays free**.
