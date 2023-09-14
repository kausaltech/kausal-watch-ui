import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';

const SkipLink = styled.a`
  position: absolute;
  z-index: 3000;
  left: ${(props) => props.theme.spaces.s100};
  top: 0;
  padding: ${(props) => props.theme.spaces.s050};
  background: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.themeColors.black};
  border: 2px solid ${(props) => props.theme.themeColors.black};
  transform: translateY(-100%);
  transition: transform 0.2s;

  &:focus {
    transform: translateY(0%);
  }
`;

function SkipToContent() {
  const { t } = useTranslation();

  return <SkipLink href="#main">{t('skip-to-content')}</SkipLink>;
}

export default SkipToContent;
