import {
  type CategoryHierarchyMember,
  type CategoryMappedAction,
  type CategoryMappedActionInput,
  type CategoryTypeHierarchy,
  type CategoryTypeInput,
  constructCatHierarchy,
  mapActionCategories,
} from '@/common/categories';

type TestCategory = CategoryHierarchyMember<TestCategoryType>;
type TestCategoryType = CategoryTypeHierarchy<TestCategory>;
interface TestAction extends CategoryMappedAction<TestCategoryType, TestCategory> {
  id: string;
}

describe('constructCatHierarchy', () => {
  it('preserves parent paths when mapping categories to common categories', () => {
    const categoryTypes: CategoryTypeInput[] = [
      {
        id: 'local-lpr-aihealue',
        common: {
          id: 'lpr_aihealue',
          __typename: 'CommonCategoryType',
          identifier: 'lpr_aihealue',
        },
        categories: [
          {
            id: 'local-parent',
            common: {
              id: '209',
              identifier: 'koulutus',
            },
            parent: null,
          },
          {
            id: 'local-child',
            common: {
              id: '210',
              identifier: 'luontokasvatus',
            },
            parent: {
              id: 'local-parent',
              common: {
                id: '209',
              },
            },
          },
        ],
      },
    ];

    const [categoryType] = constructCatHierarchy<TestCategory, TestCategoryType>(
      categoryTypes,
      true
    );
    const child = categoryType.categories.find((cat) => cat.id === '210');

    expect(child?.parent?.id).toBe('209');
    expect(child?.depth).toBe(1);
  });
});

describe('mapActionCategories', () => {
  it('maps action categories through common categories when explicitly enabled', () => {
    const categoryTypeInputs: CategoryTypeInput[] = [
      {
        id: 'lpr_aihealue',
        __typename: 'CommonCategoryType',
        identifier: 'lpr_aihealue',
        categories: [
          {
            id: '209',
            identifier: 'koulutus',
            parent: null,
          },
        ],
      },
    ];
    const categoryTypes = constructCatHierarchy<TestCategory, TestCategoryType>(categoryTypeInputs);

    const actions: Array<CategoryMappedActionInput & { id: string }> = [
      {
        id: '9679',
        categories: [
          {
            id: '6473',
            common: {
              id: '209',
            },
          },
        ],
      },
    ];

    const mapped = mapActionCategories<TestCategoryType, TestCategory, TestAction>(
      actions,
      categoryTypes,
      null,
      1,
      true
    );

    expect(mapped[0].categories).toHaveLength(1);
    expect(mapped[0].categories[0].id).toBe('209');
    expect(mapped[0].primaryCategories).toHaveLength(0);
  });
});
