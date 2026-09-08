import { screen } from '@testing-library/react';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import { render } from '@/tests/test-utils';

import { COLUMN_CONFIG } from '../dashboard.constants';
import type { ActionListAction, ColumnConfig } from '../dashboard.types';

/*
 * The action list query selects a slimmed-down attribute type (no choiceOptions,
 * showChoiceNames or hasZeroOption); the choice metadata only arrives with the
 * column's own attributeType.
 */
const SLIM_ATTRIBUTE_TYPE = {
  __typename: 'AttributeType' as const,
  id: '1',
  identifier: 'progress',
  name: 'Progress',
  format: 'ORDERED_CHOICE',
};

const COLUMN_ATTRIBUTE_TYPE = {
  ...SLIM_ATTRIBUTE_TYPE,
  helpText: '',
  showChoiceNames: true,
  hasZeroOption: false,
  choiceOptions: [
    {
      __typename: 'AttributeTypeChoiceOption' as const,
      id: '10',
      identifier: 'not-started',
      name: 'Not started',
    },
    {
      __typename: 'AttributeTypeChoiceOption' as const,
      id: '11',
      identifier: 'ongoing',
      name: 'Ongoing',
    },
    {
      __typename: 'AttributeTypeChoiceOption' as const,
      id: '12',
      identifier: 'done',
      name: 'Done',
    },
  ],
};

const action = {
  id: '100',
  attributes: [
    {
      __typename: 'AttributeChoice' as const,
      id: '1000',
      type: SLIM_ATTRIBUTE_TYPE,
      choice: { __typename: 'AttributeTypeChoiceOption' as const, id: '11', name: 'Ongoing' },
      text: null,
    },
  ],
} as unknown as ActionListAction;

const t = ((key: string) => key) as unknown as TFunction;
const plan = {} as unknown as PlanContextFragment;

describe('FieldColumnBlock cell', () => {
  it('renders a choice attribute using the choice options of the column attribute type', () => {
    const cell = COLUMN_CONFIG.FieldColumnBlock.renderCell(
      t,
      action,
      plan,
      undefined,
      COLUMN_ATTRIBUTE_TYPE as ColumnConfig['attributeType']
    );

    render(<>{cell}</>);

    expect(screen.getByText('Ongoing')).toBeInTheDocument();
  });
});
