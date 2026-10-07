import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

/**
 * An inline label styled like Bootstrap's `.badge`, using the theme's badge
 * tokens. Style colours at the call site. Set `$pill` for fully rounded ends.
 */
const Badge = styled('span', transientOptions)<{ $pill?: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.badgePaddingY} ${theme.badgePaddingX}`};
  font-size: 0.75em;
  font-weight: ${({ theme }) => theme.badgeFontWeight};
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: ${({ theme, $pill }) => ($pill ? '50rem' : theme.badgeBorderRadius)};
`;

export default Badge;
