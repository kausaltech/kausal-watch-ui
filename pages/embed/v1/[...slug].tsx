import React, { useEffect, useRef, useState, Suspense } from 'react';
import Layout from 'components/layout';
import Icon from '../../../components/common/Icon';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'common/theme';
import EmbedContext from '../../../context/embed';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as Sentry from "@sentry/nextjs";

const postHeight = (height: number) => {
  window.parent.postMessage({source: 'kausal-watch-embed', height }, '*');
};

const UnknownWrapper = styled.div`
  padding: ${(props) => props.theme.spaces.s400};
`;

const EmbedContainer = styled(Container)`
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
        height={theme.fontSizeXl} />
    </UnknownWrapper>
  );
}

const RecentActionsEmbed = dynamic(() => import('components/embed/RecentActionsEmbed', {
  suspense: true,
}));

class InvalidEmbedAddressError extends Error {};

const validateUrl = (slug: string[] | undefined) : InvalidEmbedAddressError | null => {
  if (slug == null) {
    return new InvalidEmbedAddressError('Invalid null embed path');
  }
  if (slug.length < 1) {
    return new InvalidEmbedAddressError('Missing embed type');
  }
  return null;
}

const EmbeddablePage = () => {
  const wrapperElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperElement.current;
    el && postHeight(el.offsetHeight);
    window.addEventListener('resize', (event) => {
      const el = wrapperElement.current;
      el && postHeight(el.offsetHeight);
    });
  });
  const { query } = useRouter();
  const slug = query.slug as string[];
  let error = validateUrl(slug);
  let component : JSX.Element;
  let embedType : string | null = null;
  if (error) {
    component = <UnknownEmbedPlaceholder />;
  }
  else {
    embedType = slug[0];
    switch (embedType) {
      case 'actions-recent':
        component = <RecentActionsEmbed />;
        break;
      case 'action':
        component = <UnknownEmbedPlaceholder />;
        break;
      default:
        component = <UnknownEmbedPlaceholder />;
        error = new InvalidEmbedAddressError(`Unsupported embed type ${embedType}`);
        break;
    }
  }
  const embedContext : EmbedContext = {
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
          <EmbedContainer>
            { component }
          </EmbedContainer>
        </div>
      </Layout>
    </EmbedContext.Provider>
  );
}

export default EmbeddablePage
;
