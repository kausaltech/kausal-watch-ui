import Dialog from '@mui/material/Dialog';

import styled from '@emotion/styled';

export const StyledDialog = styled(Dialog)`
  z-index: 750;

  .MuiBackdrop-root {
    background: rgba(0 0 0 / 0.5);
  }

  .MuiDialog-paper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
    width: calc(100vw - 40px);
    max-width: 720px;
    height: calc(100dvh - 100px);
    max-height: calc(100dvh - 100px);
    box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
    border-radius: 6px;
    background-color: #eeeeee;
  }
`;

export const ModalNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spaces.s050};
  flex: 0 0 auto;
  border-top: 1px solid ${({ theme }) => theme.cardBackground.secondary};
  background-color: ${({ theme }) => theme.themeColors.white};

  @media print {
    display: none;
  }
`;

export const IndicatorCounter = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;
