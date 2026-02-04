import React, { ReactNode, useState } from 'react';

import { useTranslations } from 'next-intl';
import { Button, Table } from 'reactstrap';
import styled from 'styled-components';

import { PlanContextFragment } from '@/common/__generated__/graphql';
import { actionStatusOrder } from '@/common/data/actions';
import Icon from '@/components/common/Icon';
import ActionTableRow from '@/components/dashboard/ActionTableRow';

import ActionStatusExport from './ActionStatusExport';
import { COLUMN_CONFIG } from './dashboard.constants';
import { ActionListAction, ActionListOrganization, ColumnConfig } from './dashboard.types';

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;

  padding: 0 0 ${(props) => props.theme.spaces.s100} 0;
  background-image:
    linear-gradient(to right, white, white), linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
  background-position:
    left center,
    right center,
    left center,
    right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size:
    20px 100%,
    20px 100%,
    10px 100%,
    10px 100%;
  background-attachment: local, local, scroll, scroll;
`;

const DashTable = styled(Table)`
  margin-bottom: ${(props) => props.theme.spaces.s600};
  margin-top: ${(props) => props.theme.spaces.s100};
  line-height: ${(props) => props.theme.lineHeightMd};

  .logo-column {
    width: 2rem;
  }
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const ResetSorting = styled.div``;

const StyledTableHeader = styled.th`
  cursor: pointer;
`;

const HeaderContentWrapper = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-decoration: ${(props) => (props.$selected ? 'underline' : null)};
  align-items: flex-end;
`;

const TableSortingIcon = styled(Icon)<{ $selected: boolean }>`
  width: 0.8em;
  height: 0.8em;
  opacity: ${(props) => (props.$selected ? 1 : 0.3)};
`;

function isChildOrg(childOrg, parentOrg) {
  function makeTree(org) {
    const ids: string[] = [];
    while (org) {
      ids.push(org.id);
      org = org.parent;
    }
    return ids;
  }
  const childTree = makeTree(childOrg);
  const parentTree = [parentOrg.id];
  return childTree.some((id) => parentTree.indexOf(id) >= 0);
}

class AttributeType {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

interface Sort {
  key: keyof ActionListAction | AttributeType | null;
  direction: number;
}

const isAttributeTypeKey = (key: Sort['key']): key is AttributeType => key instanceof AttributeType;

const isSameSortKey = (a: Sort['key'], b: Sort['key']) => {
  if (a === b) return true;
  if (a instanceof AttributeType && b instanceof AttributeType) return a.id === b.id;
  return false;
};

interface SortableTableHeaderProps {
  children: ReactNode;
  headerKey: Sort['key'];
  onClick: React.MouseEventHandler;
  sort: Sort;
  className?: string;
}

const SortableTableHeader = ({
  children,
  headerKey,
  sort,
  onClick,
  className,
}: SortableTableHeaderProps) => {
  const selected = isSameSortKey(sort.key, headerKey);
  const iconName = selected ? ((sort.direction ?? 1) === 1 ? 'sortDown' : 'sortUp') : 'sort';

  return (
    <StyledTableHeader
      onClick={onClick}
      scope="col"
      aria-sort={selected ? (sort.direction === 1 ? 'ascending' : 'descending') : 'none'}
      className={className}
    >
      <HeaderContentWrapper $selected={selected}>
        <div>{children}</div>
        <TableSortingIcon name={iconName} $selected={selected} aria-hidden="true" />
      </HeaderContentWrapper>
    </StyledTableHeader>
  );
};

const getAttributeComparableValue = (action: ActionListAction, attributeTypeId: string) => {
  const attr = action.attributes?.find(
    (a) => a.type?.id === attributeTypeId && a.__typename === 'AttributeNumericValue'
  );
  if (!attr) return null;

  const n = attr.numericValue;
  if (typeof n === 'number') return n;
  if (n == null) return null;
  const parsed = Number(n);
  return Number.isFinite(parsed) ? parsed : null;
};

const preprocessForSorting = (
  sortKey: Sort['key'],
  items: [ActionListAction, ActionListAction],
  hasImplementationPhases: boolean
) => {
  // Custom field sorting
  if (isAttributeTypeKey(sortKey)) {
    return items.map((item) => getAttributeComparableValue(item, sortKey.id));
  }
  if (sortKey == null) {
    return [null, null];
  }

  const values = items.map((item) => item[sortKey]);

  switch (sortKey) {
    case 'updatedAt': {
      const [x, y] = values;
      return [y, x];
    }
    case 'implementationPhase':
      return hasImplementationPhases
        ? items.map((item) => item.implementationPhase?.order)
        : items.map((item) => actionStatusOrder(item.status));
    default:
      return values;
  }
};

interface Props {
  actions: ActionListAction[];
  orgs: ActionListOrganization[];
  columns: ColumnConfig[];
  plan: PlanContextFragment;
  enableExport?: boolean;
  planViewUrl?: string | null;
  hasRelatedPlans?: boolean;
}

const ActionStatusTable = (props: Props) => {
  const {
    actions,
    orgs,
    columns,
    plan,
    enableExport = true,
    planViewUrl,
    hasRelatedPlans = false,
  } = props;

  const orgMap = new Map(orgs.map((org) => [org.id, org]));

  const [sort, setSort] = useState<Sort>({ key: null, direction: 1 });

  const hasImplementationPhases = plan.actionImplementationPhases.length > 0;

  const comparator = (g1: ActionListAction, g2: ActionListAction) => {
    if (!sort.key) {
      return 0;
    }

    const [v1, v2] = preprocessForSorting(sort.key, [g1, g2], hasImplementationPhases);

    const val = v1 == v2 ? 0 : v1 == null || v2 > v1 ? -1 : 1;

    return sort.direction === 1 ? val : -val;
  };

  const sortedActions = [...actions].sort(comparator);

  const sortHandler = (key: Sort['key']) => () => {
    let direction = 1;

    if (isSameSortKey(key, sort.key)) {
      direction -= sort.direction;
    }

    setSort({ key, direction });
  };

  const t = useTranslations();

  /**
   * All columns except action identifier are controlled by the column configuration
   * in the Admin UI. Filter out the identifier column if disabled in the plan.
   */
  const filteredColumns = !plan.features.hasActionIdentifiers
    ? [...columns.filter((column) => column.__typename !== 'IdentifierColumnBlock')]
    : [...columns];

  // In multiplan situation we add column for the plan name
  if (hasRelatedPlans) {
    filteredColumns.unshift({
      __typename: 'PlanColumnBlock',
      columnLabel: '',
    });
  }
  return (
    <>
      <ToolBar>
        <ResetSorting>
          {sort.key && (
            <Button outline size="sm" color="primary" onClick={sortHandler(null)}>
              {t('default-sorting')}
            </Button>
          )}
        </ResetSorting>
        {enableExport && <ActionStatusExport actions={actions} />}
      </ToolBar>
      <TableWrapper>
        <DashTable aria-rowcount={sortedActions.length}>
          <thead>
            <tr>
              {filteredColumns.map((column, i) => {
                const columnConfig = COLUMN_CONFIG[column.__typename];

                if (!columnConfig) {
                  return null;
                }

                const headerLabel = column.columnLabel || column?.attributeType?.name;
                const isFieldColumn =
                  column.__typename === 'FieldColumnBlock' && !!column.attributeType?.id;
                const isNumericFieldColumn =
                  isFieldColumn &&
                  typeof column.attributeType?.format === 'string' &&
                  column.attributeType.format.toUpperCase().includes('NUMERIC');
                const headerKey: Sort['key'] = isNumericFieldColumn
                  ? new AttributeType(column.attributeType!.id)
                  : columnConfig.headerKey;
                // apply sorting only for numeric custom fields
                const isSortable =
                  isNumericFieldColumn || (columnConfig.sortable && columnConfig.headerKey);
                if (isSortable && headerKey) {
                  return (
                    <SortableTableHeader
                      key={i}
                      sort={sort}
                      headerKey={headerKey}
                      onClick={sortHandler(headerKey)}
                      className={columnConfig.headerClassName}
                    >
                      {columnConfig.renderHeader(t, plan, headerLabel)}
                    </SortableTableHeader>
                  );
                }

                return (
                  <th key={i} scope="col" className={columnConfig.headerClassName}>
                    {columnConfig.renderHeader(t, plan, headerLabel)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedActions.map((item) => (
              <ActionTableRow
                columns={filteredColumns}
                action={item}
                key={item.id}
                planViewUrl={planViewUrl}
                plan={plan}
              />
            ))}
          </tbody>
        </DashTable>
      </TableWrapper>
    </>
  );
};

export default ActionStatusTable;
