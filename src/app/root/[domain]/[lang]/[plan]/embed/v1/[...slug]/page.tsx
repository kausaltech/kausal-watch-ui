'use client';

import { type JSX, use, useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import * as Sentry from '@sentry/nextjs';
import { debounce } from 'lodash-es';
import { Container } from 'reactstrap';

import Icon from '@/components/common/Icon';
import EmbedContext, { InvalidEmbedAddressError } from '@/context/embed';

const postHeight = (height: number, embId: string) => {
  window.parent.postMessage({ source: embId, height }, '*');
};

const UnknownWrapper = styled.div`
  padding: ${(props) => props.theme.spaces.s400};
`;

const EmbedContainer = styled(({ embedType, ...props }) => <Container {...props} />)`
  padding: ${(props) => props.theme.spaces.s150};
`;

const UnknownEmbedPlaceholder = () => {
  const theme = useTheme();
  return (
    <UnknownWrapper>
      <Icon.ExclamationCircle
        color={theme.themeColors.light}
        width={theme.fontSizeXl}
        height={theme.fontSizeXl}
      />
    </UnknownWrapper>
  );
};

const RecentActionsEmbed = dynamic(() => import('@/components/embed/RecentActionsEmbed'), {
  // TODO: try to enable real React 18 mode and enable suspense
  //suspense: true,
});

const ActionEmbed = dynamic(() => import('@/components/embed/ActionEmbed'), {
  //suspense: true,
});

const IndicatorEmbed = dynamic(() => import('@/components/embed/IndicatorEmbed'), {
  //suspense: true,
});

const validateUrl = (slug: string[] | undefined): InvalidEmbedAddressError | null => {
  if (slug == null) {
    return new InvalidEmbedAddressError('Invalid null embed path');
  }
  if (slug.length < 1) {
    return new InvalidEmbedAddressError('Missing embed type');
  }
  return null;
};

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const EmbeddablePage = (props: Props) => {
  const params = use(props.params);
  const slug = params.slug.map(decodeURIComponent);
  const wrapperElement = useRef<HTMLDivElement>(null);
  const query = useSearchParams();
  const embId = query.get('embId') ?? 'kausal-watch-embed';
  useEffect(() => {
    const postWrapperHeight = () => {
      const el = wrapperElement.current;
      if (el !== null) postHeight(el.offsetHeight, embId);
    };
    const debouncedPostWrapperHeight = debounce(postWrapperHeight, 200);
    postWrapperHeight();
    document.addEventListener('indicator_graph_ready', postWrapperHeight);
    window.addEventListener('resize', debouncedPostWrapperHeight);
    return () => {
      document.removeEventListener('indicator_graph_ready', postWrapperHeight);
      window.removeEventListener('resize', debouncedPostWrapperHeight);
      debouncedPostWrapperHeight.cancel();
    };
  }, [embId]);
  let error = validateUrl(slug);
  let component: JSX.Element;
  let embedType: string | null = null;
  if (error) {
    component = <UnknownEmbedPlaceholder />;
  } else {
    embedType = slug[0];
    switch (embedType) {
      case 'actions-recent':
        component = <RecentActionsEmbed />;
        break;
      case 'actions': {
        let maxWidth: string[] | string | number | undefined = query.get('maxWidth') ?? undefined;
        if (Array.isArray(maxWidth)) {
          maxWidth = maxWidth[0] as string | number | undefined;
        }
        if (maxWidth !== undefined) {
          maxWidth = typeof maxWidth === 'string' ? Number.parseInt(maxWidth, 10) : maxWidth;
          if (isNaN(maxWidth)) {
            maxWidth = undefined;
          } else {
            maxWidth = Math.min(maxWidth, 1200);
          }
        }
        component = <ActionEmbed path={slug.slice(1)} maxWidth={maxWidth} />;
        break;
      }
      case 'indicators':
        component = <IndicatorEmbed path={slug.slice(1)} />;
        break;
      default:
        component = <UnknownEmbedPlaceholder />;
        error = new InvalidEmbedAddressError(`Unsupported embed type ${embedType}`);
        break;
    }
  }
  const embedContext: EmbedContext = {
    active: true,
    type: embedType,
  };
  if (error) {
    Sentry.captureException(error);
  }
  return (
    <EmbedContext.Provider value={embedContext}>
      <main data-testid="embed-page">
        <div ref={wrapperElement}>
          <EmbedContainer embedType={embedType}>{component}</EmbedContainer>
        </div>
      </main>
    </EmbedContext.Provider>
  );
};

export default EmbeddablePage;
