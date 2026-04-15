'use client';

import { useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Chip, Collapse, InputAdornment, TextField } from '@mui/material';
import { debounce } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { Search } from 'react-bootstrap-icons';
import { Button, ButtonGroup, Container } from 'reactstrap';

import type { GetPledgesQuery } from '@/common/__generated__/graphql';
import FilterControl, { type FilterField } from '@/components/common/FilterControl';
import Icon from '@/components/common/Icon';
import { getDefaultFormFields } from '@/utils/pledge.utils';

import { getAttributeValueText } from '../common/ActionAttribute';
import ConfirmPledge from './ConfirmPledge';
import PledgeCard, { type PledgeCategory } from './PledgeCard';
import { usePledgeUser } from './use-pledge-user';

export type Pledge = NonNullable<
  NonNullable<NonNullable<GetPledgesQuery['plan']>['pledges']>[number]
>;

type Props = {
  pledges: Pledge[];
};

function filterByOwnPledges(pledges: Pledge[], committedSlugs: Set<string>): Pledge[] {
  return pledges.filter((pledge) => committedSlugs.has(pledge.slug));
}

function filterBySearch(pledges: Pledge[], searchQuery: string): Pledge[] {
  const lowerQuery = searchQuery.toLowerCase();

  if (!lowerQuery) {
    return pledges;
  }

  return pledges.filter(
    (pledge) =>
      pledge.name.toLowerCase().includes(lowerQuery) ||
      (pledge.description ?? '').toLowerCase().includes(lowerQuery)
  );
}

function filterByAttributes(pledges: Pledge[], activeFilters: Record<string, string[]>): Pledge[] {
  let filtered = pledges;

  Object.entries(activeFilters).forEach(([fieldId, selectedValues]) => {
    if (selectedValues.length === 0) {
      return;
    }

    filtered = filtered.filter((pledge) =>
      pledge.attributes.some((attribute) => {
        if (attribute.__typename !== 'AttributeChoice' || attribute.type.id !== fieldId) {
          return false;
        }

        return selectedValues.some((selected) => attribute.choice?.identifier === selected);
      })
    );
  });

  return filtered;
}

/**
 * Wrapper to allow child sections to stretch outside of the parent containers gutters
 * with ::before pseudo elements.
 */
const StyledPageWrapper = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spaces.s200};
`;

const StyledRadioButton = styled(Button)`
  &.btn:focus-visible:not(.active) {
    color: var(--bs-btn-color);
    background-color: var(--bs-btn-bg);
  }
`;

const StyledToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spaces.s200};
  align-items: stretch;
`;

const StyledToolbarLeft = styled.div`
  flex-shrink: 0;
`;

const StyledToolbarRight = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spaces.s100};
  flex: 1;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpointSm}) {
    flex-basis: 100%;
  }
`;

const StyledActiveFiltersRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spaces.s100};
  margin-bottom: ${({ theme }) => theme.spaces.s150};
  padding-bottom: ${({ theme }) => theme.spaces.s150};
  border-bottom: 1px solid ${({ theme }) => theme.graphColors.grey020};
`;

const StyledFilterCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-right: ${({ theme }) => theme.spaces.s050};
`;

const StyledPledgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spaces.s200};
  align-items: stretch;
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spaces.s300} ${({ theme }) => theme.spaces.s200};
  background: ${({ theme }) => theme.graphColors.grey010};
  position: relative;

  // Stretch the background outside of the parent container gutters... it looks better
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background: ${({ theme }) => theme.graphColors.grey010};
    width: 100vw;
    z-index: -1;
  }
`;

const StyledEmptyIconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spaces.s200};
  color: ${({ theme }) => theme.brandDark};
`;

const StyledEmptyHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin-bottom: ${({ theme }) => theme.spaces.s100};
  max-width: 500px;
`;

const StyledEmptySubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledEmptyCardWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spaces.s200};
`;

const StyledBrowseAllButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.linkColor};
  }
`;

// Ensure the height of the search bar matches the other filter buttons
const StyledTextField = styled(TextField)`
  flex: 1;

  .MuiInputBase-root {
    height: 100%;
  }

  .MuiInputBase-input {
    height: 100%;
  }
`;

type ViewType = 'ALL' | 'MY_PLEDGES';

type Attribute = {
  id: string;
  label: string;
  options: { id: string; label: string }[];
};

// Takes all pledges and figures out the available filters based on their attributes
function getFiltersFromPledgeAttributes(pledges: Pledge[]): Attribute[] {
  const attributeMap = new Map<string, Attribute>();

  for (const pledge of pledges) {
    for (const attribute of pledge.attributes) {
      if (!attributeMap.has(attribute.type.id)) {
        attributeMap.set(attribute.type.id, {
          id: attribute.type.id,
          label: attribute.type.name,
          options: attribute.type.choiceOptions.map((option) => ({
            id: option.identifier,
            label: option.name,
          })),
        });
      }
    }
  }

  return Array.from(attributeMap.values());
}

function PledgeList({ pledges }: Props) {
  const [view, setView] = useState<ViewType>('ALL');
  const [showConfirmDrawer, setShowConfirmDrawer] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  // Search input is uncontrolled, store it in a ref for clearing
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filterFields: FilterField[] = useMemo(
    () => getFiltersFromPledgeAttributes(pledges),
    [pledges]
  );

  const handleSearchChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), 600),
    []
  );

  const t = useTranslations();
  const {
    userData,
    committedSlugs,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
  } = usePledgeUser();

  const handleCommitClick = (pledge: Pledge, isCurrentlyCommitted: boolean) => {
    if (isCurrentlyCommitted) {
      uncommitFromPledge(pledge.id);
    } else {
      setSelectedPledge(pledge);
      setShowConfirmDrawer(true);
    }
  };

  const handleConfirmPledge = async (formData: Record<string, string>) => {
    if (selectedPledge) {
      await commitToPledge(selectedPledge.id, formData);
    }
  };

  const handleCloseDrawer = () => {
    setShowConfirmDrawer(false);
    setSelectedPledge(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');

    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const viewFiltered =
    view === 'MY_PLEDGES' ? filterByOwnPledges(pledges, committedSlugs) : pledges;
  const searchFiltered = filterBySearch(viewFiltered, searchQuery);
  const filteredPledges = filterByAttributes(searchFiltered, activeFilters);

  const activeFilterChips = filterFields.flatMap((field) =>
    (activeFilters[field.id] ?? []).map((value) => ({
      fieldId: field.id,
      fieldLabel: field.label,
      value: {
        id: value,
        label: field.options.find((option) => option.id === value)?.label ?? value,
      },
    }))
  );

  const mostCommitted = pledges.reduce(
    (mostCommittedPledge: null | Pledge, pledge) =>
      pledge.commitmentCount > (mostCommittedPledge?.commitmentCount ?? 0)
        ? pledge
        : mostCommittedPledge,
    null
  );

  /**
   * Arrow keys toggle between options per WAI-ARIA radio group pattern.
   * With only two options, the wrapping behaviour of start/end options
   * means any arrow key switches to the other option.
   * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
   */
  function handleMyPledgesKeyDown(e: React.KeyboardEvent) {
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowDown'
    ) {
      e.preventDefault();

      if (view === 'ALL') {
        setView('MY_PLEDGES');
      } else {
        setView('ALL');
      }
    }
  }

  return (
    <StyledPageWrapper>
      <StyledContainer>
        <StyledToolbarContainer>
          <StyledToolbarLeft>
            <ButtonGroup
              size="small"
              role="radiogroup"
              aria-label={t('pledge-list-view-toggle')}
              onKeyDown={handleMyPledgesKeyDown}
            >
              <StyledRadioButton
                color="black"
                size="small"
                outline
                onClick={() => setView('ALL')}
                active={view === 'ALL'}
                aria-checked={view === 'ALL'}
                role="radio"
                tabIndex={view === 'ALL' ? 0 : -1}
              >
                {t('pledge-list-all')}
              </StyledRadioButton>
              <StyledRadioButton
                color="black"
                size="small"
                outline
                onClick={() => setView('MY_PLEDGES')}
                active={view === 'MY_PLEDGES'}
                aria-checked={view === 'MY_PLEDGES'}
                role="radio"
                tabIndex={view === 'MY_PLEDGES' ? 0 : -1}
              >
                {t('pledge-list-mine')}
              </StyledRadioButton>
            </ButtonGroup>
          </StyledToolbarLeft>

          <StyledToolbarRight>
            <StyledTextField
              inputRef={searchInputRef}
              hiddenLabel
              type="search"
              aria-label={t('search')}
              variant="outlined"
              placeholder={t('search')}
              size="small"
              onChange={handleSearchChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {filterFields.length > 0 && (
              <FilterControl
                fields={filterFields}
                activeFilters={activeFilters}
                onChange={(fieldId, values) =>
                  setActiveFilters((prev) => ({ ...prev, [fieldId]: values }))
                }
              />
            )}
          </StyledToolbarRight>
        </StyledToolbarContainer>

        <Collapse in={!!searchQuery || activeFilterChips.length > 0} mountOnEnter unmountOnExit>
          <StyledActiveFiltersRow>
            <StyledFilterCount>
              {t('pledge-list-filtered-count', { count: filteredPledges.length })}
            </StyledFilterCount>

            {!!searchQuery && <Chip label={searchQuery.trim()} onDelete={handleClearSearch} />}

            {activeFilterChips.map(({ fieldId, fieldLabel, value }) => (
              <Chip
                key={`${fieldId}-${value.id}`}
                label={
                  <>
                    {!!fieldLabel && <>{fieldLabel}: </>}
                    <strong>{value.label}</strong>
                  </>
                }
                onDelete={() =>
                  setActiveFilters((prev) => ({
                    ...prev,
                    [fieldId]: (prev[fieldId] ?? []).filter((id) => id !== value.id),
                  }))
                }
              />
            ))}
          </StyledActiveFiltersRow>
        </Collapse>

        {filteredPledges.length > 0 && (
          <StyledPledgeGrid>
            {filteredPledges.map((pledge) => (
              <PledgeCard
                key={pledge.slug}
                title={pledge.name}
                description={pledge.description}
                categories={pledge.attributes
                  .map((attribute) => ({
                    // TODO: Add icon when supported by the backend
                    label: getAttributeValueText(attribute),
                  }))
                  .filter((category): category is PledgeCategory => !!category.label)}
                slug={pledge.slug}
                image={pledge.image?.large?.src ?? pledge.image?.full?.src}
                imageAlt={pledge.image?.altText ?? pledge.name}
                isCommitted={committedSlugs.has(pledge.slug)}
                committedCount={pledge.commitmentCount + getCommitmentCountAdjustment(pledge.slug)}
                onCommitClick={(isCommitted) => handleCommitClick(pledge, isCommitted)}
                isMostCommitted={pledge.id === mostCommitted?.id}
              />
            ))}
          </StyledPledgeGrid>
        )}

        {view === 'MY_PLEDGES' && viewFiltered.length === 0 && pledges.length > 0 && (
          <StyledEmptyState>
            <StyledEmptyIconWrapper>
              <Icon name="globe" width="48px" height="48px" />
            </StyledEmptyIconWrapper>
            <StyledEmptyHeading>{t('pledge-empty-heading')}</StyledEmptyHeading>
            <StyledEmptySubtext>{t('pledge-empty-subtext')}</StyledEmptySubtext>
            <StyledEmptyCardWrapper>
              <PledgeCard
                layout="mini"
                title={pledges[0].name}
                slug={pledges[0].slug}
                image={pledges[0].image?.large?.src ?? pledges[0].image?.full?.src}
                imageAlt={pledges[0].image?.altText ?? pledges[0].name}
                committedCount={
                  pledges[0].commitmentCount + getCommitmentCountAdjustment(pledges[0].slug)
                }
                isCommitted={false}
                onCommitClick={() => handleCommitClick(pledges[0], false)}
              />
            </StyledEmptyCardWrapper>
            <StyledBrowseAllButton onClick={() => setView('ALL')}>
              {t('pledge-empty-browse-all')}
            </StyledBrowseAllButton>
          </StyledEmptyState>
        )}

        {selectedPledge && (
          <ConfirmPledge
            isOpen={showConfirmDrawer}
            onClose={handleCloseDrawer}
            onConfirm={handleConfirmPledge}
            pledgeName={selectedPledge.name}
            pledgeSlug={selectedPledge.slug}
            pledgeImage={selectedPledge.image?.rendition?.src ?? null}
            commitmentCount={selectedPledge.commitmentCount}
            formFields={getDefaultFormFields(t)}
            userData={userData}
          />
        )}
      </StyledContainer>
    </StyledPageWrapper>
  );
}

export default PledgeList;
