# Retiring reactstrap in favour of MUI

Status: planned. This doc covers what we're doing, the order of the work, and how we'll know it's finished.

## Background

- 124 files import from `reactstrap` (pinned at `9.2.3`). Most are in `src/components/contentblocks` (27), `common` (23), `actions` (20), `paths` (13) and `indicators` (12). `kausal_common` doesn't import it.
- Most of the usage is layout: `Container`/`Row`/`Col` appear in about 60 files. Next are `Button` (15), `Collapse` (12), form parts (about 11 each), `Alert` (10) and dropdowns (7–8).
- MUI 7 is already set up and themed. `kausal_common/src/themes/mui-theme/components.ts` has overrides for Button, Card, Alert, Table, Tooltip, Tabs, Menu, Switch and others.
- Bootstrap's CSS is loaded separately from reactstrap, through `kausal_common/src/themes/styles/main.scss` inside `@layer bootstrap`. Removing reactstrap doesn't remove it.
- About 35 files style Bootstrap class names directly (`.dropdown-menu`, `.nav-link`, `.btn`, `.card-body`, `.form-control`, …). When a component is swapped, those selectors have to be rewritten or they'll quietly stop matching.

## Scope

In scope:

- Removing the `reactstrap` package and every import of it, and `@popperjs/core` if nothing else uses it.
- Replacing the theme breakpoint tokens (`theme.breakpointSm/Md/Lg/Xl`) with MUI's default `theme.breakpoints`. No theme overrides the defaults, and paths-ui already works this way.

Out of scope (deferred):

- Removing Bootstrap's CSS, its grid and utility classes (`mb-5`, `d-flex`, `visually-hidden`, `btn`, …), and the `$breakpoint-*` SCSS variables in `_theme-variables.scss`. Leftover Bootstrap classes keep using Bootstrap's breakpoints until that later project.

## Breakpoints

Going to MUI's defaults moves every breakpoint up, so this changes layout and needs a screenshot review:

|     | Bootstrap / theme tokens | MUI defaults |
| --- | ------------------------ | ------------ |
| sm  | 576px                    | 600px        |
| md  | 768px                    | 900px        |
| lg  | 992px                    | 1200px       |
| xl  | 1200px                   | 1536px       |

## Component mapping

| reactstrap                                                                       | MUI replacement                                                               | Notes                                                                                                                                                |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Container` / `Row` / `Col`, `ColProps`                                          | `Container` / `Grid container` / `Grid size offset`                           | Replace `ColProps` in `src/common/blocks.types.ts` with a local type.                                                                                |
| `Button`, `ButtonProps`                                                          | `Button`                                                                      | Migrate the wrapper `src/components/common/Button.tsx` first. `color` + `outline` become `variant`/`color`. `tag={Link}` becomes `component={Link}`. |
| `ButtonGroup`, `ButtonToggle`                                                    | `ButtonGroup`, `ToggleButtonGroup`                                            | ButtonToggle is used in `paths/RangeSelector.tsx`.                                                                                                   |
| `Collapse`, `UncontrolledCollapse`                                               | `Collapse in={…}`                                                             | Uncontrolled versions need local `useState`, and each trigger needs `aria-expanded` and `aria-controls`.                                             |
| `Alert`, `UncontrolledAlert`                                                     | `Alert severity`                                                              | `color` becomes `severity`. The dismissable version becomes `onClose` plus state.                                                                    |
| `Spinner`                                                                        | `CircularProgress`                                                            |                                                                                                                                                      |
| `Progress`                                                                       | `LinearProgress`                                                              |                                                                                                                                                      |
| `Card`, `CardBody`, `CardTitle`, `CardFooter`, `CardImgOverlay`                  | `Card`, `CardContent`, `Typography`, `CardActions`, a styled overlay `Box`    |                                                                                                                                                      |
| `Badge`                                                                          | `Chip`                                                                        | MUI `Badge` is a notification dot, so it isn't the right match.                                                                                      |
| `Tooltip`, `UncontrolledTooltip`                                                 | `Tooltip` wrapping its child                                                  | The `target`-id pattern goes away.                                                                                                                   |
| `UncontrolledDropdown`, `DropdownToggle/Menu/Item`, `UncontrolledButtonDropdown` | `Button` + `Menu` + `MenuItem`                                                | Put this in one shared `DropdownMenu` component, since the pattern repeats in 8 places.                                                              |
| `Nav`, `NavItem`, `NavLink`, `TabContent`                                        | `Tabs`/`Tab` for tabbed content; styled `ul`/`li` for nav lists               |                                                                                                                                                      |
| `Navbar` (+ `Collapse`)                                                          | styled `nav` + `Collapse`                                                     | The hardest part. See step 6.                                                                                                                        |
| `Table`                                                                          | `Table` family, or a styled `<table>` where the markup is simple              |                                                                                                                                                      |
| `Form`, `FormGroup`, `Label`, `Input`, `FormFeedback`, `InputProps`              | `FormControl`, `FormLabel`, `TextField`/`Select`/`Checkbox`, `FormHelperText` | Migrate the wrappers (`TextInput`, `SelectInput`, `CheckboxInput`, `DropDown`, `SelectDropdown`, `Switch`) so callers don't change.                  |
| `InputGroup`                                                                     | `TextField` + `InputAdornment`                                                |                                                                                                                                                      |
| `ListGroup`, `ListGroupItem`                                                     | `List`, `ListItem`                                                            |                                                                                                                                                      |
| `CloseButton`                                                                    | `IconButton` + close icon                                                     |                                                                                                                                                      |
| `Media`                                                                          | styled `Box`                                                                  | reactstrap 9 dropped `Media`. `ActionUpdatesList.js` may be dead code; check it and delete it if so.                                                 |

## Work plan

Each PR:

- swaps its components
- rewrites any selectors that target Bootstrap classes in the files it touches
- removes leftover Bootstrap classes from those files
- comes with a screenshot diff

### 0. Groundwork

1. Add an ESLint `no-restricted-imports` rule for `reactstrap`. Set it to `warn` now and switch it to `error` in the last PR.
2. Set up the layout primitives:
   - **`Container`:** use MUI's `Container` as it is, with `maxWidth="lg"` (1200px). Bootstrap's container was 1140px at xl and 1320px at xxl, so wide screens change slightly. Accept that during the screenshot review, or set a custom `maxWidth` if design objects.
   - **Rows and columns:** `Row` becomes `GridRow` (`src/components/common/layout/GridRow.tsx`), and `Col` becomes a plain MUI `Grid` item. `GridRow` spaces columns with Bootstrap's 1.5rem gutter and no vertical gap, like a `.row`. `ColumnProps` from the same file replaces reactstrap's `ColProps`. See the conversion rules under step 7.
3. Capture visual baselines before the breakpoint PR, using `e2e-tests/tests/visual-baseline.spec.ts`.
   - It takes full-page screenshots of home, action list, an action, indicator list, an indicator and a content page. Each is captured at 390, 820, 1100 and 1440px, widths that fall between the Bootstrap and MUI breakpoints.
   - It runs only when `VISUAL_BASELINE=1` is set, so the regular e2e runs skip it.
   - Set the plans to capture in `VISUAL_PLAN_IDENTIFIERS` (comma-separated) in the gitignored `e2e-tests/.env`. Pick 3–4 plans with distinctive themes, including a customised one. Without it, the spec falls back to `TEST_PLAN_IDENTIFIERS`.
   - The pages show live data, so the screenshots are gitignored rather than committed. Capture the baseline from `main` just before starting a PR, and compare the branch soon afterwards:

     ```bash
     cd e2e-tests
     VISUAL_BASELINE=1 pnpm exec playwright test visual-baseline --project=chromium --update-snapshots  # on main
     VISUAL_BASELINE=1 pnpm exec playwright test visual-baseline --project=chromium                     # on the branch
     ```

     Review the differences in the HTML report.

   - Use the published theme packages, not a local link to `kausal-themes`. A locally linked theme needs the `--webpack` dev server, which is too slow for this. With published themes, the default `pnpm dev` (Turbopack) works: run it with `WILDCARD_DOMAINS=localhost` and set `TEST_PAGE_BASE_URL='http://{planId}.localhost:3000'`. When `TEST_PAGE_BASE_URL` is unset, Playwright starts `pnpm start` itself, which needs a `pnpm build` first.
   - The spec keeps repeat runs comparable:
     - it masks charts;
     - it pins the paths settings panel into the page flow;
     - it hides the Next.js dev indicator;
     - it re-registers web fonts from memory, because Chrome re-fetches them on every screenshot and the text can go blank;
     - it allows up to 200 differing pixels for text-rendering jitter.

     Expect the odd one-off difference from live data; judge it by eye in the report.

### 1. Move to MUI breakpoints

Replace the theme tokens in watch-ui (55 files) and `kausal_common/src/themes/ThemedGlobalStyles.tsx`. `breakpointMd` accounts for 114 of the 150 uses. Nearly all of them are one of two patterns, so a codemod handles most of it:

| Current                                                                          | Replacement                                      |
| -------------------------------------------------------------------------------- | ------------------------------------------------ |
| `@media (min-width: ${(p) => p.theme.breakpointMd})`                             | `${({ theme }) => theme.breakpoints.up('md')}`   |
| `@media (max-width: ${(p) => p.theme.breakpointMd})`                             | `${({ theme }) => theme.breakpoints.down('md')}` |
| `max-width: ${theme.breakpointSm}` used as a width, not a media query (4 places) | `${theme.breakpoints.values.sm}px`               |
| `window.matchMedia(...)` in `DashboardIndicatorPieChartBlock.tsx`                | `useMediaQuery(theme.breakpoints.down('md'))`    |

Things to check:

- **Off-by-one widths.** `down('md')` is `max-width: 899.95px`. Today's `max-width: 768px` and `min-width: 768px` both match at exactly 768px. The fix happens by itself, but look for styles that were compensating for it.
- **Desktop and mobile styles that must switch at the same width.** Where a styled-component query and a Bootstrap class (`d-md-none`, `col-md-*`) work together, for example the GlobalNav mobile menu, replace the Bootstrap class with a `theme.breakpoints` query in the same PR. Otherwise 768–899px shows both, or neither.
- **Typing.** `theme.breakpoints` should already type-check in styled components, since `mui-theme/theme.ts` merges MUI's `Theme` into the emotion theme.

### 2. Simple one-to-one swaps (~20 files)

`Spinner`, `Progress`, `Badge`, `Alert`/`UncontrolledAlert`, `Tooltip`/`UncontrolledTooltip`, `CloseButton`, `ListGroup`, `Media`.

### 3. Buttons and collapses (~25 files)

1. The `Button` wrapper, then its direct users.
2. `Collapse`/`UncontrolledCollapse`: Accordion, RichText, ContactPerson, TaskList, GraphAsTable, ReportComparisonBlock, ActionVersionHistory, the paths toolbar.
3. Update the `.collapse.show` selector in `e2e-tests/tests/report-comparison.spec.ts`.

### 4. Cards and tables (~15 files)

ActionHighlightCard, IndicatorCard, IndicatorHighlightCard, ActionRelatedIndicatorsBlock, `common/Card`, DashCard, ActionsTable, ActionStatusTable, IndicatorListFiltered, PlanDatasetsBlock, ThemeDesignTokens.

### 5. Forms (~12 files)

1. The input wrappers first.
2. Then ActionListFilters, SearchView, CategoryTypeListBlock, NormalizationWidget, GlobalParameters.
3. Check that validation messages and `aria-invalid` still behave as before.

### 6. Dropdowns and navigation (~12 files)

1. Build the shared `DropdownMenu`.
2. Move LanguageSelector, PlanSelector, OrgSelector, PlanVersionSelector, ActionStatusExport, DataTable and CytoGraph onto it.
3. Rewrite `common/GlobalNav.tsx`, `NavBar`, the Zurich `GlobalNav`, IndicatorsHero, OrgContent and OutcomeNodeContent.

This is the riskiest PR: the menu shows on every page, is themed per plan, and has both a desktop dropdown and a mobile menu. Test keyboard use and screen readers by hand, at every breakpoint.

### 7. Layout grid (~60 files, mostly mechanical)

1. Write a jscodeshift codemod for the `Container`/`Row`/`Col` → `Container`/`GridRow`/`Grid` changes, following the rules below.
2. Hand-fix any `styled(Col)`-style wrappers the codemod can't handle.
3. Run it one folder at a time (`contentblocks`, `actions`, `indicators`, `paths`, `app/root`, the rest) so each diff is small enough to review.

Because pages are built from layout, the screenshot diffs matter most here.

Conversion rules:

| reactstrap                           | MUI                                                      |
| ------------------------------------ | -------------------------------------------------------- |
| `<Container>`                        | `<Container>`                                            |
| `<Container fluid>`                  | `<Container maxWidth={false}>`                           |
| `<Container tag="section">`          | `<Container component="section">`                        |
| `<Row>`                              | `<GridRow>`                                              |
| `<Col md="6">`, `<Col md={6}>`       | `<Grid size={{ xs: 12, md: 6 }}>`                        |
| `<Col md={{ size: 10, offset: 1 }}>` | `<Grid size={{ xs: 12, md: 10 }} offset={{ md: 1 }}>`    |
| `<Col>` (no sizes)                   | `<Grid size="grow">`                                     |
| `<Col xs="auto">`                    | `<Grid size="auto">`                                     |
| `columnProps?: ColProps`             | `columnProps?: ColumnProps`, spread onto the `Grid` item |

Two behaviours differ from Bootstrap, and the codemod has to account for them:

- **Items without a size.** A Bootstrap column is full width until one of its breakpoint sizes kicks in. A MUI `Grid` item without a `size` at a breakpoint takes its content width. So add `xs: 12` whenever a column has breakpoint sizes but no `xs`.
- **Bare `<Col>`.** In Bootstrap this means equal-width columns, which is `size="grow"` in MUI.

### 8. Cleanup

1. Remove `reactstrap`, and `@popperjs/core` if unused.
2. Switch the lint rule to `error`.
3. Run `pnpm dedupe`.
4. Check that `pnpm typecheck`, `pnpm exec eslint src`, `pnpm test`, e2e and a Storybook build are all clean.

Bootstrap SCSS stays.

Steps 2–5 don't depend on each other and can run in parallel. Step 7 can start once steps 0 and 1 are merged.

### Follow-up: remove the tokens from `@kausal/themes`

1. Migrate the remaining paths-ui use (`src/components/common/GlobalNav.tsx`, `breakpointMd`) to `theme.breakpoints.up('md')`.
2. Remove `breakpointSm/Md/Lg/Xl` from the themes package and publish a new version.
3. Bump `@kausal/themes` in both apps and run `pnpm dedupe`. The kausal_common submodule has its own lockfile importer, so this step is needed. Typecheck then catches anything missed.

## Risks

- **Visual drift across plan themes.** Bootstrap's components get their look from theme SCSS variables, while MUI's get theirs from `components.ts`. Where they differ (button padding, card borders, alert colours), change the MUI overrides rather than individual components.
- **CSS precedence.** Bootstrap sits in `@layer bootstrap`, and Emotion/MUI styles are unlayered, so MUI wins. Leftover Bootstrap classes on MUI components can still produce odd combinations.
- **Server and client components.** `Menu`, `Tooltip` and `Collapse` need `'use client'`. Some `Container`/`Row`/`Col` users are server components, which is fine for `Grid` and `Container`, but don't move stateful wrappers into server files.
- **Code the standard pages don't cover.** Embeds (`embed/v1`) and custom plan code (`paths/custom/zurich`) need their own review.

## Done when

- `grep -r reactstrap` over `src`, `kausal_common/src` and `package.json` returns nothing.
- `grep -rE 'breakpoint(Sm|Md|Lg|Xl)'` over `src`, `kausal_common/src` and paths-ui `src` returns nothing, and the themes package no longer defines the tokens.
- Screenshot diffs have been accepted for every baseline plan.
- Typecheck, lint, unit, e2e and Storybook all pass.
