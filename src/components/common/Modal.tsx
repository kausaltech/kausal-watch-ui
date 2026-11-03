import { type ReactNode, useId } from 'react';

import Dialog from '@mui/material/Dialog';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import Icon from '@/components/common/Icon';

const ModalBody = styled.div`
  padding: 30px;
  box-sizing: border-box;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: ${(props) => props.theme.spaces.s300} ${(props) => props.theme.spaces.s200};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;

  @media print {
    display: none;
  }
`;

const ModalHeader = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const ModalSubHeader = styled.p`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  helpText?: string;
  children: ReactNode;
}

/** MUI Dialog: moves focus in, keeps it there, returns it on close and hides the page */
const Modal = ({ isOpen, onClose, header, helpText, children }: ModalProps) => {
  const t = useTranslations();
  const headerId = useId();
  const helpTextId = useId();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      aria-labelledby={headerId}
      aria-describedby={helpText ? helpTextId : undefined}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } },
        paper: {
          sx: {
            m: '1rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100% - 2rem)',
            borderRadius: '10px',
            backgroundColor: 'white',
          },
        },
      }}
    >
      <ModalBody>
        <ModalHeader id={headerId}>{header}</ModalHeader>
        {!!helpText && <ModalSubHeader id={helpTextId}>{helpText}</ModalSubHeader>}
        <CloseButton data-testid="close-button" aria-label={t('close')} onClick={onClose}>
          {/* As in the indicator modal */}
          <Icon.Times width="32px" height="32px" />
        </CloseButton>
        {children}
      </ModalBody>
    </Dialog>
  );
};

export default Modal;
