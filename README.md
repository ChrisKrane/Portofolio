# Portfolio

My personal portfolio site: the projects I've built, a devlog for the ones I'm still working on, and a bit about me. Built with [Astro](https://astro.build) as a fully static site and hosted on Cloudflare.

## Features

- **English and Norwegian.** Every page exists in both languages. The front page picks one from your browser settings, and the switcher in the header remembers your choice.
- **Dark by default**, with a light theme one click away. The choice is saved and applied before the page paints, so there's no flash of the wrong theme.
- **Projects grid** that rearranges itself into a bento layout depending on how many projects there are, with the highlighted project getting the large tile.
- **Devlog** with posts linked to projects. Each project page lists its own entries, and the front page shows what I'm currently building based on the latest post.
- **About page** with education and experience shown on a timeline.
- **Static and fast.** No client-side framework, just a few lines of JavaScript for the theme and language toggles. Animations are turned off for visitors who prefer reduced motion.

## Built with

- [Astro](https://astro.build) with TypeScript
- Content collections in Markdown, validated with Zod schemas
- Plain CSS with custom properties for theming
- [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), self-hosted through Fontsource
- [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) static assets for hosting, deployed with Wrangler

## Running locally

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The site is then available at `http://localhost:4321`.

| Command              | Action                                                    |
| :------------------- | :-------------------------------------------------------- |
| `npm run dev`        | Start the dev server                                      |
| `npm run build`      | Build the static site to `./dist/`                        |
| `npm run preview`    | Preview the production build                              |
| `npm run cf-preview` | Build and run the site locally in Cloudflare's runtime    |
| `npm run deploy`     | Build and deploy to Cloudflare                            |

## Project structure

```text
src/
├── components/   UI pieces: header, project grid, timeline, cards
├── content/      Projects, devlog posts and pages, one folder per language
├── i18n/         Interface text in English and Norwegian
├── layouts/      Shared page layout
├── pages/        Routes, with everything under [lang]/ built for both languages
└── styles/       Global styles and theme colours
```
