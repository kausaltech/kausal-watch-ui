'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import dayjs from '@/common/dayjs';
import Icon from '@/components/common/Icon';

export type EntityType = 'action' | 'indicator' | 'page';

export type ChangeHistoryEntry = {
  updatedAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  content: string;
};

type ChangeHistoryProps = {
  entityType: EntityType;
  entityId: string;
  entry?: ChangeHistoryEntry | null;
};

const Wrapper = styled.div`
  margin-top: ${(props) => props.theme.spaces.s100};
  padding: ${(props) => props.theme.spaces.s150};
  border-radius: ${(props) => props.theme.cardBorderRadius};

  color: ${(props) => props.theme.themeColors.dark};
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const UpdatedText = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-weight: 500;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.spaces.s050};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s100};
`;

const Avatar = styled.div<{ $url?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.graphColors.grey020};
  ${(props) => props.$url && `background-image: url(${props.$url});`}
`;

const AuthorName = styled.div`
  font-weight: 500;
`;

const ViewChangesButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  color: ${(props) => props.theme.brandDark};
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spaces.s150};
  right: ${(props) => props.theme.spaces.s200};
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
`;

const DialogHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const Dialog = styled.div`
  position: relative;
  max-width: 720px;
  width: 100%;
  margin: 0 ${(props) => props.theme.spaces.s200};
  background: ${(props) => props.theme.cardBackground.primary ?? '#fff'};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  padding: ${(props) => props.theme.spaces.s300};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ChangesTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizeLg};
  margin: 0 0 ${(props) => props.theme.spaces.s150};
`;

const ChangesLabel = styled.div`
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const ChangesText = styled.p`
  margin: 0 0 ${(props) => props.theme.spaces.s200};
  line-height: 1.5;
`;

const ModalFooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s150};
  margin-top: ${(props) => props.theme.spaces.s150};
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const FooterMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s050};
`;

const ChangeHistory: React.FC<ChangeHistoryProps> = ({ entityType, entityId, entry }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  if (!entry) return null;

  const formattedDate = dayjs(entry.updatedAt).format('L');

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Wrapper>
        <UpdatedText>
          {t('change-history.information-updated', { date: formattedDate })}
        </UpdatedText>
        <Row>
          <AuthorInfo>
            <Avatar $url={entry.createdBy.avatarUrl} />
            <AuthorName>
              {entry.createdBy.firstName} {entry.createdBy.lastName}
            </AuthorName>
          </AuthorInfo>
          <ViewChangesButton type="button" onClick={open}>
            {t('change-history.view-changes')}
          </ViewChangesButton>
        </Row>
      </Wrapper>
      <Overlay
        $open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t('change-history.modal-title')}
        onClick={close}
      >
        <Dialog onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <ChangesTitle>{t('change-history.modal-title')}</ChangesTitle>
            <CloseButton
              type="button"
              onClick={close}
              aria-label={t('close', { default: 'Close' })}
            >
              <Icon.Times />
            </CloseButton>
          </DialogHeader>
          <ChangesLabel>{t('change-history.description-label')}</ChangesLabel>
          <ChangesText>{entry.content}</ChangesText>
          <ModalFooterRow>
            <Avatar $url={entry.createdBy.avatarUrl} />
            <FooterMeta>
              <span>
                {entry.createdBy.firstName} {entry.createdBy.lastName}
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
            </FooterMeta>
          </ModalFooterRow>
        </Dialog>
      </Overlay>
    </>
  );
};

export default ChangeHistory;
