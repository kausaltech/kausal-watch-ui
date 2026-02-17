import type { CreateStyledComponent, StyledOptions } from '@emotion/styled';

/**
 * Options for styled() calls wrapping custom React components.
 * Filters out transient props (prefixed with `$`) to prevent them
 * from being forwarded to the underlying DOM element.
 *
 * In styled-components, `$`-prefixed props are automatically filtered.
 * Emotion requires explicit `shouldForwardProp` for this behavior.
 *
 * Usage:
 *   styled(Link, transientOptions)<{ $active: boolean }>`...`
 */
export const transientOptions: StyledOptions = {
  shouldForwardProp: (prop: string) => !prop.startsWith('$'),
};
