'use client';

import { type IframeHTMLAttributes, useState } from 'react';

import { Dialog } from '@mui/material';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';
import { ArrowsFullscreen, X } from 'react-bootstrap-icons';

type ExpandableIframeProps = IframeHTMLAttributes<HTMLIFrameElement>;

const EmbedWrapper = styled.div`
  width: 100%;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => `${theme.spaces.s100} ${theme.spaces.s200}`};
  background-color: ${({ theme }) => theme.cardBackground.primary};
  border: 2px solid ${({ theme }) => theme.themeColors.light};
  border-radius: ${({ theme }) => `${theme.cardBorderRadius} ${theme.cardBorderRadius} 0 0`};
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.linkColor};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: ${({ theme }) => theme.fontSizeBase};
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const IframeContainer = styled.div`
  position: relative;
  border: 2px solid ${({ theme }) => theme.themeColors.light};
  border-top: none;
  border-radius: ${({ theme }) => `0 0 ${theme.cardBorderRadius} ${theme.cardBorderRadius}`};
  overflow: hidden;

  &:hover .expand-overlay {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ExpandOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.s200};
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  cursor: pointer;
  z-index: 1;
`;

const CenterExpandButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => `${theme.spaces.s100} ${theme.spaces.s150}`};
  background: ${({ theme }) => theme.themeColors.white};
  border-radius: 4px;
  color: ${({ theme }) => theme.linkColor};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: ${({ theme }) => theme.fontSizeBase};
`;

const ClickToInteractText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.themeColors.white};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: ${({ theme }) => theme.fontSizeBase};
  text-align: center;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.cardBorderRadius};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    max-height: 95vh;
    overflow: hidden;
  }
`;

const DialogHeaderBar = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s100}`};
  background-color: ${({ theme }) => theme.cardBackground.primary};
  border-bottom: 2px solid ${({ theme }) => theme.themeColors.light};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.themeColors.dark};
  font-size: 1.25rem;

  &:hover {
    opacity: 0.7;
  }
`;

const DialogIframe = styled.iframe`
  display: block;
  width: 100%;
  flex: 1;
  min-height: 0;
  border: none;
  pointer-events: auto;
`;

const NonInteractiveIframe = styled.iframe<{ $height?: string | number }>`
  display: block;
  width: 100%;
  height: ${({ $height }) => $height ?? '400px'};
  border: none;
  pointer-events: none;
`;

export default function ExpandableIframe(props: ExpandableIframeProps) {
  const { height, ...iframeAttribs } = props;
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  return (
    <EmbedWrapper>
      <HeaderBar>
        <ExpandButton onClick={() => setIsOpen(true)} aria-label={t('expand-embed')}>
          <ArrowsFullscreen size={18} aria-hidden />
          {t('expand-embed')}
        </ExpandButton>
      </HeaderBar>

      <IframeContainer onClick={() => setIsOpen(true)}>
        <NonInteractiveIframe {...iframeAttribs} $height={height} />
        <ExpandOverlay className="expand-overlay" aria-hidden>
          <CenterExpandButton>
            <ArrowsFullscreen size={20} aria-hidden />
            {t('expand-embed')}
          </CenterExpandButton>
          <ClickToInteractText>{t('click-to-interact-embed')}</ClickToInteractText>
        </ExpandOverlay>
      </IframeContainer>

      <StyledDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="xl"
        fullWidth
        slotProps={{ paper: { sx: { height: '90vh' } } }}
      >
        <DialogHeaderBar>
          <CloseButton onClick={() => setIsOpen(false)} aria-label={t('close')}>
            <X size={32} />
          </CloseButton>
        </DialogHeaderBar>
        <DialogIframe {...iframeAttribs} />
      </StyledDialog>
    </EmbedWrapper>
  );
}
