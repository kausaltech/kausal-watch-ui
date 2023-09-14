import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from 'react';
import Layout from 'components/layout';
import Icon from '../../../components/common/Icon';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import { debounce } from 'lodash';
import EmbedContext, { InvalidEmbedAddressError } from '../../../context/embed';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';

const postHeight = (height: number, embId: string) => {
  window.parent.postMessage({ source: embId, height }, '*');
};

const UnknownWrapper = styled.div`
  padding: ${(props) => props.theme.spaces.s400};
`;

const EmbedContainer = styled(({ embedType, ...props }) => (
  <Container {...props} />
))`
  padding: ${(props) => props.theme.spaces.s150};
`;

const UnknownEmbedPlaceholder = () => {
  const theme = useTheme();
  return (
    <UnknownWrapper>
      <Icon
        name="exclamation-circle"
        color={theme.themeColors.light}
        width={theme.fontSizeXl}
        height={theme.fontSizeXl}
      />
    </UnknownWrapper>
  );
};

const RecentActionsEmbed = dynamic(
  () => import('components/embed/RecentActionsEmbed'),
  {
    // TODO: try to enable real React 18 mode and enable suspense
    //suspense: true,
  }
);

const ActionEmbed = dynamic(() => import('components/embed/ActionEmbed'), {
  //suspense: true,
});

const IndicatorEmbed = dynamic(
  () => import('components/embed/IndicatorEmbed'),
  {
    //suspense: true,
  }
);

const validateUrl = (
  slug: string[] | undefined
): InvalidEmbedAddressError | null => {
  if (slug == null) {
    return new InvalidEmbedAddressError('Invalid null embed path');
  }
  if (slug.length < 1) {
    return new InvalidEmbedAddressError('Missing embed type');
  }
  return null;
};

const EmbeddablePage = () => {
  const wrapperElement = useRef<HTMLDivElement>(null);
  const { query } = useRouter();
  const embId =
    (Array.isArray(query.embId) ? query.embId[0] : query.embId) ??
    'kausal-watch-embed';
  const postWrapperHeight = () => {
    const el = wrapperElement.current;
    if (el !== null) postHeight(el.offsetHeight, embId);
  };
  const debouncedPostWrapperHeight = useRef(debounce(postWrapperHeight, 200));
  useEffect(() => {
    postWrapperHeight();
    document.addEventListener('indicator_graph_ready', postWrapperHeight);
    window.addEventListener('resize', debouncedPostWrapperHeight.current);
  }),
    [embId, wrapperElement];
  const slug = query.slug as string[];
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
      case 'actions':
        let maxWidth: string[] | string | number | undefined = query.maxWidth;
        if (Array.isArray(maxWidth)) {
          maxWidth = maxWidth[0];
        }
        if (maxWidth !== undefined) {
          maxWidth = Number.parseInt(maxWidth, 10);
          if (isNaN(maxWidth)) {
            maxWidth = undefined;
          } else {
            maxWidth = Math.min(maxWidth, 1200);
          }
        }
        component = <ActionEmbed path={slug.slice(1)} maxWidth={maxWidth} />;
        break;
      case 'indicators':
        component = <IndicatorEmbed path={slug.slice(1)} />;
        break;
      default:
        component = <UnknownEmbedPlaceholder />;
        error = new InvalidEmbedAddressError(
          `Unsupported embed type ${embedType}`
        );
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
      <Layout>
        <div ref={wrapperElement}>
          <EmbedContainer embedType={embedType}>{component}</EmbedContainer>
        </div>
      </Layout>
    </EmbedContext.Provider>
  );
};

export default EmbeddablePage;
