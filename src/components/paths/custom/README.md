# Custom components in Paths

In rare cases where we can't reach a city's UI needs with theming alone,
custom components can be added. To ensure these components are only included
in the client bundle when needed, custom components are referenced by theme name
and loaded dynamically.

### How it works

1. Add a component to be loaded dynamically in `src/components/custom/[theme-name]` e.g. `src/components/custom/sunnydale/GlobalNav`
2. Add the component to the `CUSTOM_COMPONENTS` map
3. Use the `useCustomComponents` hook wherever this custom component may be rendered
