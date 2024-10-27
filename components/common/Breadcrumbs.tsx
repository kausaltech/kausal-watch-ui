import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

import { Link } from '@/common/links';
import { MAX_CRUMB_LENGTH } from '@/common/categories';

type TCrumb = {
  name: string;
  id: string;
  url?: string;
};

type Props = {
  breadcrumbs: TCrumb[];
};

const StyledContainer = styled.div`
  font-size: ${(props) => props.theme.fontSizeBase};
  margin-bottom: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeMd};
  }
`;

function Crumb({ crumb }: { crumb: TCrumb }) {
  const id = `crumb-${crumb.id}`;
  const ariaId = `tt-content-${crumb.id}`;
  const isTruncated = crumb.name.length > MAX_CRUMB_LENGTH;
  const name = isTruncated
    ? `${crumb.name.slice(0, MAX_CRUMB_LENGTH).trim()}...`
    : crumb.name;

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
        &nbsp;/{' '}
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

export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <StyledContainer>
      {breadcrumbs.map((crumb) => (
        <Crumb key={crumb.id} crumb={crumb} />
      ))}
    </StyledContainer>
  );
}
