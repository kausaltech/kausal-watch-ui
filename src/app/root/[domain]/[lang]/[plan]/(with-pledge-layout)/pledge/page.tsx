'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, ButtonGroup, Container } from 'reactstrap';
import styled from 'styled-components';

import HeroFullImage from '@/components/home/HeroFullImage';
import PledgeCard, { type PledgeCategory } from '@/components/pledge/PledgeCard';

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

type MockPledge = {
  slug: string;
  title: string;
  description: string;
  image: string;
  committedCount: number;
  categories: PledgeCategory[];
};

const MOCK_PLEDGES: MockPledge[] = [
  {
    slug: 'turn-off-unused-electronics',
    title: 'Turn off unused electronics',
    description:
      'Make it a daily habit to unplug or turn off electronics, lights, and appliances when not in use. Even devices in "standby" mode consume energy that adds up over time.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    committedCount: 122,
    categories: [
      { icon: 'tachometer', label: 'Saves money' },
      { icon: 'calendar', label: 'Start now' },
    ],
  },
  {
    slug: 'start-or-join-carpool',
    title: 'Start or join a carpool group',
    description:
      'Connect with neighbors, coworkers, or fellow commuters to share rides for regular trips like work, school, or errands. Carpooling reduces emissions and saves money on fuel.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
    committedCount: 83,
    categories: [
      { icon: 'tachometer', label: 'Saves money' },
      { icon: 'gear', label: 'Quick setup' },
    ],
  },
  {
    slug: 'reduce-meat-consumption',
    title: 'Reduce meat consumption',
    description:
      'Try incorporating more plant-based meals into your diet. Even one meat-free day per week can significantly reduce your carbon footprint and improve your health.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    committedCount: 256,
    categories: [
      { icon: 'heart', label: 'Health benefit' },
      { icon: 'tachometer', label: 'Saves money' },
    ],
  },
  {
    slug: 'install-led-bulbs',
    title: 'Install LED light bulbs',
    description:
      'Replace incandescent and CFL bulbs with energy-efficient LED bulbs. They last longer, use less energy, and reduce your electricity bills.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=400&fit=crop',
    committedCount: 189,
    categories: [
      { icon: 'tachometer', label: 'Saves money' },
      { icon: 'gear', label: 'Quick setup' },
    ],
  },
  {
    slug: 'use-reusable-bags',
    title: 'Use reusable shopping bags',
    description:
      'Bring your own bags when shopping to reduce plastic waste. Keep reusable bags in your car or by your front door so you always have them handy.',
    image:
      'https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?q=80&w=1970&auto=format&fit=crop',
    committedCount: 312,
    categories: [
      { icon: 'calendar', label: 'Start now' },
      { icon: 'globe', label: 'Reduces waste' },
    ],
  },
  {
    slug: 'plant-native-garden',
    title: 'Plant a native garden',
    description:
      'Create a garden with native plants that support local wildlife and require less water than non-native species. Native plants are adapted to local conditions and attract pollinators.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    committedCount: 67,
    categories: [
      { icon: 'globe', label: 'Supports wildlife' },
      { icon: 'tachometer', label: 'Saves water' },
    ],
  },
];

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

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

type ViewType = 'ALL' | 'MY_PLEDGES';

export default function PledgeListPage(props: Props) {
  const [view, setView] = useState<ViewType>('ALL');
  const [committedSlugs, setCommittedSlugs] = useState<Set<string>>(
    new Set(['turn-off-unused-electronics', 'start-or-join-carpool'])
  );

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
    view === 'MY_PLEDGES'
      ? MOCK_PLEDGES.filter((pledge) => committedSlugs.has(pledge.slug))
      : MOCK_PLEDGES;

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
              title={pledge.title}
              description={pledge.description}
              slug={pledge.slug}
              image={pledge.image}
              imageAlt={pledge.title}
              committedCount={pledge.committedCount}
              categories={pledge.categories}
              isCommitted={committedSlugs.has(pledge.slug)}
              onCommittedChange={(committed) => handleCommittedChange(pledge.slug, committed)}
            />
          ))}
        </StyledPledgeGrid>

        {view === 'MY_PLEDGES' && filteredPledges.length === 0 && (
          <p>{t('pledge-no-commitments')}</p>
        )}
      </StyledContainer>
    </>
  );
}
