# Fixing the BITV audit findings

Status: steps 1 and 2 done on `fix/a11y`, step 3 apart from the theme colour pairs (item 6); step 2 also changes kausal_common. This doc translates the findings of a manual BITV accessibility audit of a customer's plan site, names their causes in the code, and orders the fixes.

## Background

The audit was done by hand against BITV 2.0, which refers to EN 301 549. Its reference numbers read as follows:

- `9.x.y.z`: WCAG success criterion `x.y.z` (EN 301 549 chapter 9, web content). For example, `9.1.4.11` is WCAG 1.4.11 Non-text Contrast.
- `11.7.1`: EN 301 549 11.7, user preferences: the site must honour the system's colour and contrast settings, such as Windows contrast themes.
- `12.2.3`: EN 301 549 12.2.3, support services: users need a way to reach the operator.
- `99.x`: BITV recommendations beyond conformance. They don't fail the audit.

Each finding below has an id (F1–F31) in the audit's order, its reference, an English translation of the auditor's text, and what causes it in the code. The German original is in the audit report. The causes were checked against the code on `fix/a11y`. Line numbers are left out because they move; each item names the file and the symbol.

A finding is fixed in one of three places:

- **code**: this repo or kausal_common;
- **theme**: `@kausal/themes`, the plan's colours and logo;
- **content**: the plan's admins, in the CMS.

The automated axe audit (`e2e-tests/tests/a11y-audit.spec.ts`) catches only F28 of these. The rest need someone to check them by hand, or to write a targeted e2e test.

## Findings

### User preferences (11.7.1)

**F1. Contrast mode: search.** "When contrast mode is on, the search can no longer be recognised."

Cause (code): in `NavbarSearch.tsx`, `TextInput` and `SearchButton` have `border: 0`, so their only boundaries are background colours, which forced-colors mode removes. Nothing in the repo uses a `forced-colors` media query. `TextInput` also sets `display: 'hidden'`, which is not valid CSS.

**F2. Contrast mode: logo.** "In Windows contrast mode the logo is no longer readable. Solution: don't use a logo with a transparent background, use one with a white background."

Cause (theme and code): `OrgLogo` in `GlobalNav.tsx` renders the theme's logo, which is transparent, with no backplate in forced-colors mode.

**F3. Contrast mode: selected list items.** "In contrast mode the selected list items cannot be recognised."

Cause (code): `SelectDropdown.tsx` marks selected and focused options only with a background colour (grey080 / grey010), which forced-colors mode removes.

### Support (12.2.3)

**F4. No contact for the platform.** "There is a feedback form, but no imprint (legal notice), no phone number and no contact person for the platform."

Cause (content): the footer links come from the plan's settings.

**F5. Contact details on organisation pages (suggestion).** "Actions are assigned to organisations. You can list an organisation's actions, e.g. on the page of a city's environmental protection office. It would also help to publish the office's contact details there, or link to its website, so people can ask about an action directly."

Cause (code): `GET_ORG_DETAILS` in `src/queries/get-organization.ts` fetches `url` but not `email`, although the schema has `Organization.email` and the action page shows it (`OrganizationChip`). `OrgContent.tsx` shows only the website, with the raw URL as its link text. `contactPersonCount` is fetched but not used. The org logo `<img>` has no `alt`.

### Text alternatives (9.1.1.1)

**F6. "Bild" as the label of decorative tile images.** "The home page has tiles for the topic areas, each with a decorative image, so they don't need a text alternative. But they all have an aria-label with the word 'Bild' (image), which doesn't help. Either remove the aria-label and set `aria-hidden="true"` on the `<div>`, or write a proper description into the aria-label."

Cause (code, already fixed): `Card.tsx` used a background `<div role="img" aria-label={altText || t('image-credit')}>`, and `image-credit` is "Bild". Commit dcceeed1 replaced it with `<img alt={altText ?? ''}>`, and it is in production, so the audit probably saw an older deploy. One leftover: `CategoryPageHeaderBlock.tsx` has a `<span className="sr-only" role="img" aria-label={altText}>` that repeats the `<img alt>` next to it.

### Info and relationships (9.1.3.1)

**F7. Responsible organisation: button inside a link.** "The 'Responsible organisation' is also a `<button>` inside a link element."

Cause (code): `OrganizationChip.tsx` wraps `BadgeTooltip` in `OrganizationLink`, and `BadgeTooltip` with `isLink` always renders a `WrapperButton`. The result is `<a><button>`. `CategoryTags.tsx` does the same.

**F8. Previous / next action: buttons inside links.** "The 'Previous action' / 'Next action' buttons are `<button>`s inside a link `<a>`. The HTML specification does not allow a `<button>` inside an `<a>`, and it causes accessibility problems: both are interactive controls and must not be nested. It can cause inconsistent behaviour with keyboards, screen readers and different browsers. Here the keyboard reaches each control twice. Use only an `<a>` for navigation; use a `<button>` for actions within the page."

Cause (code): `ActionPager.tsx` renders `<ActionLink><PageButton>`.

### Non-text contrast (9.1.4.11)

**F9. Active option in select lists.** "The contrast of the active item in the search's select lists is too low. Use a stronger contrast or an additional high-contrast marker (underline, border, icon or similar)."

Cause (code): `SelectDropdown.tsx` marks the keyboard-focused option with only a grey010 background behind black text. The selects are the action list filters (`ActionListFilters.tsx`); the search page has none.

**F10. Blue bar on red.** "The contrast of the blue bar against the red background is too low."

Likely cause (code and theme): `ActionStatus.tsx` draws a `LinearProgress` whose track is the status colour (red for late actions) and whose bar is `graphColors.green090`. Confirm on the audited page.

**F11. Button against its background.** "The button's contrast with its background is too low for it to be seen as an active control. Add, for example, a high-contrast border."

Cause: not located; the audit report needs to say which button. Candidates: the `outlined` variant in `Button.tsx`, whose colours aren't checked against their background, and the filter submit button in `ActionListFilters.tsx`.

**F12. Green crosses in a chart.** "The contrast of the green crosses in the chart is too low."

Likely cause (theme): the goal markers in indicator charts. Their symbol is the theme's `goalSymbol`, and their colour is the theme's goal colour. Confirm on the audited page.

**F13. Status donut colours.** "The contrasts orange / white (in progress), grey / white (not started) and light green / white (less than 3 months) are too low. You can mostly guess the value when the neighbouring colours have enough contrast. But in the 'actions by phase' chart, where white and grey are next to each other, you can't tell them apart. The white separator lines are good!"

Cause (code and theme): `StatusDonut.tsx`, used by `ActionStatusGraphs.tsx`. Progress colours come from the backend status colours through `getStatusData` (`src/common/preprocess.ts`). Phase colours come from `getPhaseData`, which uses grey000 (white) for inactive actions, grey010 for no phase and grey020 for not started.

**F14. Line charts told apart only by colour.** "The three lines don't have enough contrast with each other. People with colour vision deficiency can't tell which line belongs to which organisation. Use different markers for the yearly data points too, e.g. a circle for the first organisation, a square for the second and a triangle for the third."

Cause (code): `buildSeriesFromTraces` (`indicator-graph.utils.ts`) and `DashboardIndicatorLineChartBlock.tsx` pick each series' marker with `categorySymbol`. Unless the theme sets `categorySymbols`, it falls back to `DEFAULT_CATEGORY_SYMBOLS = ['circle']` (`chart-symbols.ts`), and every line is solid.

**F15. Stacked charts.** "The stacked charts' contrasts are too low too, both against the white background and against each other. Use, e.g., separator lines and hatching between the stacks, and order the legend to match, so it's clear which value is on top and which below."

Cause (code): `DashboardIndicatorBarChartBlock.tsx` (`stack: 'total'`) and `DashboardIndicatorAreaChartBlock.tsx` (`stack: 'categories'`) set no border between stacks. `BarChart.tsx` renders adjacent segments with no gap. The legend order is not tied to the stack order.

### Text contrast (9.1.4.3)

**F16. Close button.** "The contrast of the close button is too low."

Likely cause (code): the remove button on the active filter badges, `.badge-close { opacity: 0.5 }` in `ActionListFilters.tsx`. Confirm on the audited page.

**F17. Black text on blue.** "The contrast of black text on blue is too low."

Cause (theme): not located; the audit report needs to say where. It is a theme colour pair.

**F18. Previous / next action focus.** "When the 'Next action' / 'Previous action' buttons get keyboard focus, they are barely readable. Use the same colours as on mouse hover."

Cause (code): see F8. The `<a>` gets the global `:focus-visible` outline (`ThemedGlobalStyles.tsx`), and the inner button gets MUI's `.Mui-focusVisible` box-shadow in `inputBtnFocusColor` (`kausal_common/src/themes/mui-theme/components.ts`). Hover only tints the background (`Button.tsx`).

### Keyboard (9.2.1.1)

**F19. Selected options can't be cleared with the keyboard.** "In the search, an option once chosen cannot be removed with the keyboard. With a mouse you can click the x."

Cause (code): `SelectDropdown.tsx` uses react-select's clear indicator, which is mouse-only. Its custom `MultiValue` renders `SingleValue`, so the per-value remove controls never render. Backspace in the empty input works, but nobody knows about it.

**F20. Topic menu can't be activated with Enter.** "When zoomed in, the topic areas can't be activated with the keyboard. You can move between them with the arrow keys (as described), but Enter doesn't select. With a screen reader on a mobile device they can't be selected either. The cause is that links `<a>` are embedded in `<button>`s, which is not allowed. The topic links are repeated in the footer, but that is very far down, especially on action pages with many actions."

Cause (code): `DropdownList` in `GlobalNav.tsx` renders `DropdownItem` (a `<button role="menuitem">`, `Dropdowns.tsx`) around `NavLink` (a div) around `NavigationLink` (an `<a>`). The dropdown's key handler prevents the default action of Enter and clicks the button, which doesn't follow the inner link. The toggle is an `<a href="#" role="button">`. `LanguageSelector.tsx` has the same pattern.

**F21. Popovers not reachable with the keyboard.** "With a keyboard, the popups with extra information can't be reached. The information is on the related subpage, though."

Cause (code): see F29. Tooltip content with a link, such as the one in `IndicatorValueSummary.tsx`, disappears before the keyboard reaches the link. Dashboard tooltips sit on `<td>`/`<th>` cells that can't take focus (`ActionTableRow.tsx`).

### Navigation (9.2.4.x)

**F22. Skip link target can't take focus (9.2.4.1).** "Skip links are links at the start of a page that jump to parts of it. Their target is the id of another element on the same page. Important: the target must be focusable! If the target isn't, the jump works in a browser, but with a screen reader the focus lands on the element briefly and then jumps back to where it was. Keyboard focus must move with the jump. Set `tabindex="-1"` on the target, e.g. `<a href="#main">Skip to content</a> … <main id="main" tabindex="-1">`."

Cause (code): `<main id="main">` in `(with-layout-elements)/layout.tsx` and in `AccessGate.tsx` has no `tabIndex={-1}`. The skip link is `SkipToContent.js`.

**F23. Two adjacent links to the same page (9.2.4.3).** "The header has two adjacent links that go to the same place. Combine them into one link."

Cause (code): `GlobalNav.tsx` renders two `HomeLink`s, one for the logo and one for the site title. The logo link goes to `theme.footerLogoLink || rootLink`, so the two only coincide when the theme sets no `footerLogoLink`. The logo's visually hidden label also wraps the text in literal "+" characters.

**F24. Link text (9.2.4.4).** "Use descriptive link text throughout. Avoid sentences like 'You can find more information here' with only 'here' linked. Write instead, e.g., 'Read more information about the event', and link 'information about the event'. In general, avoid linking single meaningless words like 'here', 'more' or 'next'."

Cause (content and code): the "here" links come from CMS rich text. The code has "Weiterlesen" (read more) links in `CategoryCardContent.tsx` and inside a tooltip in `IndicatorValueSummary.tsx`.

**F25. Menu button label (9.2.4.6).** "Additional note: sighted people may not realise that clicking the three lines opens a menu. It would also help people using voice control. There is enough room in the row, so we recommend also showing the word 'Menü' (Menu) next to it, for everyone, as some other sites do."

Cause (code): `NavbarToggler` in `GlobalNav.tsx` shows only an icon. Its aria-label is `nav-menu-open` / `nav-menu-close`.

### Target size (9.2.5.5)

**F26. Info buttons too small.** "The info buttons are too small to hit easily with a mouse, or with the grid in voice control."

Cause (code): `PopoverTip.tsx` (a 12×12 icon with no padding in compact mode, at `opacity: 0.75`) and `kausal_common/src/components/PopoverTip.tsx` (14×14). WCAG 2.5.5 is AAA, but 2.5.8 Target Size (Minimum, 24×24 px) is AA in WCAG 2.2.

### Parsing, name, role, value (9.4.1.x)

**F27. Buttons containing divs (9.4.1.1).** "`<button>` elements must not contain `<div>`s."

Cause (code): a button may only contain phrasing content. Offenders:

- `BadgeTooltip.tsx`: `IconBadge`, `IconImage` and `IconName`;
- `OrgContent.tsx`: the tabs contain `PlanChip`;
- `GlobalNav.tsx`: the menu items contain `NavLink` (see F20);
- `PlanSelector.tsx`: the toggle contains `PlanTitle`.

**F28. Tab ARIA (9.4.1.2).** "The ARIA attributes of the tab are used incorrectly. Probably a special case, because the system allows for several tabs and here only one tab is active?"

Cause (code): `OrgContent.tsx` puts `role="tablist"` on a `<ul class="nav">` and wraps each tab in an `<li>`. Every tab gets `id="list-tab"`, `tabIndex={0}` and `aria-controls="list-view"`, but no element has that id, and there is no `role="tabpanel"`. There is no arrow-key handling. The markup was copied from `dashboard/ActionList.tsx`, where `#list-view` exists. The axe audit flags this on every plan.

**F29. Popover hints as buttons (9.4.1.2).** "These hints are buttons. With a screen reader that is confusing, since a button always triggers an action. On focus you hear: 'Definition, button: Show actions for which the selected organisation is responsible. Press Enter to activate.' But of course nothing happens when you press Enter."

Cause (code): `PopoverTip.tsx` is a MUI `Tooltip` around an `InfoButton` with no `onClick`; the content shows only on hover and focus. The file has a "TODO: make this accessible". The kausal_common `PopoverTip` works the same way.

### Recommendations (99.x)

**F30. Image credits without images (99.7.3).** "The home page has two images included as background images, so they have no text alternative and are invisible to screen readers. But the photographer credit ("Bild: © …") is visible. It is confusing to perceive only the photographers but not the images. We recommend also hiding the credit from screen readers with `aria-hidden="true"`, or adding screen-reader-only text with an image description after the credit. The same applies to the header images of the topic areas."

Cause (code and content): the hero and header images are `<img alt={altText ?? ''}>` now (commit 511885a6 and others), not CSS backgrounds, but without alt text in the CMS they are still decorative. `ImageCredit.tsx` renders the credit in every case. It is used by `HeroFullImage`, `HeroSmallImage`, `HeroSideBySide`, `ContentPageHeaderBlock`, `CategoryPageHeaderBlock`, `ActionHero` and `RichText`.

**F31. aria-label on a span in a button (99.7.6).** "aria-label is set on a `<span>` inside a `<button>`. Here, though, it is a special case combined with a tooltip (which is also keyboard accessible!), and it works with a screen reader (so OK!)."

No action needed. While checking it: `OrganizationChip.tsx` builds that label wrongly. The Collaborator branch reuses the `responsible-party-main` string, and its `else` overwrites the label set for the primary organisation.

## Plan

The steps go from the clearest conformance failures in shared components, which help every plan, to theme and content work, which needs the plan's admins. The steps are independent; each can be its own PR.

### Step 1: invalid nesting and broken widgets

1. **Single links for the previous / next pager (F8, F18).** Render the MUI `Button` as the link itself (`component={ActionLink}` or `href`) so there is one `<a>` and one focus ring. Give `:focus-visible` the hover background plus the outline, so focus looks like hover with a ring.
2. **Single links for organisation and category badges (F7, F27, F31).** Let `BadgeTooltip` render the `<a>` itself when it is a link, instead of a button for the caller to wrap. Turn its inner `div`s into `span`s. Fix the `OrganizationChip` label branches.
3. **Navigation menus (F20, F27).** Make each `DropdownItem` the link itself (`<a role="menuitem">`) in `GlobalNav`'s `DropdownList` and in `LanguageSelector`, so Enter follows it. Let the key handler leave Enter alone on links. Make the toggles `<button>`s instead of `<a href="#" role="button">`. Test with zoom at 400 % and with VoiceOver on iOS.
4. **Organisation page tabs (F28, F27).** With one plan, render no tabs. With several, use proper tabs: unique ids, a `role="tabpanel"` around the content, and arrow-key navigation. Turn the `PlanChip` divs inside the tab into spans.

   Done with the existing tab look instead of MUI `Tabs`, which would have needed restyling: a `div` tablist with the tabs as direct children, only the selected tab in the tab order, and arrow keys, Home and End to move between tabs.

5. **Remaining buttons that contain divs (F27).** `PlanSelector`'s `PlanTitle`: use `span`s with `display: block` / `flex`.

   Also `ExpandableFeedbackFormBlock`, whose trigger button contained a `div` and an `h2`. The button is now inside the `h2`, so the heading's text includes the description.

6. **Skip link (F22).** Add `tabIndex={-1}` to both `<main id="main">`s, and hide the focus outline that `main` then gets on click.
7. **Header home links (F23).** When the logo and title link to the same page, render one `HomeLink` around both, with the site name as its text. Remove the "+" characters from the hidden label.

### Step 2: popovers and keyboard

1. **Toggletips instead of tooltips (F21, F26, F29).** Make `PopoverTip` (both copies) a toggletip: a button with `aria-expanded` that opens the content on click or Enter, closes it on Escape and on a second click, and keeps it open while focus is inside. Interactive content, such as the link in `IndicatorValueSummary`, then becomes reachable. Make the target at least 24×24 px, and drop the opacity.

   Done differently in two ways. Hovering and keyboard focus still show the tip, as before; pressing the button pins it and puts its content in a `role="status"` live region, so screen readers announce it. Escape, a second press or leaving the button closes it. Instead of making links inside tips reachable, the only tip with a link (the percentage-point explainer) lost its link: the text explains enough. The target is 24×24 px, with negative margins so lines don't grow.

2. **Clearing select values (F19).** Render react-select's `MultiValueRemove`, which can take focus, or put a clear button outside the select. Check that the visually hidden instructions mention Backspace.

   Done with react-select's own clear indicator, which is now a focusable `role="button"` named "Clear: <label>" that clears on Enter or Space and moves focus back to the input.

3. **Dashboard table tooltips (F21).** Make the cells that carry a tooltip focusable, or move the content into the row.

   Done by moving the content into the row: each cell's tooltip content is also in the cell as visually hidden text, unless the tooltip repeats the cell (`tooltipRepeatsCell` in `dashboard.constants.tsx`). Sighted keyboard users find the same details on the action page.

### Step 3: contrast and contrast modes

1. **Select options (F3, F9).** Mark the focused option with an outline or a left border at 3:1 or more. Mark the selected option with a check icon as well as the colour. Under `@media (forced-colors: active)`, use `Highlight` / `HighlightText`.
2. **Search in forced colors (F1).** Give the input and button a `1px solid transparent` border, which forced-colors mode turns visible. Replace `display: 'hidden'`.

   Done with a border on the open field in forced colors only, so the normal look doesn't change. The closed field stays focusable on purpose: tabbing into it opens the search. The real problem was the icons: their fill is set with `!important` in theme colours, which forced colors don't override. All icons in both nav bars now use `fill: currentColor` in forced colors.

3. **Logo in forced colors (F2).** Under `@media (forced-colors: active)`, give `OrgLogo` `forced-color-adjust: none` and a white backplate. Alternatively, the theme ships a logo with an opaque background, as the auditor suggests.

   Done with a backplate in the theme's nav background colour rather than white: logos are designed for that background, and a white plate would hide light logos.

4. **Close buttons (F16).** Drop `opacity: 0.5` from `.badge-close`. Check the close buttons in `Modal`, `IndicatorModalBase` and `ChangeHistory` against their backgrounds.
5. **Progress bar (F10).** In `ActionStatus`, use a neutral track and draw the bar in the status colour, or add a border. Confirm it is the bar the auditor meant first.

   Done by marking where the bar ends with a white line instead of changing the colours. Completion over 100 % also drew the bar shifted right, so it looked partly empty; the value is now clamped.

6. **Theme colour pairs (F11, F12, F17).** Ask the auditor for the locations of F11 and F17, then fix the colour pairs in the theme. Run a contrast check across all themes for the same pairs, not only the audited plan's.

   Open. Also done in this step: the plan switcher's `outline: inherit` hid its focus ring, and the organisation tabs' second line in `PlanChip` was below 4.5:1 on the sunnydale theme.

### Step 4: charts

1. **Status donuts (F13).** Keep the white separators. Change the phase palette so that no-phase, not-started and inactive differ from white and from each other by 3:1. Inactive must not be white on a white background. Check that the legend shows each segment's count as text, so the colours aren't the only source. The progress colours come from the backend status colours and the theme; check them together with the theme work in step 3.
2. **Distinct markers per series (F14).** Change `DEFAULT_CATEGORY_SYMBOLS` to a cycle of different shapes (circle, rect, triangle, diamond, …) and make sure the markers show. This changes every plan's charts, so review it with design. Optionally also vary `lineStyle.type`.
3. **Stacked charts (F15).** Give stacked bar and area series a white `borderColor` / `borderWidth` (for areas, a line between bands). Turn on ECharts decal patterns (`aria.decal.show`) as the hatching the auditor suggests, and order the legend to match the stack. Give `BarChart.tsx`'s segments a 1 px gap.

### Step 5: content and text

1. **Image credits (F30).** When an image has no alt text, hide `ImageCredit` from screen readers with `aria-hidden`. Ask the plan admins to add alt texts to the hero and topic header images, which also solves it.
2. **Leftover image label (F6).** Remove the `sr-only` `role="img"` span in `CategoryPageHeaderBlock`. Recheck the home tiles on the live site.
3. **Menu label (F25).** Show a visible "Menu" text next to the hamburger icon at the widths where the toggle shows, and reuse it as the accessible name.
4. **Organisation contact details (F5).** Fetch and show `email` on the organisation page. Use the organisation's name, not the raw URL, as the website link text. Add `alt` to the org logo. Check whether the backend has a phone number or address.
5. **Link texts (F24).** Give the "Weiterlesen" links in `CategoryCardContent` the card title as visually hidden text. Ask the plan admins to fix "hier" links in their content.
6. **Platform contact (F4).** Kausal and the plan admins decide where the imprint and the contact person go; the footer links are set in the plan's settings.

### Afterwards

- Rerun the axe audit (`A11Y_AUDIT=1`, see `e2e-tests/tests/a11y-audit.spec.ts`) on the audited plan and a few others; F28 should be gone.
- Add e2e checks for what axe can't see: the skip link moves focus, Enter in the topic menu navigates, and a popover opens with Enter.
- Retest by hand with NVDA or JAWS, VoiceOver, keyboard only, 400 % zoom and a Windows contrast theme.
