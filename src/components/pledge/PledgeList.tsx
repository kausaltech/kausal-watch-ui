'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, ButtonGroup, Container } from 'reactstrap';
import styled from 'styled-components';

import type { GetPledgesQuery } from '@/common/__generated__/graphql';

import PledgeCard from './PledgeCard';

type Pledge = NonNullable<NonNullable<NonNullable<GetPledgesQuery['plan']>['pledges']>[number]>;

type Props = {
  pledges: Pledge[];
};

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spaces.s200};
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledRadioButton = styled(Button)`
  &.btn:focus-visible:not(.active) {
    color: var(--bs-btn-color);
    background-color: var(--bs-btn-bg);
  }
`;

const StyledTabsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s200};

  @media (max-width: ${(props) => props.theme.breakpointSm}) {
    text-align: center;
  }
`;

const StyledPledgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spaces.s200};
`;

type ViewType = 'ALL' | 'MY_PLEDGES';

function PledgeList({ pledges }: Props) {
  const [view, setView] = useState<ViewType>('ALL');
  // TODO: Replace with actual user commitment state from API/auth
  const [committedSlugs, setCommittedSlugs] = useState<Set<string>>(new Set());

  const t = useTranslations();

  const handleCommittedChange = (slug: string, committed: boolean) => {
    setCommittedSlugs((prev) => {
      const next = new Set(prev);

      if (committed) {
        next.add(slug);
      } else {
        next.delete(slug);
      }

      return next;
    });
  };

  const filteredPledges =
    view === 'MY_PLEDGES' ? pledges.filter((pledge) => committedSlugs.has(pledge.slug)) : pledges;

  /**
   * Arrow keys toggle between options per WAI-ARIA radio group pattern.
   * With only two options, the wrapping behaviour of start/end options
   * means any arrow key switches to the other option.
   * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
   */
  function handleRadiosKeyDown(e: React.KeyboardEvent) {
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowDown'
    ) {
      e.preventDefault();

      if (view === 'ALL') {
        setView('MY_PLEDGES');
      } else {
        setView('ALL');
      }
    }
  }

  return (
    <StyledContainer>
      <StyledTabsContainer>
        <ButtonGroup
          size="small"
          role="radiogroup"
          aria-label={t('pledge-list-view-toggle')}
          onKeyDown={handleRadiosKeyDown}
        >
          <StyledRadioButton
            color="black"
            size="small"
            outline
            onClick={() => setView('ALL')}
            active={view === 'ALL'}
            aria-checked={view === 'ALL'}
            role="radio"
            tabIndex={view === 'ALL' ? 0 : -1}
          >
            {t('pledge-list-all')}
          </StyledRadioButton>
          <StyledRadioButton
            color="black"
            size="small"
            outline
            onClick={() => setView('MY_PLEDGES')}
            active={view === 'MY_PLEDGES'}
            aria-checked={view === 'MY_PLEDGES'}
            role="radio"
            tabIndex={view === 'MY_PLEDGES' ? 0 : -1}
          >
            {t('pledge-list-mine')}
          </StyledRadioButton>
        </ButtonGroup>
      </StyledTabsContainer>

      <StyledPledgeGrid>
        {filteredPledges.map((pledge) => (
          <PledgeCard
            key={pledge.slug}
            title={pledge.name}
            description={pledge.description}
            slug={pledge.slug}
            image={pledge.image?.large?.src ?? pledge.image?.full?.src}
            imageAlt={pledge.image?.altText ?? pledge.name}
            isCommitted={committedSlugs.has(pledge.slug)}
            onCommittedChange={(committed) => handleCommittedChange(pledge.slug, committed)}
          />
        ))}
      </StyledPledgeGrid>

      {view === 'MY_PLEDGES' && filteredPledges.length === 0 && <p>{t('pledge-no-commitments')}</p>}
    </StyledContainer>
  );
}

export default PledgeList;
