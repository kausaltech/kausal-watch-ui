import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Icon from "components/common/Icon";
import { useTheme } from "common/theme";

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
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Modal = (props) => {
  const { isOpen, onClose, header, helpText, children } = props;
  const theme = useTheme();
  const modalRef = useRef();
  const closeModalOnOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const closeOnEscape = (e) => {
      console.log(isOpen);
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);
  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={closeModalOnOverlayClick}>
          <ModalBody ref={modalRef}>
            <ModalHeader theme={theme}>{header}</ModalHeader>
            <ModalSubHeader theme={theme}>{helpText}</ModalSubHeader>
            <CloseButton onClick={() => onClose()}>
              <Icon name="times" />
            </CloseButton>
            {children}
          </ModalBody>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
