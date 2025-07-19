'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const Loader = styled.div`
  padding: ${(props) => props.theme.spaces.s800} ${(props) => props.theme.spaces.s300};
  text-align: center;
`;

const StyledSpinner = styled(Spinner)`
  width: ${(props) => props.theme.spaces.s100};
  height: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.brandDark};
`;

type Props = {
  /** Support rendering server-side */
  initiallyVisible?: boolean;
};

function ContentLoader({ initiallyVisible = false }: Props) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  useEffect(() => {
    // Only display the message and spinner after 250ms has passed
    const timer = setTimeout(() => setIsVisible(true));

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Loader>
      <StyledSpinner type="grow" className="mx-1" />
      <StyledSpinner type="grow" className="mx-1" />
      <StyledSpinner type="grow" className="mx-1" />
      <div className="visually-hidden">{t('loading')}</div>
    </Loader>
  );
}

export default ContentLoader;
