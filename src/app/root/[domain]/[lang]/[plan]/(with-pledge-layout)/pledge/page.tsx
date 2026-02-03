'use client';

import { Container } from 'reactstrap';

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

type Props = {
  params: Promise<{ plan: string; lang: string }>;
};

export default async function PledgeListPage(props: Props) {
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
      <Container>{/* Pledge list goes here yo! */}</Container>
    </>
  );
}
