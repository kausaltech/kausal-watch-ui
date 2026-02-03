'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, ButtonGroup, Container } from 'reactstrap';
import styled from 'styled-components';

import HeroFullImage from '@/components/home/HeroFullImage';

const MOCK_HERO_IMAGE = {
  id: 'a08966d2-ec91-450a-8f13-d9b793c6255b',
  blockType: 'FrontPageHeroBlock',
  field: 'front_page_hero',
  layout: 'big_image',
  image: {
    title: 'Tree on a sunflower field during a sunset',
    altText: 'Tree on a sunflower field during a sunset',
    imageCredit: '',
    width: 3000,
    height: 1500,
    focalPointX: null,
    focalPointY: null,
    focalPointWidth: null,
    focalPointHeight: null,
    full: {
      id: 'unpublished-cc204c0c-0668-4257-b2aa-9811c8976fd5',
      width: 1600,
      height: 800,
      src: 'https://watch-media-prod.s3.kausal.tech/images/2025-06/shutterstock_1171985149.max-1600x1600.jpg?AWSAccessKeyId=watch-media-prod&Signature=eEqJwyzCu0TUoJdr9YiLhHxx%2BVg%3D&Expires=1770125193',
      __typename: 'ImageRendition',
    },
    large: {
      id: 'unpublished-8fe6e7f4-2ad1-4c6a-abb1-334c390ed5d0',
      width: 1600,
      height: 600,
      src: 'https://watch-media-prod.s3.kausal.tech/images/2025-06/shutterstock_1171985149.2e16d0ba.fill-1600x600-c50.jpg?AWSAccessKeyId=watch-media-prod&Signature=11Fm9m7wrvuDBhjFxhvBnoovwQM%3D&Expires=1770125193',
      __typename: 'ImageRendition',
    },
    small: {
      id: 'unpublished-255fc60a-5099-43dd-b6ef-65c7d558992d',
      width: 600,
      height: 300,
      src: 'https://watch-media-prod.s3.kausal.tech/images/2025-06/shutterstock_1171985149.2e16d0ba.fill-600x300-c50.jpg?AWSAccessKeyId=watch-media-prod&Signature=I6FERTnKB0FK1nj5lDOUpeejpmo%3D&Expires=1770125193',
      __typename: 'ImageRendition',
    },
    social: {
      id: 'unpublished-4d0e2593-8a48-46b1-a779-69a64a44c20e',
      width: 1200,
      height: 627,
      src: 'https://watch-media-prod.s3.kausal.tech/images/2025-06/shutterstock_1171985149.2e16d0ba.fill-1200x627-c50.jpg?AWSAccessKeyId=watch-media-prod&Signature=Q5sdftPvs9j1y%2FWFLpv8t5dKBbA%3D&Expires=1770125193',
      __typename: 'ImageRendition',
    },
    rendition: {
      id: 'unpublished-e720250f-89bd-49f5-968b-cb415936ccdf',
      width: 300,
      height: 200,
      src: 'https://watch-media-prod.s3.kausal.tech/images/2025-06/shutterstock_1171985149.2e16d0ba.fill-300x200-c50.jpg?AWSAccessKeyId=watch-media-prod&Signature=EBPcXhgE0oSQOBBAKveBRWMGckk%3D&Expires=1770125193',
      __typename: 'ImageRendition',
    },
    __typename: 'Image',
  },
  heading: 'Continued Commitment for a Better Future',
  lead: '<p data-block-key="t3mgj">The County of Yolo (County) Climate Action and Adaptation Plan (CAAP) is a comprehensive roadmap to achieve reductions in greenhouse gas (GHG) emissions and increase resilience in response to the impacts of climate change while centering equity and a Just Transition.</p>',
  __typename: 'FrontPageHeroBlock',
};

const MOCK_TITLE = {
  title: 'Join your community in building a more sustainable Yolo County',
  lead: 'Pledge your commitment to sustainable choices that will help your environment and community.',
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
  @media (max-width: ${(props) => props.theme.breakpointSm}) {
    text-align: center;
  }
`;

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

type ViewType = 'ALL' | 'MY_PLEDGES';

export default function PledgeListPage(props: Props) {
  const [view, setView] = useState<ViewType>('ALL');

  const t = useTranslations();

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
    <>
      <HeroFullImage
        title={MOCK_TITLE.title}
        lead={MOCK_TITLE.lead}
        id={MOCK_HERO_IMAGE.id}
        bgImage={MOCK_HERO_IMAGE.image.large.src}
        altText={MOCK_HERO_IMAGE.image.altText}
        imageCredit={MOCK_HERO_IMAGE.image.imageCredit}
      />
      <StyledContainer>
        <StyledTabsContainer>
          <ButtonGroup
            role="radiogroup"
            aria-label={t('pledge-list-view-toggle')}
            onKeyDown={handleRadiosKeyDown}
          >
            <StyledRadioButton
              color="black"
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

        <pre>Selected: {view}</pre>
      </StyledContainer>
    </>
  );
}
