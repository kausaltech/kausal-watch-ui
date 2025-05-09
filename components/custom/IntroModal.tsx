'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useTranslations, useLocale } from 'next-intl';
import { transparentize } from 'polished';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => transparentize(0.6, props.theme.themeColors.black)};
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 100%;
  max-width: 640px;
  background: ${(props) => props.theme.themeColors.white};
  overflow: hidden;
  box-shadow: 0 8px 40px
    ${(props) => transparentize(0.8, props.theme.themeColors.black)};
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  ${(props) => props.theme.neutralLight};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontSizeBase};
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: ${(props) => props.theme.brandDark};
    cursor: pointer;
  }
`;

interface IntroModalProps {
  videoUrls: { en: string; es: string };
}

const IntroModal = ({ videoUrls }: IntroModalProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale.startsWith('es') ? 'es' : 'en';

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const show = localStorage.getItem('show-intro-modal');
    if (show === null || JSON.parse(show) === true) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('show-intro-modal', JSON.stringify(!isChecked));
    setEnabled(false);
  };

  const videoUrl = videoUrls?.[lang] ?? videoUrls.en;
  const match = videoUrl.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
  const embedUrl = match ? `https://www.youtube.com/embed/${match[1]}` : '';

  if (!enabled) return null;

  return (
    <Overlay>
      <ModalBox>
        <VideoWrapper>
          <StyledIframe
            src={`${embedUrl}?autoplay=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
        <Footer>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            {t('do-not-show-again')}
          </CheckboxLabel>
          <Button color="primary" onClick={handleClose}>
            {t('close')}
          </Button>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default IntroModal;
