import { PlanContextFragment } from '@/common/__generated__/graphql';

export const MOCK_PLAN: PlanContextFragment = {
  id: 'sunnydale',
  identifier: 'sunnydale',
  name: 'Sunnydale Climate Action Plan',
  shortName: 'Climate',
  versionName: '',
  themeIdentifier: 'default',
  primaryLanguage: 'en',
  otherLanguages: ['de', 'fi'],
  hideActionIdentifiers: false,
  publishedAt: '2023-01-12T20:31:54.248974+00:00',
  viewUrl: 'http://sunnydale.localhost:3000',
  primaryActionClassification: {
    id: '22',
    identifier: 'action',
    hideCategoryIdentifiers: false,
    common: null,
  },
  secondaryActionClassification: null,
  domain: {
    id: '107',
    basePath: null,
    googleSiteVerificationTag: null,
    matomoAnalyticsUrl: null,
  },
  image: {
    id: '8',
  },
  serveFileBaseUrl: 'https://watch-api.staging.kausal.tech',
  actionSchedules: [],
  actionImplementationPhases: [
    {
      id: '14',
      identifier: 'not_started',
      name: 'Not started',
      order: 0,
      color: null,
    },
    {
      id: '15',
      identifier: 'planning',
      name: 'Planning',
      order: 1,
      color: null,
    },
    {
      id: '16',
      identifier: 'implementation',
      name: 'Implementation',
      order: 2,
      color: null,
    },
    {
      id: '17',
      identifier: 'completed',
      name: 'Completed',
      order: 3,
      color: null,
    },
  ],
  actionImpacts: [
    {
      id: '35',
      identifier: '0',
      name: 'Not assessed',
      order: 0,
    },
    {
      id: '34',
      identifier: '1',
      name: 'Small',
      order: 1,
    },
    {
      id: '33',
      identifier: '2',
      name: 'Medium',
      order: 2,
    },
    {
      id: '32',
      identifier: '3',
      name: 'Large',
      order: 3,
    },
    {
      id: '31',
      identifier: '4',
      name: 'Extra large',
      order: 4,
    },
  ],
  actionStatuses: [
    {
      id: '68',
      identifier: 'completed',
      name: 'Completed',
      isCompleted: true,
    },
    {
      id: '66',
      identifier: 'on_time',
      name: 'On time',
      isCompleted: false,
    },
    {
      id: '67',
      identifier: 'late',
      name: 'Late',
      isCompleted: false,
    },
  ],
  actionStatusSummaries: [
    {
      identifier: 'COMPLETED',
      label: 'Completed',
      color: 'green090',
      isCompleted: true,
      isActive: false,
      sentiment: 'POSITIVE',
    },
    {
      identifier: 'ON_TIME',
      label: 'On time',
      color: 'green050',
      isCompleted: false,
      isActive: true,
      sentiment: 'POSITIVE',
    },
    {
      identifier: 'IN_PROGRESS',
      label: 'In progress',
      color: 'green050',
      isCompleted: false,
      isActive: true,
      sentiment: 'POSITIVE',
    },
    {
      identifier: 'NOT_STARTED',
      label: 'Not started',
      color: 'green010',
      isCompleted: false,
      isActive: true,
      sentiment: 'NEUTRAL',
    },
    {
      identifier: 'LATE',
      label: 'Late',
      color: 'yellow050',
      isCompleted: false,
      isActive: true,
      sentiment: 'NEGATIVE',
    },
    {
      identifier: 'CANCELLED',
      label: 'Cancelled',
      color: 'grey030',
      isCompleted: false,
      isActive: false,
      sentiment: 'NEUTRAL',
    },
    {
      identifier: 'OUT_OF_SCOPE',
      label: 'Out of scope',
      color: 'grey030',
      isCompleted: false,
      isActive: false,
      sentiment: 'NEUTRAL',
    },
    {
      identifier: 'MERGED',
      label: 'Merged',
      color: 'grey030',
      isCompleted: true,
      isActive: false,
      sentiment: 'NEUTRAL',
    },
    {
      identifier: 'POSTPONED',
      label: 'Postponed',
      color: 'blue030',
      isCompleted: false,
      isActive: false,
      sentiment: 'NEUTRAL',
    },
    {
      identifier: 'UNDEFINED',
      label: 'Unknown',
      color: 'grey010',
      isCompleted: false,
      isActive: true,
      sentiment: 'NEUTRAL',
    },
  ],
  actionTimelinessClasses: [
    {
      identifier: 'OPTIMAL',
      label: 'Under 30 days',
      color: 'green070',
      sentiment: 'POSITIVE',
      comparison: 'LTE',
      days: 30,
    },
    {
      identifier: 'ACCEPTABLE',
      label: 'Under 60 days',
      color: 'green030',
      sentiment: 'NEUTRAL',
      comparison: 'LTE',
      days: 60,
    },
    {
      identifier: 'LATE',
      label: 'Over 60 days',
      color: 'yellow050',
      sentiment: 'NEGATIVE',
      comparison: 'GT',
      days: 60,
    },
    {
      identifier: 'STALE',
      label: 'Over 180 days',
      color: 'red050',
      sentiment: 'NEGATIVE',
      comparison: 'GT',
      days: 180,
    },
  ],
  impactGroups: [],
  primaryOrgs: [],
  generalContent: {
    id: '10',
    siteTitle: 'Sunnydale Climate Action Plan',
    siteDescription:
      'We are committed to become carbon neutral by 2030. Here you find information on our current climate actions and how they help us to reach our goal.',
    officialNameDescription: 'As approved by council',
    copyrightText: '2021 Kausal Ltd',
    creativeCommonsLicense: 'CC BY 4.0 (except photography)',
    ownerUrl: 'https://kausal.tech',
    ownerName: 'Kausal Ltd',
    actionTerm: 'ACTION',
    actionTaskTerm: 'TASK',
    organizationTerm: 'ORGANIZATION',
    sitewideAnnouncement: null,
  },
  mainMenu: {
    items: [
      {
        __typename: 'PageMenuItem',
        id: '783',
        page: {
          title: 'Themes',
          urlPath: '/themes',
          slug: 'themes',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '784',
        page: {
          title: 'Urban planning for a resilient city',
          urlPath: '/themes/urban-planning-for-a-climate-smart-city',
          slug: 'urban-planning-for-a-climate-smart-city',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '785',
        page: {
          title: 'Carbon-neutral energy production',
          urlPath: '/themes/carbon-neutral-energy-production',
          slug: 'carbon-neutral-energy-production',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '786',
        page: {
          title: 'Energy-efficient buildings',
          urlPath: '/themes/3-energy-efficient-buildings',
          slug: 'energy-efficient-buildings',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '787',
        page: {
          title: 'Sustainable transportation',
          urlPath: '/themes/sustainable-transportation',
          slug: 'sustainable-transportation',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '790',
        page: {
          title: 'Sharing and circular economy',
          urlPath: '/themes/5-sharing-and-circular-economy',
          slug: 'sharing-and-circular-economy',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '789',
        page: {
          title: 'Climate-smart citizens and businesses',
          urlPath: '/themes/6-climate-smart-citizens-and-businesses',
          slug: 'climate-smart-citizens-and-businesses',
        },
        parent: {
          id: '783',
          page: {
            __typename: 'EmptyPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '88',
        page: {
          title: 'Actions',
          urlPath: '/actions',
          slug: 'actions',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '89',
        page: {
          title: 'Indicators',
          urlPath: '/indicators',
          slug: 'indicators',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '80',
        page: {
          title: 'Carbon Neutral Sunnydale 2030',
          urlPath: '/about-us',
          slug: 'about-us',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2641',
        page: {
          title: 'Indicator type',
          urlPath: '/indicator-type',
          slug: 'indicator-type',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2643',
        page: {
          title: 'Input indicator',
          urlPath: '/indicator-type/input-indicator',
          slug: 'input-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2645',
        page: {
          title: 'Process indicator',
          urlPath: '/indicator-type/process-indicator',
          slug: 'process-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2647',
        page: {
          title: 'Output indicator',
          urlPath: '/indicator-type/output-indicator',
          slug: 'output-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2649',
        page: {
          title: 'Outcome indicator',
          urlPath: '/indicator-type/outcome-indicator',
          slug: 'outcome-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2651',
        page: {
          title: 'Impact indicator',
          urlPath: '/indicator-type/impact-indicator',
          slug: 'impact-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2653',
        page: {
          title: 'Strategic indicator',
          urlPath: '/indicator-type/strategic-indicator',
          slug: 'strategic-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'PageMenuItem',
        id: '2655',
        page: {
          title: 'Other indicator',
          urlPath: '/indicator-type/other-indicator',
          slug: 'other-indicator',
        },
        parent: {
          id: '2641',
          page: {
            __typename: 'CategoryTypePage',
          },
        },
      },
      {
        __typename: 'ExternalLinkMenuItem',
        linkText: 'Sunnydale Scenario Tool',
        url: 'https://sunnydale.paths.kausal.tech/en/',
      },
    ],
  },
  footer: {
    items: [
      {
        id: '783',
        page: {
          title: 'Themes',
          urlPath: '/themes',
          slug: 'themes',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
        children: [
          {
            __typename: 'PageMenuItem',
            id: '786',
            page: {
              title: 'Energy-efficient buildings',
              urlPath: '/themes/3-energy-efficient-buildings',
              slug: 'energy-efficient-buildings',
            },
          },
        ],
      },
      {
        id: '88',
        page: {
          title: 'Actions',
          urlPath: '/actions',
          slug: 'actions',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
        children: [],
      },
      {
        id: '89',
        page: {
          title: 'Indicators',
          urlPath: '/indicators',
          slug: 'indicators',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
        children: [],
      },
      {
        id: '80',
        page: {
          title: 'Carbon Neutral Sunnydale 2030',
          urlPath: '/about-us',
          slug: 'about-us',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
        children: [],
      },
      {
        id: '2641',
        page: {
          title: 'Indicator type',
          urlPath: '/indicator-type',
          slug: 'indicator-type',
        },
        parent: {
          id: '21',
          page: {
            __typename: 'PlanRootPage',
          },
        },
        children: [
          {
            __typename: 'PageMenuItem',
            id: '2643',
            page: {
              title: 'Input indicator',
              urlPath: '/indicator-type/input-indicator',
              slug: 'input-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2645',
            page: {
              title: 'Process indicator',
              urlPath: '/indicator-type/process-indicator',
              slug: 'process-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2647',
            page: {
              title: 'Output indicator',
              urlPath: '/indicator-type/output-indicator',
              slug: 'output-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2649',
            page: {
              title: 'Outcome indicator',
              urlPath: '/indicator-type/outcome-indicator',
              slug: 'outcome-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2651',
            page: {
              title: 'Impact indicator',
              urlPath: '/indicator-type/impact-indicator',
              slug: 'impact-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2653',
            page: {
              title: 'Strategic indicator',
              urlPath: '/indicator-type/strategic-indicator',
              slug: 'strategic-indicator',
            },
          },
          {
            __typename: 'PageMenuItem',
            id: '2655',
            page: {
              title: 'Other indicator',
              urlPath: '/indicator-type/other-indicator',
              slug: 'other-indicator',
            },
          },
        ],
      },
    ],
  },
  adminUrl: 'https://watch-api.staging.kausal.tech',
  accessibilityStatementUrl: null,
  externalFeedbackUrl: null,
  features: {
    allowPublicSiteLogin: false,
    hasActionContactPersonRoles: false,
    contactPersonsPublicData: 'ALL',
    enableSearch: true,
    hasActionIdentifiers: true,
    hasActionOfficialName: true,
    hasActionLeadParagraph: false,
    hasActionPrimaryOrgs: false,
    showAdminLink: true,
    enableIndicatorComparison: true,
    minimalStatuses: false,
  },
  allRelatedPlans: [
    {
      id: 'sunnydale-bidi',
      identifier: 'sunnydale-bidi',
      name: 'Sunnydale Biodiversity Action Plan',
      shortName: 'Biodiversity',
      image: {
        rendition: {
          src: 'https://watch-media.staging.kausal.tech/images/pexels-manoj-poosam-7199929.2e16d0ba.fill-128x128-c50_nTuEZJJ.jpg',
        },
      },
      organization: {
        name: 'City of Sunnydale',
      },
      viewUrl: 'http://sunnydale-bidi.localhost:3000',
    },
    {
      id: 'sunnydale-umbrella',
      identifier: 'sunnydale-umbrella',
      name: 'Sunnydale Sustainability',
      shortName: 'Plans',
      image: {
        rendition: {
          src: 'https://watch-media.staging.kausal.tech/images/pexels-pixabay-414807.2e16d0ba.fill-128x128-c50_K7MPdwW.jpg',
        },
      },
      organization: {
        name: 'City of Sunnydale',
      },
      viewUrl: 'http://sunnydale-umbrella.localhost:3000',
    },
  ],
  supersededBy: null,
  supersededPlans: [],
  supersedingPlans: [],
  children: [],
  parent: {
    id: 'sunnydale-umbrella',
    identifier: 'sunnydale-umbrella',
    name: 'Sunnydale Sustainability',
    shortName: 'Plans',
    generalContent: {
      id: '33',
      siteTitle: 'Sunnydale Sustainability',
    },
    image: {
      rendition: {
        src: 'https://watch-media.staging.kausal.tech/images/pexels-pixabay-414807.2e16d0ba.fill-128x128-c50_K7MPdwW.jpg',
      },
    },
    organization: {
      name: 'City of Sunnydale',
    },
    viewUrl: 'http://sunnydale-umbrella.localhost:3000',
  },
  additionalLinks: {
    items: [],
  },
  actionListPage: {
    includeRelatedPlans: false,
    actionDateFormat: 'FULL',
    taskDateFormat: 'FULL',
  },
};
