# Retiring reactstrap in favour of MUI

Status: steps 0–8 done on `feat/bye-reactstrap`; the themes package follow-up is open. This doc covers what we did, the order of the work, and how we know it's finished.

## Background

- 124 files import from `reactstrap` (pinned at `9.2.3`). Most are in `src/components/contentblocks` (27), `common` (23), `actions` (20), `paths` (13) and `indicators` (12). `kausal_common` doesn't import it.
- Most of the usage is layout: `Container`/`Row`/`Col` appear in about 60 files. Next are `Button` (15), `Collapse` (12), form parts (about 11 each), `Alert` (10) and dropdowns (7–8).
- MUI 7 is already set up and themed. `kausal_common/src/themes/mui-theme/components.ts` has overrides for Button, Card, Alert, Table, Tooltip, Tabs, Menu, Switch and others.
- Bootstrap's CSS is loaded separately from reactstrap, through `kausal_common/src/themes/styles/main.scss` inside `@layer bootstrap`. Removing reactstrap doesn't remove it.
- About 35 files style Bootstrap class names directly (`.dropdown-menu`, `.nav-link`, `.btn`, `.card-body`, `.form-control`, …). When a component is swapped, those selectors have to be rewritten or they'll quietly stop matching.

## Scope

In scope:

- Removing the `reactstrap` package and every import of it, and `@popperjs/core` if nothing else uses it.
- Replacing the theme breakpoint tokens (`theme.breakpointSm/Md/Lg/Xl`) with MUI's `theme.breakpoints`, using MUI's default values except `md`.

Out of scope (deferred):

- Removing Bootstrap's CSS, its grid and utility classes (`mb-5`, `d-flex`, `visually-hidden`, `btn`, …), and the `$breakpoint-*` SCSS variables in `_theme-variables.scss`. Leftover Bootstrap classes keep using Bootstrap's breakpoints until that later project.

## Breakpoints

The theme (`kausal_common/src/themes/mui-theme/theme.ts`) uses MUI's default breakpoints, except `md` and `xl`:

|     | Old (Bootstrap / theme tokens) | MUI default | Now    |
| --- | ------------------------------ | ----------- | ------ |
| sm  | 576px                          | 600px       | 600px  |
| md  | 768px                          | 900px       | 768px  |
| lg  | 992px                          | 1200px      | 1200px |
| xl  | 1200px (xxl 1400px)            | 1536px      | 1400px |

- **`md` stays at 768px.** It's the switch point Bootstrap and Tailwind share, and where tablets in portrait begin. With MUI's 900px, the nav and two-column layouts collapsed to mobile too early. There's no formal standard for breakpoint values; these use the values most widely shared between the common scales (Bootstrap, Tailwind, MUI, Material Design 3).
- **`lg` moves from 992px to 1200px.** Layouts that switch at `lg` do so later than before.
- **`xl` is 1400px, Bootstrap's widest step,** not MUI's 1536px. With a 1536px container, content was hard to lay out cleanly on very wide screens, and 1400px also gives a container step for screens from 1400px up.
- **paths-ui shares this theme.** Its `md` moves from MUI's 900px to 768px, and its `<Container fixed maxWidth="xl">` pages are now capped at 1400px instead of 1536px.
- **Bootstrap follows the same values,** through `$grid-breakpoints` in `kausal_common/src/themes/styles/_theme-variables.scss`.

Containers are MUI's `Container`, with MUI's gutters (`spacing(2)` on phones, `spacing(3)` from `sm`: 12.8px and 25.6px with the theme's spacing unit). Like MUI's `fixed` Container, each step is capped at the breakpoint's own width, but only from `lg`, so phones and tablets get the full width. A cap at `md` (768px) left a growing gap towards 1199px. `LayoutGrid`'s `Container` sets the caps; `$container-max-widths` has the same values for any leftover `.container` markup.

| Viewport    | Old (Bootstrap)              | Now        |
| ----------- | ---------------------------- | ---------- |
| < 576px     | full width                   | full width |
| 576–767px   | 540px                        | full width |
| 768–1199px  | 720px, then 960px from 992px | full width |
| 1200–1399px | 1140px                       | 1200px     |
| ≥ 1400px    | 1320px                       | 1400px     |

The widths include the gutters. Bootstrap's gutters were 12px, so from `sm` content sits about 14px further in on each side than before; on phones the difference is under 1px.

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
   - **Rows and columns:** planned as a gap-based `GridRow`. Step 7 used reactstrap-compatible `Row` and `Col` on MUI `Grid` instead, and `GridRow` was deleted.
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

Status: done on `feat/bye-reactstrap`.

The theme tokens are gone from watch-ui and `kausal_common/src/themes/ThemedGlobalStyles.tsx`:

- **Media queries.** A codemod converted 133 of them. `@media (min-width: ${X.breakpointMd})` became `${X.breakpoints.up('md')}`, and the `max-width` form became `down()`. Each file keeps its own way of reaching the theme.
- **Runtime checks.** The `parseInt(theme.breakpointMd)` checks in `GlobalNav` and `IndicatorProgressBar` compare against `theme.breakpoints.values.md` instead. `DashboardIndicatorPieChartBlock` uses `useMediaQuery` instead of `window.matchMedia`.
- **Container queries and `sizes` attributes** use `theme.breakpoints.values.*` in pixels.
- **Widths.** Tokens that were used as content widths, not breakpoints, are now fixed pixel values, so content doesn't widen: `max-width: 576px`, `768px` and `992px`.
- **Theme providers.** The test utils and the Storybook decorator pass the MUI theme to Emotion's `ThemeProvider`, so styled components can see `theme.breakpoints`. The app itself only uses MUI's provider.

**Bootstrap follows MUI too.** reactstrap's `Navbar expand="md"`, the `d-md-*` classes and `Col md=…` switch at Bootstrap's breakpoints. Left alone, the nav showed its desktop and mobile parts at once when the two sets of breakpoints differed. `kausal_common/src/themes/styles/_theme-variables.scss` now sets:

- **`$grid-breakpoints`:** the theme's values (600 / 768 / 1200 / 1536px at the time; see [Breakpoints](#breakpoints) for the current ones).
- **`$container-max-widths`:** 840px from md, 1140px from lg, 1320px from xl, later replaced by MUI's containers. Containers are full width below 768px.

paths-ui imports the same `main.scss`, so its Bootstrap breakpoints move too.

Results against the `main` baseline, after `md` went back to 768px:

- **390px:** unchanged.
- **820px:** same layouts as before. Only the container differs: full width, where it was 720px.
- **1100 and 1440px:** changed. 1100px is now below `lg`, and 1440px gets the 1140px container, where it had 1320px from 1400px up.

### 2. Simple one-to-one swaps

Status: done on `feat/bye-reactstrap`. 25 files changed, and files importing reactstrap went from 124 to 112.

- **`Spinner` → `CircularProgress`:** `color="inherit"`, because Bootstrap spinners took the text colour. `1rem` for `size="sm"`, `2rem` otherwise.
- **`Progress` → `LinearProgress`** with `variant="determinate"`.
- **`Alert` → MUI `Alert`:** `primary` → `info`, `danger` → `error`, `warning` → `warning`. MUI shows an icon, and Bootstrap's 1rem bottom margin is gone. Dismissible alerts render only while open, with `onClose` and `closeText`.
- **`Tooltip` / `UncontrolledTooltip` → MUI `Tooltip`**, wrapping the trigger instead of pointing at it by id:
  - short text tooltips use the themed `@/components/common/Tooltip`;
  - the action card's dependency popover keeps its white card style.
  - Where the tooltip describes an element that has its own name, `describeChild` sets `aria-describedby`.
- **`Badge` → `@/components/common/Badge`,** a styled `span` using the theme's badge tokens, not MUI `Chip`. `Chip` has a fixed height and doesn't wrap long action names.
  - reactstrap's `Badge` added Bootstrap's `bg-secondary`. That class's `!important` background overrode the components' own colours, with the default theme's colour on every plan.
  - Two badges now show the colours their styles always asked for: the completed-action check is green, and related-action badges use the plan's `brandLight`.
- **`CloseButton` → `IconButton` with `Icon.Times`.**
- **`ListGroup` → styled `ul`/`li`** matching Bootstrap's list-group borders.
- **`Media` → plain `div`s.** Bootstrap 5 has no `.media` styles, so the layout is unchanged.
- **`AttentionBannerBlock` deleted.** Nothing imported it.

Results against the step 1 screenshots: 60 of 72 unchanged. The 12 that changed are the two badges above.

### 3. Buttons and collapses

**Buttons: done.** 27 files changed. No reactstrap `Button`, `ButtonGroup` or `ButtonToggle` is left, and files importing reactstrap went from 112 to 107.

- **The shared `@/components/common/Button`** renders MUI's `Button` in the plan theme's colours. Its API follows MUI:
  - `variant`: `contained` (the default), `outlined`, `link` (a text button styled as a link) or `text` (a plain button in the surrounding text colour);
  - `color`: `primary` (the default), `secondary`, `light`, `dark` or `black`;
  - MUI's `size` and `fullWidth`.
- **Conversions at call sites:**
  - `outline` → `variant="outlined"`;
  - `color="link"` → `variant="link"`;
  - reactstrap's undefined `btn-outline-link` (as in `color="link" outline`) → `variant="text"`, because it rendered as a plain button;
  - `size="sm"` → `size="small"`, and `block` → `fullWidth`;
  - `active` in the radio-style groups → `variant={active ? 'contained' : 'outlined'}` inside MUI's `ButtonGroup`, keeping their radio roles and keyboard handling.
- **Look kept the same:**
  - Bootstrap's `inline-block` layout keeps the space between a button's text and its icon (MUI's `inline-flex` drops it).
  - Bootstrap's line height, and 0.75rem for small buttons.
  - Buttons that used reactstrap directly keep Bootstrap's normal font weight and small padding. The shared wrapper makes buttons bold, with the theme's padding.
- **Unchanged screenshots:** all 72 match the pre-button reference, within the 200-pixel tolerance.
- **Not covered by the screenshots:** hover, focus and disabled states, and pages outside the capture set (pledges, the dashboard table, the paths toolbar, the admin page). Check these by hand.

**Collapses: done.** 13 files changed. Files importing reactstrap went from 107 to 100. `Collapse` is left only in `GlobalNav`, `NavBar` and the Zürich `GlobalNav`, for step 6.

- **`Collapse` → MUI `Collapse`:** `isOpen` becomes `in`, and `id`, `role` and ARIA props pass through to MUI's root element.
  - MUI hides a closed panel with zero height and `visibility: hidden`, where Bootstrap used `display: none`. So the Accordion's print styles now also force `visibility: visible`.
- **`UncontrolledCollapse` in the paths toolbar:** each section keeps its open state in `useState(true)`, like `defaultOpen`. Its header button gets `onClick`, `aria-expanded` and `aria-controls`.
- **`Accordion.test.tsx`:** it checked for Bootstrap's `collapse` class. It now checks only the region's `hidden` attribute.
- **`report-comparison.spec.ts`:** it waits for `.MuiCollapse-entered` instead of `.collapse.show`. It's untested, because none of the screenshot plans has a report comparison block.
- **Screenshots:** unchanged.
- **Browser check:** the GraphAsTable, TaskList and ContactPerson toggles open and close correctly.
- **Toggle accessibility:** every collapse toggle now has `aria-expanded`, plus `aria-controls` pointing at its panel's `useId()` id. Before, only ContactPerson and the paths toolbar had them.

### 4. Cards and tables

Status: done on `feat/bye-reactstrap`. 17 call sites plus two new shared modules; files importing reactstrap went from 100 to 89.

- **Cards → `@/components/common/CardParts`:**
  - `Card` is MUI's `Card`, laid out like Bootstrap's card: a flex column that doesn't clip its content, with Bootstrap's border, radius and white background.
  - `CardBody`, `CardTitle` (`tag` becomes `as`), `CardFooter` and `CardImgOverlay` are styled `div`s with Bootstrap's padding and borders.
  - `CardBody` isn't MUI's `CardContent`. `CardContent` adds 24px of bottom padding to the last element, and overriding that also overrode the padding parents set through `.card-body`, which made cards taller.
  - **Class names kept as styling hooks:** all parts keep Bootstrap's class names (`card`, `card-body`, `card-title`, `card-footer`, `card-img-overlay`). About ten parent components style child cards through them. Rename them when Bootstrap's CSS is removed.
- **Tables → `@/components/common/Table`:** a plain `<table>` with the classes reactstrap produced (`table`, `table-hover`, `table-bordered`, `table-sm`, and a `table-responsive` wrapper), so Bootstrap still styles it.
  - Moving to MUI's table components would mean rewriting every row and cell in six tables, two of them with sticky-column styles, and changing their look. Do that together with the Bootstrap CSS removal.
- **`IndicatorCard`:** its `disabled` prop, which only drives the grey background, is now a transient `$disabled` prop.
- **Screenshots:** unchanged against the pre-step-4 branch state. Espoo's action list varies between loads by itself, both at 390px and 820px.

### 5. Forms

Status: done on `feat/bye-reactstrap`. Files importing reactstrap went from 89 to 80.

**`@/components/common/FormControls`** puts reactstrap's form API (`FormGroup check|switch`, `Label check`, `Input type=…`, `FormFeedback tooltip`, `InputGroup`, `Form`) on MUI with Bootstrap's look. The six wrappers (`TextInput`, `SelectInput`, `CheckboxInput`, `DropDown`, `SelectDropdown`, `Switch`) and the non-paths direct users only changed their import.

- **Groups and labels:** `FormGroup` is MUI's `FormControl`, and `Label` is `FormLabel`.
- **Text, textarea and select:** MUI's `InputBase` with the native element as `slots.input`, so MUI's input styles don't apply and the caller's styles merge after the base ones.
  - Don't use Emotion's `ClassNames`/`cx` for this. Re-merging on each render piled the styles up into invalid CSS.
- **Checkbox and switch:** MUI's `Checkbox` with icons drawn like Bootstrap's. The icon keeps `form-check-input`, and adds `checked` when checked, since `:checked` can't match the icon.
- **`FormFeedback`:** MUI's `FormHelperText`.
- **Values:** Bootstrap's compiled values, which are the same for every plan (for example the checked colour `rgb(16, 114, 81)`). Base styles stay single-class, so callers' styles still override them. Bootstrap's class names stay as hooks.
- **Visible change: form error messages now show.** Before, this build had no Bootstrap validation styles, so `.invalid-feedback` was always hidden, and only `CheckboxInput`'s error, which forced `d-block`, was visible. `invalid` inputs also get Bootstrap's red border.

**Paths-derived components follow paths-ui**, not the Bootstrap look:

- **`NormalizationWidget`** uses paths-ui's setup: `FormControlLabel` with a small `Switch` and a caption label, plus a small `CircularProgress` while loading.
- **`paths/toolbar/GlobalParameters`** was deleted. Nothing imported it.

**Checks:**

- **Screenshots:** unchanged against the pre-step-5 branch state. Espoo's action list varies between loads by itself.
- **In a browser:** the switch toggles from both the control and its label, with Bootstrap's checked look, and the feedback form's text field and textarea render and accept typing.

### 6. Dropdowns and navigation

Status: done on `feat/bye-reactstrap`. Files importing reactstrap went from 80 to 70, and no dropdown, nav or collapse parts are left.

- **`@/components/common/Dropdowns`:** reactstrap's `UncontrolledDropdown`, `UncontrolledButtonDropdown`, `DropdownToggle`, `DropdownMenu` and `DropdownItem`, with reactstrap's markup and keyboard handling.
  - **MUI parts:** `ClickAwayListener` closes the menu on an outside click. `Popper` positions menus outside a navbar, rendering into `document.body` with `container="body"`.
  - **Markup kept:** `dropdown`, `show`, `dropdown-toggle`, `dropdown-menu` with `data-bs-popper="static"`, and `dropdown-item`. `GlobalNav` and others style through these classes.
  - **No MUI `Menu`:** it's modal (portal, scroll lock, focus trap), unlike Bootstrap's dropdowns, and its portal would break the parents' `.dropdown-menu` styles.
  - **Always render `ClickAwayListener`.** Wrapping the root only while open remounted the dropdown on every toggle and lost focus.
- **`@/components/common/NavParts`:** `Navbar`, `Nav`, `NavItem` and `NavbarCollapse`, with reactstrap's markup.
  - `NavbarCollapse` is MUI's `Collapse` for the mobile menu. From `md` up it's forced open, and MUI's wrappers become `display: contents` so the navs stay direct flex items of `.navbar-collapse`.
  - No `!important`: MUI sets the closed state through class styles, so callers such as the Zürich nav can still set their own height.
- **Paths-derived components follow paths-ui:**
  - **`OutcomeNodeContent`:** the reactstrap tab strip is replaced by paths-ui's `NodeViewSelector` (an MUI `Select` with view icons), ported to `paths/outcome/NodeViewSelector.tsx` without paths-ui's node-page option. **Visible change** on outcome blocks, such as Zürich's home page.
  - **`DataTable`:** the download dropdown uses paths-ui's `ToolsMenu` setup (MUI `Menu`, `ListSubheader`, `MenuItem` with file-type icons). The trigger keeps watch-ui's labelled "Download data" button.
  - **Zürich `GlobalNav`:** uses `NavParts`. paths-ui still uses reactstrap there.
- **Deleted:** `common/NavBar.tsx`. Nothing imported it.
- **Checks:**
  - **Screenshots:** unchanged against the pre-step branch state, apart from the Zürich view selector.
  - **In a browser, compared with the committed reactstrap code:** the nav and plan-selector dropdowns (click, Escape, arrow keys, outside click) and the watch-ui and Zürich mobile menus behave the same. The open menus are pixel-identical.
  - **One difference:** the plan selector's menu now opens below its toggle. reactstrap's Popper placed it over the toggle.

### 7. Layout grid

Status: done on `feat/bye-reactstrap`. All 70 remaining files changed only their import, and no code imports reactstrap any more.

- **No codemod.** Column sizes are often computed (`md={{ size: single ? 8 : 6, offset: … }}`) or spread in from props (`{...columnProps}`), which a codemod can't rewrite reliably.
- **`@/components/common/layout/LayoutGrid`** has reactstrap's `Container`, `Row` and `Col` API (plus the `ColProps` and `ColumnProps` types) on MUI. It translates reactstrap's breakpoint props into MUI `Grid`'s `size` and `offset` at runtime:
  - `6` or `'6'` becomes a size, `'auto'` becomes `auto`, `true` becomes `grow`, and `{ size, offset, order }` becomes size, offset and order;
  - a `Col` with no breakpoint props becomes `size="grow"`, like Bootstrap's `.col`.
- **Look:** Bootstrap's grid model is kept.
  - MUI `Grid` with no spacing computes the widths and offsets, which are the same percentages as Bootstrap's at the same breakpoints.
  - `Row` keeps the `row` class and `Container` keeps `container` / `container-fluid` / `container-lg`. So Bootstrap's CSS still supplies the container widths and gutters, the row's negative margins, the column padding, full width for columns without an `xs` size, and the `gy-*` gutters.
  - MUI's `Grid` and `Container` (with `maxWidth={false}` and `disableGutters`) set none of these, so nothing conflicts. When Bootstrap's CSS is removed, move those rules into `LayoutGrid`.
- **`GridRow` deleted.** The Phase 0 gap-based row was never used, and it would have rendered columns with overridden padding or backgrounds differently.
- **Checks:**
  - **Screenshots:** unchanged against the pre-step branch state. Espoo's action list varies between loads by itself.
  - **Other pages:** the organisation and search pages match the committed reactstrap code at 390px and 1100px, apart from minor text rendering noise on search.

### 8. Cleanup

Status: done on `feat/bye-reactstrap`.

- **Dependencies:** `reactstrap` is removed from `package.json` and the lockfile, and `pnpm dedupe` has been run.
  - `@popperjs/core` stays: `react-popper` (used by `NavbarSearch`) needs it as a peer, and MUI and `react-bootstrap-typeahead` depend on it too.
  - `bootstrap` stays, because its SCSS is still loaded.
- **Lint:** the `no-reactstrap` rule in `eslint.config.ts` is now an `error`, so reactstrap can't come back unnoticed.
- **Bootstrap SCSS stays as it is.**
  - `kausal_common/src/themes/styles/main.scss` is shared with paths-ui.
  - Every partial it imports still matches classes in one app or the other, or in a library: `btn-close` is used by react-bootstrap-typeahead's clear button.
  - Pruning belongs to the deferred Bootstrap CSS removal.
- **Checks:**
  - `pnpm typecheck` is clean.
  - `pnpm exec eslint src kausal_common/src` has no errors. The 10 warnings were already there (`no-deprecated`, `graphql/no-deprecated`, one unused test variable).
  - `pnpm test` passes (396 tests).
  - The Storybook build succeeds.
  - **e2e, `basic.spec.ts` in Chromium against the dev server with one worker, for the three test plans:** 24 passed and 8 skipped for plan data. The one failure is Zurich's `search`. Zurich turns search off (`plan.features.enableSearch`) and the test doesn't skip for that, so it fails on `main` too. With parallel workers, the dev server compiles pages too slowly and the tests time out.

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
