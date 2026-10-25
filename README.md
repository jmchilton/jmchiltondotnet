# jmchilton.net

John Chilton's personal website, built with Astro, MDX, Tailwind CSS, and Reveal.js. It includes a project timeline, presentations, resume and CV, cocktails, and Pittsburgh recommendations.

## Local development

Install Node.js and npm compatible with Astro 5, then run these commands from the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, normally `http://localhost:4321`. The development command validates the resume source, generates the resume and CV variants, and watches for changes.

## Repository guide

| Path                            | Contents                                                |
| ------------------------------- | ------------------------------------------------------- |
| `src/pages/`                    | Site routes                                             |
| `src/content/`                  | Content collections, including slide decks in `slides/` |
| `src/content/config.ts`         | Collection schemas and frontmatter validation           |
| `src/data/tags.yaml`            | Allowed tags for content collections                    |
| `src/data/resume-main.yaml`     | Resume and CV source of truth                           |
| `src/layouts/SlideLayout.astro` | Shared Reveal.js layout and slide styles                |
| `public/`                       | Static assets served directly by the site               |
| `scripts/`                      | Resume generation, validation, and slide PDF export     |

Read [AGENTS.md](AGENTS.md) before making changes. It covers validation, slide authoring constraints, and working alongside unrelated changes.

## Validation

```sh
make lint typecheck
make test
```

`make test` runs repository-wide formatting, linting, and Astro checks. For a focused change in a dirty checkout, check formatting on the files you changed and run `make lint typecheck`. See [AGENTS.md](AGENTS.md) for the slide formatting exception and commit-hook behavior.

## Production build

The standard build uses RenderCV, a Python command-line tool, to generate the resume and CV PDFs. `npm ci` does not install it. With [uv installed](https://docs.astral.sh/uv/getting-started/installation/), install the same Python and RenderCV versions used by CI:

```sh
uv tool install --python 3.12 'rendercv[full]==2.4'
rendercv --version
```

If `rendercv` is not found, run `uv tool update-shell`, restart your shell, and retry `rendercv --version`. This adds uv's tool directory to your PATH. See [uv's tool guide](https://docs.astral.sh/uv/guides/tools/) for details.

Once `rendercv` is available, build and preview the site:

```sh
npm run build
npm run preview
```

The build generates resume and CV PDFs in `public/`, then writes the static site to `dist/`. Preview serves that output at the URL printed by Astro.

To check the Astro site without regenerating PDFs:

```sh
npm run preprocess:resume
npx astro build
```

This skips PDF generation, so a complete site with fresh PDFs still requires the standard build.

## Resume and CV

Edit `src/data/resume-main.yaml`. Do not edit the generated `src/data/resume.yaml` or `src/data/cv.yaml` files directly.

```sh
npm run preprocess:resume
npm run build:pdfs
```

The first command validates the source and generates both YAML variants. The second also renders `public/resume.pdf` and `public/cv.pdf`. These outputs are ignored by Git. The HTML versions are available at `/resume` and `/cv`.

Use `include_in: resume`, `cv`, or `both` to control visibility. The generator also supports format-specific highlights and entry limits. The `make cv` target invokes an older LaTeX workflow. Use `npm run build:pdfs` for the current YAML source.

## Slide decks

Decks live in `src/content/slides/<slug>.mdx` and appear at `/slides/<slug>`. Check the slide guidance in [AGENTS.md](AGENTS.md) before adding a deck.

To export a deck, start the development server and run this in another terminal, substituting the server's actual port and the deck slug:

```sh
SLIDES_BASE=http://localhost:4321 npm run export:slides -- <slug>
```

The exporter invokes Decktape through `npx` and writes `dist-pdf/<slug>.pdf`. It defaults to port 4331 when `SLIDES_BASE` is omitted.

## Deployment

[DEPLOYMENT.md](DEPLOYMENT.md) describes server setup. `make deploy-dry` builds the site and previews the rsync transfer. `make deploy` builds and syncs `dist/` to the production server, deleting remote files absent from the build. Both require RenderCV and SSH access.
