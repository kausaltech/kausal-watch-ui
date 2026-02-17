import React from 'react';

import styled from '@emotion/styled';
import { UncontrolledTooltip } from 'reactstrap';

import { MAX_CRUMB_LENGTH } from '@/common/categories';
import { Link } from '@/common/links';

export type TCrumb = {
  name: string;
  id: string;
  url?: string;
};

type Props = {
  breadcrumbs: TCrumb[];
};

const StyledContainer = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  margin-bottom: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

function Crumb({ crumb, sibling }: { crumb: TCrumb; sibling?: boolean }) {
  const id = `crumb-${crumb.id}`;
  const ariaId = `tt-content-${crumb.id}`;
  const isTruncated = crumb.name.length > MAX_CRUMB_LENGTH;
  const name = isTruncated ? `${crumb.name.slice(0, MAX_CRUMB_LENGTH).trim()}...` : crumb.name;

  const isSeparator = crumb.name === '';
  if (isSeparator) {
    return (
      <>
        &nbsp;/
        <br />
      </>
    );
  }
  return (
    <>
      <span id={id} aria-describedby={isTruncated ? ariaId : undefined}>
        {crumb.url ? (
          <Link href={crumb.url} passHref>
            {name}
          </Link>
        ) : (
          name
        )}
        {!sibling && <>&nbsp;/ </>}
      </span>

      {isTruncated && (
        <UncontrolledTooltip
          target={id}
          id={ariaId}
          placement="top"
          role="tooltip"
          trigger="focus hover"
        >
          {crumb.name}
        </UncontrolledTooltip>
      )}
    </>
  );
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: TCrumb[] | null | undefined }) {
  // Try to handle duplicate breadcrumbs due to multiselect categories
  // this might not work for all cases
  if (!breadcrumbs) return null;
  const uniqueBreadcrumbs = breadcrumbs.reduce((acc, current) => {
    const index = acc.findIndex((item) => item.id === current.id);
    if (index >= 0) {
      acc.push({ id: `${current.id}-separator`, name: '' });
      acc.push(current);
    } else {
      // Keep the first instance
      acc.push(current);
    }
    return acc;
  }, [] as TCrumb[]);

  return (
    <StyledContainer>
      {uniqueBreadcrumbs.map((crumb, index) => (
        <Crumb key={crumb.id} crumb={crumb} sibling={uniqueBreadcrumbs[index + 1]?.name === ''} />
      ))}
    </StyledContainer>
  );
}
