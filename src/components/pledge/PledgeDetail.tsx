'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Container, Spinner } from 'reactstrap';

import type { GetPledgeQuery } from '@/common/__generated__/graphql';
import { usePrependPlanAndLocale } from '@/common/links';
import { excludeNullish } from '@/common/utils';
import Accordion from '@/components/common/Accordion';
import ActionAttribute from '@/components/common/ActionAttribute';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import RichText from '@/components/common/RichText';
import { PLEDGE_PATH } from '@/constants/routes';
import { getDefaultFormFields } from '@/utils/pledge.utils';

import ConfirmPledge from './ConfirmPledge';
import PledgeFeedback from './PledgeFeedback';
import PledgeImpactComparison from './PledgeImpactComparison';
import { ShareButton } from './ShareButton';
import { usePledgeUser } from './use-pledge-user';

type PledgeData = NonNullable<NonNullable<GetPledgeQuery['plan']>['pledge']>;

type Props = {
  pledge: PledgeData;
  planIdentifier: string;
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
    background-color: ${({ theme }) => theme.brandDark};
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
  line-height: ${({ theme }) => theme.lineHeightMd};

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    font-size: ${({ theme }) => theme.fontSizeXl};
  }
`;

const StyledLead = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  line-height: ${({ theme }) => theme.lineHeightBase};
  margin-bottom: ${({ theme }) => theme.spaces.s200};

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    font-size: ${({ theme }) => theme.fontSizeMd};
  }
`;

const StyledActionsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.s050};
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
  padding: ${({ theme }) => theme.spaces.s025} ${({ theme }) => theme.spaces.s050};
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
  font-size: ${({ theme }) => theme.fontSizeSm};
  background: ${({ theme }) => theme.brandLight};
  color: ${({ theme }) =>
    readableColor(theme.brandLight, theme.textColor.primary, theme.themeColors.white)};
  border-radius: ${({ theme }) => theme.btnBorderRadius};

  .icon {
    flex-shrink: 0;
  }
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

const StyledViewActionLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.linkColor};
  margin-top: ${({ theme }) => theme.spaces.s050};

  &:hover {
    text-decoration: underline;
  }
`;

const StyledBodySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s300};
`;

const StyledLargeImage = styled.figure`
  margin: ${({ theme }) => theme.spaces.s200} 0;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const StyledImageCredit = styled.figcaption`
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.tertiary};
  margin-top: ${({ theme }) => theme.spaces.s050};
`;

const StyledFaqSection = styled.section`
  background: ${({ theme }) => theme.themeColors.light};
  padding: ${({ theme }) => theme.spaces.s300} 0;
  margin: ${({ theme }) => theme.spaces.s200} 0;

  h3 {
    font-size: ${({ theme }) => theme.fontSizeMd};
    margin-bottom: ${({ theme }) => theme.spaces.s200};
  }
`;

type BodyBlock = NonNullable<PledgeData['body']>[number];

function PledgeBodyBlock({ block }: { block: BodyBlock }) {
  switch (block.__typename) {
    case 'RichTextBlock':
      return <RichText html={block.value} />;

    case 'QuestionAnswerBlock': {
      const questions = excludeNullish(block.questions ?? []);
      if (!questions.length) return null;

      return (
        <StyledFaqSection>
          <Container fluid="sm">
            {block.heading && <h3>{block.heading}</h3>}
            <Accordion>
              {questions.map((q, i) => (
                <Accordion.Item key={i}>
                  <Accordion.Header>{q.question}</Accordion.Header>
                  <Accordion.Body>
                    <RichText html={q.answer} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </StyledFaqSection>
      );
    }

    case 'LargeImageBlock': {
      const { image } = block;
      if (!image?.renditionUncropped?.src) return null;

      return (
        <StyledLargeImage>
          <img src={image.renditionUncropped.src} alt={image.altText} />
          {image.imageCredit && <StyledImageCredit>{image.imageCredit}</StyledImageCredit>}
        </StyledLargeImage>
      );
    }

    default:
      return null;
  }
}

function PledgeDetail({ pledge, planIdentifier }: Props) {
  const [showConfirmDrawer, setShowConfirmDrawer] = useState(false);
  const [isUpdatingCommitment, setIsUpdatingCommitment] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations();
  const pledgeListLink = usePrependPlanAndLocale(PLEDGE_PATH);
  const {
    userData,
    committedSlugs,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
  } = usePledgeUser();

  const isCommitted = committedSlugs.has(pledge.slug);
  const breadcrumbs = [{ id: 'pledges', name: t('pledge-list-title'), url: pledgeListLink }];

  const heroImage = pledge.image?.large?.src ?? pledge.image?.full?.src ?? '';
  const actions = pledge.actions ?? [];

  useEffect(() => setIsClient(true), []);

  const handleCommitClick = async () => {
    if (isCommitted) {
      setIsUpdatingCommitment(true);
      await uncommitFromPledge(pledge.id);
      setIsUpdatingCommitment(false);
    } else {
      setShowConfirmDrawer(true);
    }
  };

  const handleConfirmPledge = async (formData: Record<string, string>) => {
    await commitToPledge(pledge.id, formData);
  };

  const handleCloseDrawer = () => {
    setShowConfirmDrawer(false);
  };

  return (
    <>
      <StyledHero $bgImage={heroImage}>
        <StyledHeroContentContainer fluid="sm">
          <StyledHeroCard>
            <StyledBreadcrumbWrapper>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </StyledBreadcrumbWrapper>

            <StyledTitle>{pledge.name}</StyledTitle>
            <StyledLead>{pledge.description}</StyledLead>

            <StyledActionsRow>
              <StyledCommitButton
                color="primary"
                outline={!isCommitted}
                $isCommitted={isCommitted}
                onClick={handleCommitClick}
                aria-pressed={isCommitted}
              >
                {isUpdatingCommitment ? (
                  <Spinner size="sm" />
                ) : (
                  <Icon name="award" width="18px" height="18px" />
                )}
                {isCommitted ? t('pledge-committed') : t('pledge-commit-to-this')}
              </StyledCommitButton>
              {isClient && (
                <ShareButton
                  color="link"
                  outline
                  size="md"
                  title={pledge.name}
                  shareUrl={window.location.href}
                />
              )}
            </StyledActionsRow>
          </StyledHeroCard>
        </StyledHeroContentContainer>
      </StyledHero>

      <StyledPageContentContainer fluid="sm">
        <StyledMetaList>
          <StyledMetaItem>
            <Icon name="user" width="18px" height="18px" />
            {t('pledge-commitment-count', {
              count: pledge.commitmentCount + getCommitmentCountAdjustment(pledge.slug),
            })}
          </StyledMetaItem>

          {pledge.attributes?.map((attribute) => (
            <StyledMetaItem key={attribute.id}>
              <ActionAttribute attribute={attribute} attributeType={null} variant="chip" />
            </StyledMetaItem>
          ))}
        </StyledMetaList>

        {pledge.body && pledge.body.length > 0 && (
          <StyledBodySection>
            {pledge.body.map((block) => (
              <PledgeBodyBlock key={block.id} block={block} />
            ))}
          </StyledBodySection>
        )}

        {pledge.residentCount != null && pledge.impactStatement && (
          <StyledSection>
            <PledgeImpactComparison
              residentCount={pledge.residentCount}
              impactStatement={pledge.impactStatement}
              impactIcon="arrow-down"
              equivalence={pledge.localEquivalency}
            />
          </StyledSection>
        )}

        {actions.length > 0 && (
          <StyledRelatedActionsSection>
            <StyledSectionTitle>{t('pledge-how-this-supports-climate-plan')}</StyledSectionTitle>

            {actions.map((action) => (
              <StyledRelatedActionCard key={action.id}>
                <StyledActionIdentifier>{action.identifier}.</StyledActionIdentifier> {action.name}
                <StyledViewActionLink href={action.viewUrl} target="_blank">
                  {t('pledge-view-action')}
                  <Icon name="arrow-up-right-from-square" width="14px" height="14px" />
                </StyledViewActionLink>
              </StyledRelatedActionCard>
            ))}
          </StyledRelatedActionsSection>
        )}

        <PledgeFeedback
          pledgeId={pledge.id}
          planIdentifier={planIdentifier}
          pledgeSlug={pledge.slug}
          pledgeTitle={pledge.name}
        />
      </StyledPageContentContainer>

      <ConfirmPledge
        isOpen={showConfirmDrawer}
        onClose={handleCloseDrawer}
        onConfirm={handleConfirmPledge}
        pledgeName={pledge.name}
        pledgeSlug={pledge.slug}
        pledgeImage={pledge.image?.rendition?.src ?? null}
        commitmentCount={pledge.commitmentCount}
        formFields={getDefaultFormFields(t)}
        userData={userData}
      />
    </>
  );
}

export default PledgeDetail;
