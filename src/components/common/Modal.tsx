import React, { ReactNode, useEffect, useRef } from 'react';

import Icon from 'components/common/Icon';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBody = styled.div`
  position: fixed;
  background-color: white;
  border-radius: 10px;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
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
  helpText: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, header, helpText, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const closeModalOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);
  return (
    <>
      {isOpen && (
        <ModalOverlay data-testid="modal-overlay" onClick={closeModalOnOverlayClick}>
          <ModalBody ref={modalRef}>
            <ModalHeader>{header}</ModalHeader>
            <ModalSubHeader>{helpText}</ModalSubHeader>
            <CloseButton
              data-testid="close-button"
              aria-label={t('close')}
              onClick={() => onClose()}
            >
              <Icon.Times />
            </CloseButton>
            {children}
          </ModalBody>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
