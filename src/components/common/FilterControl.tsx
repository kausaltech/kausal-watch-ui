'use client';

import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import { Filter } from 'react-bootstrap-icons';

import { transientOptions } from '@common/themes/styles/styled';

import Button from '@/components/common/Button';

export type FilterOption = {
  id: string;
  label: string;
};

export type FilterField = {
  id: string;
  label: string;
  options: FilterOption[];
};

type FilterControlProps = {
  fields: FilterField[];
  activeFilters: Record<string, string[]>;
  onChange: (fieldId: string, values: string[]) => void;
};

const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    border-radius: ${(props) => props.theme.cardBorderRadius};
  }
`;

const StyledFilterButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s050};
`;

const StyledActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 ${(props) => props.theme.spaces.s025};
  background: ${(props) => props.theme.brandDark};
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: 1;
`;

const StyledPanelWrapper = styled.div`
  min-width: 480px;
  background: ${(props) => props.theme.themeColors.white};
`;

const StyledPanelBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFieldList = styled.ul`
  flex-shrink: 0;
  min-width: 160px;
  max-height: 320px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  border-right: 1px solid ${(props) => props.theme.graphColors.grey020};
`;

const StyledFieldItem = styled.li`
  list-style: none;
`;

const StyledFieldButton = styled('button', transientOptions)<{
  $isSelected: boolean;
  $hasActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => `${props.theme.spaces.s050} ${props.theme.spaces.s100}`};
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizeBase};
  background: ${(props) => (props.$isSelected ? props.theme.brandDark : 'transparent')};
  color: ${(props) =>
    props.$isSelected
      ? readableColor(
          props.theme.brandDark,
          props.theme.themeColors.black,
          props.theme.themeColors.white
        )
      : 'inherit'};

  &:hover {
    background: ${(props) =>
      props.$isSelected ? props.theme.brandDark : props.theme.themeColors.light};
  }
`;

const StyledActiveDot = styled('span', transientOptions)<{ $isOnSelected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(props) =>
    props.$isOnSelected ? props.theme.themeColors.white : props.theme.brandDark};
`;

const StyledOptionPanel = styled.div`
  flex: 1;
  max-height: 320px;
  overflow-y: auto;
  padding: ${(props) => props.theme.spaces.s050};
`;

const StyledOptionList = styled.ul`
  margin: 0;
  padding: 0;
`;

const StyledOptionItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s050};
  padding: ${(props) => props.theme.spaces.s050};
  list-style: none;
  cursor: pointer;

  label {
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizeBase};
    margin: 0;
  }

  input[type='checkbox'] {
    flex-shrink: 0;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    accent-color: ${(props) => props.theme.brandDark};
  }
`;

const StyledPanelFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => `${props.theme.spaces.s050} ${props.theme.spaces.s100}`};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey020};
`;

const StyledClearButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  color: ${(props) => props.theme.brandDark};
  font-size: ${(props) => props.theme.fontSizeSm};
  cursor: pointer;
  text-decoration: none;

  &:disabled {
    color: ${(props) => props.theme.graphColors.grey030};
    cursor: initial;
  }

  &:hover:not(:disabled) {
    color: ${(props) => props.theme.linkColor};
  }
`;

function FilterControl({ fields, activeFilters, onChange }: FilterControlProps) {
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    if (!selectedFieldId && fields.length > 0) {
      setSelectedFieldId(fields[0].id);
    }
  };

  const handleClose = () => setAnchorEl(null);

  const activeFilterCount = Object.values(activeFilters).reduce((sum, ids) => sum + ids.length, 0);

  const handleOptionToggle = (fieldId: string, optionId: string) => {
    const current = activeFilters[fieldId] ?? [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];

    onChange(fieldId, next);
  };

  const handleClearAll = () => fields.forEach((field) => onChange(field.id, []));

  const handleClearField = () => {
    if (selectedFieldId) {
      onChange(selectedFieldId, []);
    }
  };

  const selectedField = fields.find((field) => field.id === selectedFieldId) ?? null;
  const selectedFieldActiveCount = (activeFilters[selectedFieldId ?? ''] ?? []).length;

  return (
    <>
      <StyledFilterButton
        active={isOpen}
        outline
        color="primary"
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Filter size={16} />
        {t('actions-filter-by')}
        {activeFilterCount > 0 && <StyledActiveBadge>{activeFilterCount}</StyledActiveBadge>}
      </StyledFilterButton>

      <StyledPopover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { elevation: 3 } }}
      >
        <StyledPanelWrapper>
          <StyledPanelBody>
            <StyledFieldList aria-label={t('actions-filter-by')}>
              {fields.map((field) => {
                const hasActive = (activeFilters[field.id]?.length ?? 0) > 0;
                const isSelected = field.id === selectedFieldId;

                return (
                  <StyledFieldItem key={field.id}>
                    <StyledFieldButton
                      type="button"
                      $isSelected={isSelected}
                      $hasActive={hasActive}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedFieldId(field.id)}
                    >
                      {field.label}
                      {hasActive && <StyledActiveDot $isOnSelected={isSelected} aria-hidden />}
                    </StyledFieldButton>
                  </StyledFieldItem>
                );
              })}
            </StyledFieldList>

            <StyledOptionPanel>
              <StyledOptionList>
                {selectedField?.options.map((option) => {
                  // Shouldn't ever be null but check this for types
                  if (!selectedFieldId) {
                    return null;
                  }

                  const id = `filter-${selectedFieldId}-${option.id}`;
                  const isChecked = (activeFilters[selectedFieldId] ?? []).includes(option.id);

                  return (
                    <StyledOptionItem key={option.id}>
                      <input
                        id={id}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleOptionToggle(selectedFieldId, option.id)}
                      />
                      <label htmlFor={id}>{option.label}</label>
                    </StyledOptionItem>
                  );
                })}
              </StyledOptionList>
            </StyledOptionPanel>
          </StyledPanelBody>

          <StyledPanelFooter>
            <StyledClearButton onClick={handleClearAll} disabled={activeFilterCount === 0}>
              {t('filter-clear-all')}
            </StyledClearButton>
            <StyledClearButton onClick={handleClearField} disabled={selectedFieldActiveCount === 0}>
              {t('filter-clear')}
            </StyledClearButton>
          </StyledPanelFooter>
        </StyledPanelWrapper>
      </StyledPopover>
    </>
  );
}

export default FilterControl;
