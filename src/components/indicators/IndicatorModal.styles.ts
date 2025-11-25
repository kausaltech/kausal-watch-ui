import { Button as AriaButton, Dialog, Modal, ModalOverlay } from 'react-aria-components';
import styled from 'styled-components';

export const AriaModalOverlay = styled(ModalOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0 0 0 / 0.5);
  z-index: 750;

  &[data-entering] {
    animation: modal-fade 200ms;
  }

  &[data-exiting] {
    animation: modal-fade 150ms reverse ease-in;
  }
`;

export const AriaModal = styled(Modal)`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  width: calc(100vw - 40px);
  max-width: 720px;
  height: calc(var(--visual-viewport-height) - 100px);
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
  border-radius: 6px;
  background: var(--overlay-background);
  color: var(--text-color);
  outline: none;

  &[data-entering] {
    animation: modal-zoom 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .react-aria-TextField {
    margin-bottom: 8px;
  }
`;

export const AriaDialog = styled(Dialog)`
  background-color: #eeeeee;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

export const ModalNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spaces.s050};
  flex: 0 0 auto;
  border-top: 1px solid ${({ theme }) => theme.cardBackground.secondary};
  background-color: ${({ theme }) => theme.themeColors.white};
`;

export const IndicatorCounter = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;
