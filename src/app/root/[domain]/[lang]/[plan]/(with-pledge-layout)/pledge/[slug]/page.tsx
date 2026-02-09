'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import { usePrependPlanAndLocale } from '@/common/links';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/common/Button';
import Icon, { type ValidIconName } from '@/components/common/Icon';
import RichText from '@/components/common/RichText';
import PledgeImpactComparison from '@/components/pledge/PledgeImpactComparison';
import { PLEDGE_PATH } from '@/constants/routes';

// Types
type PledgeCategory = {
  icon: ValidIconName;
  label: string;
  value?: string;
};

type PledgeImpact = {
  targetCount: number;
  currentCount: number;
  savingsAmount: string;
  savingsUnit: string;
  equivalence: string;
};

type RelatedAction = {
  id: string;
  identifier: string;
  name: string;
  description: string;
  viewUrl: string;
};

type MockPledge = {
  slug: string;
  title: string;
  lead: string;
  body: string;
  whyItMatters: string;
  image: string;
  committedCount: number;
  categories: PledgeCategory[];
  impact: PledgeImpact;
  relatedActions: RelatedAction[];
};

const MOCK_PLEDGE: MockPledge = {
  slug: 'start-or-join-carpool',
  title: 'Start or join a carpool group',
  lead: 'Connect with neighbors, coworkers, or fellow commuters to share rides for regular trips like work, school, or shopping. Reduce your transportation costs while cutting emissions and building community connections.',
  body: `<p>Reduce your car trips by joining a carpool with coworkers, neighbours, or classmates. Fewer solo drives mean lower emissions, less traffic, and shared fuel costs—plus, it's a great way to build community.</p>
<p>Read our <a href="/tips-getting-started">tips on getting started</a> or download the <a href="https://carsharing.example.com">Car Sharing App</a> for your local area</p>`,
  whyItMatters:
    '<p>Transportation is one of the biggest sources of emissions in Yolo County. Sharing rides is a simple way to cut your carbon footprint while helping others do the same.</p>',
  image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=900&fit=crop',
  committedCount: 82,
  categories: [
    { icon: 'tachometer', label: 'Impact', value: 'Medium impact' },
    { icon: 'calendar', label: 'Implementation time', value: 'Quick setup' },
    { icon: 'sync', label: 'Commitment type', value: 'Daily habit' },
    { icon: 'award', label: 'Cost', value: 'Saves money' },
  ],
  impact: {
    targetCount: 100,
    currentCount: 82,
    savingsAmount: '9200kg',
    savingsUnit: 'CO₂e',
    equivalence: 'avoiding 575 round trips from Davis to Sacramento',
  },
  relatedActions: [
    {
      id: '1',
      identifier: 'VMT1c',
      name: 'Develop and implement a carpool/vanpool program for County staff that includes incentives for staff who participate. Con...',
      description:
        'Develop and implement a carpool/vanpool program for County staff that includes incentives for staff who participate.',
      viewUrl: '/actions/vmt1c',
    },
    {
      id: '2',
      identifier: 'RCP2a',
      name: 'Encourage neighbors to set up a neighborhood carpool program to reduce personal vehicle miles traveled and provide more...',
      description:
        'Encourage neighbors to set up a neighborhood carpool program to reduce personal vehicle miles traveled and provide more transportation options.',
      viewUrl: '/actions/rcp2a',
    },
    {
      id: '3',
      identifier: 'RCP4a',
      name: 'Encourage neighbors to set up a neighborhood carpool program to reduce personal vehicle miles traveled and provide more...',
      description:
        'Encourage neighbors to set up a neighborhood carpool program to reduce personal vehicle miles traveled and provide more transportation options.',
      viewUrl: '/actions/rcp4a',
    },
  ],
};

const StyledHero = styled.div<{ $bgImage: string }>`
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90%;
    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const StyledHeroContentContainer = styled(Container)`
  position: relative;
  z-index: 1;
  padding-top: ${({ theme }) => theme.spaces.s200};

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    padding-top: ${({ theme }) => theme.spaces.s300};
  }
`;

const StyledHeroCard = styled.div`
  background: ${({ theme }) => theme.themeColors.white};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s200};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-width: 700px;

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    padding: ${({ theme }) => theme.spaces.s300};
  }
`;

const StyledBreadcrumbWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s100};
  font-size: ${({ theme }) => theme.fontSizeSm};
`;

const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizeLg};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spaces.s150};
  line-height: ${({ theme }) => theme.lineHeightSm};

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    font-size: ${({ theme }) => theme.fontSizeXl};
  }
`;

const StyledLead = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  line-height: ${({ theme }) => theme.lineHeightMd};
  margin-bottom: ${({ theme }) => theme.spaces.s200};

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    font-size: ${({ theme }) => theme.fontSizeMd};
  }
`;

const StyledActionsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.s100};
`;

const StyledCommitButton = styled(Button)<{ $isCommitted: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
`;

const StyledMetaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s050};
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledMetaItem = styled.li`
  display: flex;
  padding: 0 ${({ theme }) => theme.spaces.s050};
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
  font-size: ${({ theme }) => theme.fontSizeSm};
  background: ${({ theme }) => theme.brandLight};
  color: ${({ theme }) =>
    readableColor(theme.brandLight, theme.textColor.primary, theme.themeColors.white)};

  .icon {
    flex-shrink: 0;
  }
`;

const StyledMetaLabel = styled.span`
  color: ${({ theme }) =>
    readableColor(theme.brandLight, theme.textColor.primary, theme.themeColors.white)};
  opacity: 80%;
`;

const StyledPageContentContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.spaces.s300};
  padding-bottom: ${({ theme }) => theme.spaces.s400};
`;

const StyledSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spaces.s300};
`;

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

const StyledRelatedActionsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s100};
  margin-bottom: ${({ theme }) => theme.spaces.s300};
`;

const StyledRelatedActionCard = styled.div`
  background: ${({ theme }) => theme.graphColors.grey010};
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.light};
  padding: ${({ theme }) => theme.spaces.s100};
`;

const StyledActionIdentifier = styled.span`
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: ${({ theme }) => theme.textColor.primary};
`;

const StyledActionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.secondary};
  margin: ${({ theme }) => theme.spaces.s050} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledViewActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.linkColor};

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  params: Promise<{ plan: string; lang: string; slug: string }>;
};

export default function PledgeDetailPage({ params }: Props) {
  const [isCommitted, setIsCommitted] = useState(true);
  const t = useTranslations();
  const pledgeListLink = usePrependPlanAndLocale(PLEDGE_PATH);

  const pledge = MOCK_PLEDGE;

  const breadcrumbs = [
    { id: 'pledges', name: t('pledge-list-title'), url: pledgeListLink },
    { id: pledge.slug, name: pledge.title },
  ];

  return (
    <>
      <StyledHero $bgImage={pledge.image}>
        <StyledHeroContentContainer fluid="sm">
          <StyledHeroCard>
            <StyledBreadcrumbWrapper>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </StyledBreadcrumbWrapper>

            <StyledTitle>{pledge.title}</StyledTitle>
            <StyledLead>{pledge.lead}</StyledLead>

            <StyledActionsRow>
              <StyledCommitButton
                color="primary"
                outline={!isCommitted}
                $isCommitted={isCommitted}
                onClick={() => setIsCommitted(!isCommitted)}
                aria-pressed={isCommitted}
              >
                <Icon name="award" width="18px" height="18px" />
                {isCommitted ? t('pledge-committed') : t('pledge-commit-to-this')}
              </StyledCommitButton>
            </StyledActionsRow>
          </StyledHeroCard>
        </StyledHeroContentContainer>
      </StyledHero>

      <StyledPageContentContainer fluid="sm">
        <StyledMetaList>
          <StyledMetaItem>
            <Icon name="user" width="18px" height="18px" />
            {t('pledge-committed-count', { count: pledge.committedCount })}
          </StyledMetaItem>
          {pledge.categories.map((category, index) => (
            <StyledMetaItem key={index}>
              <Icon name={category.icon} width="18px" height="18px" />
              <StyledMetaLabel>{category.label}:</StyledMetaLabel>
              {category.value}
            </StyledMetaItem>
          ))}
        </StyledMetaList>

        <StyledSection>
          <RichText html={pledge.body} />
        </StyledSection>

        <StyledSection>
          <PledgeImpactComparison
            residentCount={pledge.impact.targetCount}
            saving={`We save <strong>${pledge.impact.savingsAmount} ${pledge.impact.savingsUnit}</strong> each year`}
            savingIcon="arrow-down"
            equivalence={`That's equivalent to <strong>${pledge.impact.equivalence}</strong>`}
          />
        </StyledSection>

        <StyledRelatedActionsSection>
          <StyledSectionTitle>{t('pledge-how-this-supports-climate-plan')}</StyledSectionTitle>

          {pledge.relatedActions.map((action) => (
            <StyledRelatedActionCard key={action.id}>
              <StyledActionIdentifier>{action.identifier}.</StyledActionIdentifier> {action.name}
              <StyledActionDescription>{action.description}</StyledActionDescription>
              <StyledViewActionLink href={action.viewUrl}>
                {t('pledge-view-action')}
                <Icon name="arrow-up-right-from-square" width="14px" height="14px" />
              </StyledViewActionLink>
            </StyledRelatedActionCard>
          ))}
        </StyledRelatedActionsSection>
      </StyledPageContentContainer>
    </>
  );
}
