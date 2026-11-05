# Lakewood Ranch Foundation for Children — www.lwrfc.org

Static site, one page. No build step, no framework, no server code. Upload the contents of this
folder to the web root and set `index.html` as the default document.

```
index.html        the page (all copy)
css/styles.css    all styling
js/main.js        research "Read the study details" link + impact counter animation
images/           optimised photos (WebP, 700 and 1200 px), logo, favicon, share image
fonts/            Anton + Barlow (SIL Open Font License), self-hosted woff2
```

## Where it came from (2026-11-05)

Built from Jeff's sample, `https://lwr-foundation-v9.jbrandon7.chatgpt.site` (V9). **The wording is
unchanged, word for word** (checked by comparing the visible text of both pages). Only engineering
changes:

- The sample was one 3.4 MB HTML file with fonts and photos embedded inside it (2.4 MB to download
  before anything shows). Split into normal files: first load is now about 290 KB on desktop.
  Photos are served at the size the screen needs, and the lower ones load lazily.
- Fonts converted to woff2 (290 KB → 108 KB).
- Removed a Cloudflare script that the ChatGPT host injects; it would fail on any other server.
- Added link-preview tags (`images/share.jpg`), a favicon, and dropped "| V9" from the page title.

## Hosting (2026-11-05)

Firebase Hosting, project `semkhor-hosting` (Semkhor), site **`lwrfc-org`** → https://lwrfc-org.web.app
Deploy from this folder: `firebase deploy --only hosting:lwrfc` (target defined in `.firebaserc`).
`.git`, README and Firebase config files are excluded from the upload.

Custom domains added in Firebase: **www.lwrfc.org** (main) and **lwrfc.org** (redirects to www).
DNS for lwrfc.org is hosted at **HostGator** (nameservers hgns1/hgns2.hostgator.com; registrar
Network Solutions). Records Jeff must set there:

| Host | Type | Value |
|---|---|---|
| `lwrfc.org` (@) | A | `199.36.158.100` (replace the existing A `208.91.197.15`) |
| `lwrfc.org` (@) | TXT | `hosting-site=lwrfc-org` |
| `www` | CNAME | `lwrfc-org.web.app` (replace the existing `www` A record) |

Firebase then issues the SSL certificate automatically (minutes to 24 hours).
The GitHub Pages copy (michaelsemkhorproductions.github.io/lwrfc-site) is only a preview now.

## Before it goes live

- **Domain:** `lwrfc.org` / `www.lwrfc.org` currently resolve to `208.91.197.15`, a registrar
  placeholder ("Page cannot be displayed"). Whoever controls the domain must point it at the
  hosting server. DNS changes can take a few hours to spread, so this should happen by Friday.
- **Share tags** in `index.html` use absolute `https://www.lwrfc.org/` URLs (needed for link
  previews). If the site lives at another address first, they still work once the domain is live.
- **Donations** go to the existing Pledge page (`pledge.to/widgets/donate/9228f12f...`), which is
  titled "Lakewood Ranch FC". The site collects no payments or personal data itself.
- **Contact** links use jeffrey@lakewoodranchfc.org and text 941-725-5881, as in the sample.
