# Local Agent Notes

## Scope and shared work

- Read [README.md](README.md) for setup, build commands, and the repository map.
- Run `git status --short` before editing. Unrelated dirty decks, scratch documents, and worktrees may be present. Preserve them and keep them out of your commit.
- Keep changes focused. Stage only the files belonging to the requested change.
- When separate authoring and visual-review agents are requested for a deck, run their editing passes sequentially. The coordinator collects the results and commits once at the end.

## Content and generated files

- Collection schemas live in `src/content/config.ts`.
- Every content tag, including deck tags, must already exist in `src/data/tags.yaml`. Register new tags before previewing. An unknown tag fails content validation with `InvalidContentEntryDataError`.
- Edit `src/data/resume-main.yaml` for resume and CV changes. Run `npm run preprocess:resume` to validate and regenerate the variants.
- Do not hand-edit or commit generated resume/CV YAML, PDFs, or build output. See `.gitignore` for the generated paths.

## Slide decks

- Decks live in `src/content/slides/<slug>.mdx` and render at `/slides/<slug>`. Static assets go in `public/` and are referenced by paths relative to the site root.
- Check `src/content/config.ts` for required frontmatter and accepted values. Use an existing deck as a structural example and `src/layouts/SlideLayout.astro` as the source of truth for shared classes.
- Shared heading sizes currently apply only to deck slugs beginning with `foundry`, plus `client-testing` and `workflow-step-params`. A new slug does not inherit that scale automatically. Check the layout selectors before relying on it. There is currently no frontmatter flag for opting in.
- Mermaid sizing and edge-label fixes are scoped to slugs beginning with `foundry`. Check diagrams in other decks explicitly. For simple left-to-right chains, the shared `.flow`, `.flow-node`, and `.flow-arrow` classes are available across decks.
- MDX treats bare braces as JavaScript expressions, including inside speaker notes. Escape literal braces in prose, and avoid raw JSON or API payloads in notes. For code blocks with braces, follow the `client-testing.mdx` pattern: define an `export const` template string and render it with `<pre class="code-block"><code>{EXAMPLE}</code></pre>`. Escape embedded backticks and template interpolation when needed.
- Preview changed slides in a browser and inspect text, images, diagrams, and clipping. Allow transitions and asynchronous diagrams to finish before capturing screenshots. If Astro's error overlay persists after a fix, reload with a fresh query string.
- Preserve original screenshots when making crops. Keep review screenshots and temporary artifacts outside the content and asset directories.

## Validation and commits

- For a focused change, run `npx prettier --check <changed-files>` on supported, non-ignored files, then `make lint typecheck`. Select the actual paths instead of passing the placeholder literally.
- `.prettierignore` currently excludes all of `src/content/slides/`. A successful formatting check does not validate an ignored deck. Use Astro checks and a browser preview for deck changes.
- `make test` includes `prettier --check .`. Untracked Markdown and `.claude/worktrees/` can cause failures unrelated to your change because those paths are not currently ignored. Report unrelated failures without reformatting other work.
- Avoid `make format` for a narrow task because it formats the whole repository.
- For build changes, run `npm run build` when RenderCV is available. To validate the site without regenerating PDFs, run `npm run preprocess:resume` followed by `npx astro build`, and report that PDF generation was skipped.
- The pre-commit hook runs `npx lint-staged`. It applies Prettier to staged supported files and ESLint fixes to staged JavaScript/TypeScript. Lint-staged normally creates a temporary stash to protect unstaged work. Inspect the resulting diff and status after committing.
- Do not deploy as part of routine validation. `make deploy` updates production and uses rsync with `--delete`.

## GitHub CLI authentication

Do not treat `gh auth status` alone as proof that GitHub access is blocked in this environment. It may report a stale stored token while repository API requests still authenticate through another credential path.

Before stopping a GitHub workflow for authentication, try a harmless repository read:

```sh
gh repo view --json nameWithOwner,defaultBranchRef
```

Only report an authentication blocker when an actual API request fails for an authentication reason. Distinguish authentication failures from sandbox or transient network failures.
