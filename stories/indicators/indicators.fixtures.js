export const categoriesData = [
  {
    id: '1',
    identifier: '1.1',
    name: 'Category 1',
    parent: null,
  },
  {
    id: '2',
    identifier: '1.1.1',
    name: 'Sub Category 2',
    parent: {
      id: '1',
    },
  },
  {
    id: '3',
    identifier: '1.1.2',
    name: 'Sub Category 3',
    parent: {
      id: '1',
    },
  },
  {
    id: '4',
    identifier: '1.1.3',
    name: 'Sub Category 4',
    parent: {
      id: '1',
    },
  },
  {
    id: '5',
    identifier: '1.1.4',
    name: 'Sub Category 5',
    parent: {
      id: '1',
    },
  },
];

export const hierarchy = {
  23: {
    id: '23',
    isRoot: true,
    children: ['24', '25', '26', '27', '28'],
    path: ['23'],
    pathNames: ['Kokonaispäästöt (scope 2)'],
  },
  24: {
    id: '24',
    isRoot: false,
    children: [],
    path: ['23', '24'],
    pathNames: ['Kokonaispäästöt (scope 2)', 'Kulutussähkön päästöt'],
  },
  25: {
    id: '25',
    isRoot: false,
    children: ['29', '32', '33', '34', '35'],
    path: ['23', '25'],
    pathNames: ['Kokonaispäästöt (scope 2)', 'Rakennusten lämmityksen päästöt'],
  },
  26: {
    id: '26',
    isRoot: false,
    children: ['36'],
    path: ['23', '26'],
    pathNames: ['Kokonaispäästöt (scope 2)', 'Liikenteen päästöt'],
  },
  27: {
    id: '27',
    isRoot: false,
    children: [],
    path: ['23', '27'],
    pathNames: ['Kokonaispäästöt (scope 2)', 'Maatalouden päästöt'],
  },
  28: {
    id: '28',
    isRoot: false,
    children: [],
    path: ['23', '28'],
    pathNames: ['Kokonaispäästöt (scope 2)', 'Jätteiden käsittelyn päästöt'],
  },
  29: {
    id: '29',
    isRoot: false,
    children: ['30', '31'],
    path: ['23', '25', '29'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Rakennusten sähkölämmityksen päästöt',
    ],
  },
  30: {
    id: '30',
    isRoot: false,
    children: [],
    path: ['23', '25', '29', '30'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Rakennusten sähkölämmityksen päästöt',
      'Rakennusten suoran sähkölämmityksen päästöt',
    ],
  },
  31: {
    id: '31',
    isRoot: false,
    children: [],
    path: ['23', '25', '29', '31'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Rakennusten sähkölämmityksen päästöt',
      'Maalämmön päästöt',
    ],
  },
  32: {
    id: '32',
    isRoot: false,
    children: [],
    path: ['23', '25', '32'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Kaukolämmön päästöt',
    ],
  },
  33: {
    id: '33',
    isRoot: false,
    children: [],
    path: ['23', '25', '33'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Öljylämmityksen päästöt',
    ],
  },
  34: {
    id: '34',
    isRoot: false,
    children: [],
    path: ['23', '25', '34'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Puulämmityksen päästöt',
    ],
  },
  35: {
    id: '35',
    isRoot: false,
    children: [],
    path: ['23', '25', '35'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Rakennusten lämmityksen päästöt',
      'Rakennusten muun lämmityksen päästöt',
    ],
  },
  36: {
    id: '36',
    isRoot: false,
    children: ['37', '38'],
    path: ['23', '26', '36'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Liikenteen päästöt',
      'Tieliikenteen päästöt',
    ],
  },
  37: {
    id: '37',
    isRoot: false,
    children: [],
    path: ['23', '26', '36', '37'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Liikenteen päästöt',
      'Tieliikenteen päästöt',
      'Tieliikenteen päästöt maanteillä',
    ],
  },
  38: {
    id: '38',
    isRoot: false,
    children: [],
    path: ['23', '26', '36', '38'],
    pathNames: [
      'Kokonaispäästöt (scope 2)',
      'Liikenteen päästöt',
      'Tieliikenteen päästöt',
      'Tieliikenteen päästöt kaduilla',
    ],
  },
  39: {
    id: '39',
    isRoot: true,
    children: [],
    path: ['39'],
    pathNames: ['Väestö'],
  },
};

const municipalityNames = [
  'Basildon',
  'Braintree',
  'Brentwood',
  'Castle Point',
  'Chelmsford',
  'Colchester',
  'Epping Forest',
  'Chigwell',
  'Harlow',
  'Maldon',
  'Burnham-on-Crouch',
  'Rochford',
  'Tendring',
  'Harwich',
  'Uttlesford',
];

const municipalities = municipalityNames.map((name, id) => ({ id, name }));

const indicatorMaker = (() => ({
  runningId: 10000,
  make: (commonIndicatorId) =>
    municipalities.map((muni) => ({
      id: (indicatorMaker.runningId++).toString(),
      name: `From common ${commonIndicatorId}`,
      level: 'strategic',
      categories: [],
      organization: {
        id: muni.id,
        name: muni.name,
      },
      common: {
        name: `Common indicator ${commonIndicatorId}`,
        id: commonIndicatorId,
      },
    })),
}))();

const handleCommonIndicator = (hierarchy, id) => {
  let result = [];
  const commonIndicator = hierarchy[id];
  result = result.concat(indicatorMaker.make(id));
  commonIndicator.children.forEach((childId) => {
    result = result.concat(handleCommonIndicator(hierarchy, childId));
  });
  return result;
};

export const hierarchicalIndicatorsData = Object.values(hierarchy)
  .filter((e) => e.isRoot)
  .reduce(
    (cumul, curr) => cumul.concat(handleCommonIndicator(hierarchy, curr.id)),
    []
  );

export const nonHierarchicalIndicatorsData = [
  {
    id: '21',
    name: 'Tactical Indicator',
    categories: [
      {
        id: '4',
        name: 'Sub Category 1',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '610',
      value: 234.5,
      date: '2018-12-31',
    },
    level: 'tactical',
    unit: {
      shortName: 'kt/a',
    },
  },
  {
    id: '2',
    name: 'Operational Indicator with a longer title that probably wraps',
    categories: [
      {
        id: '3',
        name: 'Cat',
      },
    ],
    latestGraph: null,
    latestValue: {
      id: '630',
      value: 235.666,
      date: '2018-12-31',
    },
    level: 'operational',
    unit: {
      shortName: 'kt/a',
    },
  },
  {
    id: '111',
    name: 'Some Strategic Indicator',
    categories: [
      {
        id: '4',
        name: 'This is a category',
      },
    ],
    latestGraph: null,
    latestValue: {
      value: 12235.666,
      id: '658',
      date: '2018-12-31',
    },
    level: 'strategic',
    unit: {
      shortName: 'kt/a',
    },
  },
  {
    id: '165',
    name: 'Another one with longer title',
    categories: [null],
    latestGraph: null,
    latestValue: {
      value: 235.666,
      id: '668',
      date: '2018-12-31',
    },
    level: 'strategic',
    unit: {
      shortName: 'kt/a',
    },
  },
  {
    id: '4',
    name: 'Tactical indicator with a title that ',
    categories: [
      {
        id: '5',
        name: 'Another Category',
      },
      {
        id: '1',
        name: 'Category with also long title',
      },
    ],
    latestGraph: null,
    latestValue: null,
    level: 'tactical',
    unit: {
      shortName: 'kt/a',
    },
  },
];
