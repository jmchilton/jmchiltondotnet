# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 📄 Resume/CV

Resume and CV maintained from single source:

- `src/data/resume-main.yaml` - Single source of truth (all content)
- `src/data/resume.yaml` - Auto-generated short version
- `src/data/cv.yaml` - Auto-generated full version

**Editing:**

1. Edit `src/data/resume-main.yaml`
2. Run `npm run preprocess:resume` to generate variants
3. Run `npm run build:pdfs` to create PDFs
4. Run `npm run dev` to preview HTML (with live-reload)

**Filtering:**

- Use `include_in: resume`, `cv`, or `both` to control visibility
- Use `highlights_resume` / `highlights_cv` for different detail levels
- Use `resume_limit: N` to limit entries in resume
- Use `priority: N` to control ordering

**PDF Generation:** Uses [RenderCV](https://github.com/rendercv/rendercv)
**HTML Rendering:** Astro pages at /resume and /cv

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
