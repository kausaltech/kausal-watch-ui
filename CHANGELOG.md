# Changelog
All notable changes to this project will be documented in this file.
Does not adhere to version numbering.

## [Unreleased]

### Added
- Unit testing with Jest
- Theme json editing on Storybook
### Fixed
- Replace momentjs with dayjs
- Generalise ActionListFilters component
- Make favicons great again
### Removed
- SASS based theme files
## [unversioned] - 2020-12-18
### Added
- Action implementation phases
- Plan status dashboard proper release
- Add new theme variables to accomodate non-accessible brand colors: 
  - `badgeBackground`, `badgeColor` for category and organization badges.
  - `brandNavBackground`, `brandNavColor` customize global nav top bar colors.
  - `grey010`..`grey090` in `graphColors` to accommodate grey color ranges

### Fixed
- Global Nav (mobile): Do not wrap toggle on new line when plan name is long.
- Fix forwardRef dev warnings on Button and Popover components.
- Hide impact filter on ActionList view if plan has no impact categories.
- Improve status dashboard wrapping and spacing.
- Storybook runs again

## [unversioned] - 2020-10-29
### Added
- Create feedback form
