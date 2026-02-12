'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, ButtonGroup, Container } from 'reactstrap';
import styled from 'styled-components';

import type { GetPledgesQuery } from '@/common/__generated__/graphql';
import Icon from '@/components/common/Icon';
import { getDefaultFormFields } from '@/utils/pledge.utils';

import ConfirmPledge from './ConfirmPledge';
import PledgeCard from './PledgeCard';
import { usePledgeUser } from './use-pledge-user';

type Pledge = NonNullable<NonNullable<NonNullable<GetPledgesQuery['plan']>['pledges']>[number]>;

type Props = {
  pledges: Pledge[];
};

/**
 * Wrapper to allow child sections to stretch outside of the parent containers gutters
 * with ::before pseudo elements.
 */
const StyledPageWrapper = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spaces.s200};
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
  align-items: stretch;
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spaces.s300} ${({ theme }) => theme.spaces.s200};
  background: ${({ theme }) => theme.graphColors.grey010};
  position: relative;

  // Stretch the background outside of the parent container gutters... it looks better
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background: ${({ theme }) => theme.graphColors.grey010};
    width: 100vw;
    z-index: -1;
  }
`;

const StyledEmptyIconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s200};
  color: ${({ theme }) => theme.brandDark};
`;

const StyledEmptyHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spaces.s100};
  max-width: 500px;
`;

const StyledEmptySubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledEmptyCardWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledBrowseAllButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.linkColor};
  }
`;

type ViewType = 'ALL' | 'MY_PLEDGES';

function PledgeList({ pledges }: Props) {
  const [view, setView] = useState<ViewType>('ALL');
  const [showConfirmDrawer, setShowConfirmDrawer] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);

  const t = useTranslations();
  const {
    userData,
    committedSlugs,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
  } = usePledgeUser();

  const handleCommitClick = (pledge: Pledge, isCurrentlyCommitted: boolean) => {
    if (isCurrentlyCommitted) {
      uncommitFromPledge(pledge.id);
    } else {
      setSelectedPledge(pledge);
      setShowConfirmDrawer(true);
    }
  };

  const handleConfirmPledge = async (formData: Record<string, string>) => {
    if (selectedPledge) {
      await commitToPledge(selectedPledge.id, formData);
    }
  };

  const handleCloseDrawer = () => {
    setShowConfirmDrawer(false);
    setSelectedPledge(null);
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
    <StyledPageWrapper>
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

        {filteredPledges.length > 0 && (
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
                committedCount={pledge.commitmentCount + getCommitmentCountAdjustment(pledge.slug)}
                onCommitClick={(isCommitted) => handleCommitClick(pledge, isCommitted)}
              />
            ))}
          </StyledPledgeGrid>
        )}

        {view === 'MY_PLEDGES' && filteredPledges.length === 0 && pledges.length > 0 && (
          <StyledEmptyState>
            <StyledEmptyIconWrapper>
              <Icon name="globe" width="48px" height="48px" />
            </StyledEmptyIconWrapper>
            <StyledEmptyHeading>{t('pledge-empty-heading')}</StyledEmptyHeading>
            <StyledEmptySubtext>{t('pledge-empty-subtext')}</StyledEmptySubtext>
            <StyledEmptyCardWrapper>
              <PledgeCard
                layout="mini"
                title={pledges[0].name}
                slug={pledges[0].slug}
                image={pledges[0].image?.large?.src ?? pledges[0].image?.full?.src}
                imageAlt={pledges[0].image?.altText ?? pledges[0].name}
                committedCount={
                  pledges[0].commitmentCount + getCommitmentCountAdjustment(pledges[0].slug)
                }
                isCommitted={false}
                onCommitClick={() => handleCommitClick(pledges[0], false)}
              />
            </StyledEmptyCardWrapper>
            <StyledBrowseAllButton onClick={() => setView('ALL')}>
              {t('pledge-empty-browse-all')}
            </StyledBrowseAllButton>
          </StyledEmptyState>
        )}

        {selectedPledge && (
          <ConfirmPledge
            isOpen={showConfirmDrawer}
            onClose={handleCloseDrawer}
            onConfirm={handleConfirmPledge}
            pledgeName={selectedPledge.name}
            pledgeSlug={selectedPledge.slug}
            pledgeImage={selectedPledge.image?.rendition?.src ?? null}
            commitmentCount={selectedPledge.commitmentCount}
            formFields={getDefaultFormFields(t)}
            userData={userData}
          />
        )}
      </StyledContainer>
    </StyledPageWrapper>
  );
}

export default PledgeList;
