'use client';

import { useState } from 'react';

import { Divider, Menu, MenuItem } from '@mui/material';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import { usePrependPlanAndLocale } from '@/common/links';
import Icon from '@/components/common/Icon';
import { PLEDGE_PATH } from '@/constants/routes';

import { usePledgeNavUser } from './use-pledge-auth';

const StyledNavItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;

const StyledTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
  color: ${({ theme }) => theme.brandNavColor};
  font-size: ${({ theme }) => theme.fontSizeSm};
  padding: 0 ${({ theme }) => theme.spaces.s050};
  background: none;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.brandNavColor};
    opacity: 0.8;
  }
`;

const StyledEmailToggleSpan = styled.span`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    display: inline;
  }
`;

const StyledEmailLabel = styled.div`
  padding: ${({ theme }) => theme.spaces.s100} ${({ theme }) => theme.spaces.s150};
  font-size: ${({ theme }) => theme.fontSizeSm};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: ${({ theme }) => theme.textColor.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.graphColors.grey020};
  margin-bottom: ${({ theme }) => theme.spaces.s025};
  word-break: break-all;

  @media (min-width: ${({ theme }) => theme.breakpointMd}) {
    display: none;
  }
`;

const StyledMenuLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => theme.spaces.s100} ${({ theme }) => theme.spaces.s150};
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.primary};
  text-decoration: none;
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.textColor.primary};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => theme.spaces.s100} ${({ theme }) => theme.spaces.s150} !important;
  font-size: ${({ theme }) => theme.fontSizeSm} !important;
  color: ${({ theme }) => theme.textColor.primary};
`;

function PledgeNavUser({ className }: { className?: string }) {
  const t = useTranslations();
  const { userEmail, isAuthenticated, signOut } = usePledgeNavUser();
  const myPledgesLink = `${usePrependPlanAndLocale(PLEDGE_PATH)}?view=my-pledges`;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (!isAuthenticated || !userEmail) return null;

  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <StyledNavItem className={className}>
      <StyledTriggerButton
        onClick={handleOpen}
        aria-label={t('pledge-nav-user-menu-label')}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon name="user" width="20px" height="20px" />
        <StyledEmailToggleSpan>{userEmail}</StyledEmailToggleSpan>
        <Icon name="caret-down" width="12px" height="12px" />
      </StyledTriggerButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <StyledEmailLabel>{userEmail}</StyledEmailLabel>
        <MenuItem disableGutters>
          <StyledMenuLink href={myPledgesLink} onClick={handleClose}>
            <Icon name="award" width="16px" height="16px" />
            {t('pledge-nav-my-pledges')}
          </StyledMenuLink>
        </MenuItem>
        <Divider />
        <StyledMenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
        >
          <Icon name="arrow-right" width="16px" height="16px" />
          {t('pledge-nav-sign-out')}
        </StyledMenuItem>
      </Menu>
    </StyledNavItem>
  );
}

export default PledgeNavUser;
