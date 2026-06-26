import { constructCatHierarchy, mapActionCategories } from '@/common/categories';

describe('constructCatHierarchy', () => {
  it('preserves parent paths when mapping categories to common categories', () => {
    const categoryTypes: any[] = [
      {
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

    const [categoryType] = constructCatHierarchy<any, any>(categoryTypes, true);
    const child = categoryType.categories.find((cat: any) => cat.id === '210');

    expect(child?.parent?.id).toBe('209');
    expect(child?.depth).toBe(1);
  });
});

describe('mapActionCategories', () => {
  it('maps action categories through common categories when explicitly enabled', () => {
    const categoryTypes: any[] = [
      {
        id: 'lpr_aihealue',
        __typename: 'CommonCategoryType',
        identifier: 'lpr_aihealue',
        categories: [
          {
            id: '209',
            identifier: 'koulutus',
            depth: 0,
            parent: null,
            children: [],
            type: null,
          },
        ],
      },
    ];
    categoryTypes[0].categories[0].type = categoryTypes[0];

    const actions: any[] = [
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

    const mapped = mapActionCategories(actions, categoryTypes, null, 1, true);

    expect(mapped[0].categories).toHaveLength(1);
    expect(mapped[0].categories[0].id).toBe('209');
    expect(mapped[0].primaryCategories).toHaveLength(0);
  });
});
