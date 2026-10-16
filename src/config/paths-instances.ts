/**
 * Per-instance Paths display settings that have no backend support yet.
 * `PathsProvider` merges them into the instance context; settings keyed by
 * goal id apply to that goal only.
 */
export type PathsInstanceSettings = {
  separateYears?: Record<string, number[] | null>;
  outcomeDisclaimers?: { year: number; node: string; goal: string; disclaimer: string }[];
  colorAdjust?: Record<string, number>;
  hideForecast?: Record<string, boolean>;
  defaultOutcomeGraphType?: Record<string, 'area' | 'line' | 'bar'>;
  showOutcomeNodeDetails?: boolean;
};

export const PATHS_INSTANCE_SETTINGS: Record<string, PathsInstanceSettings> = {
  'lappeenranta-nzc': {
    separateYears: {
      net_emissions: null,
    },
    outcomeDisclaimers: [
      {
        year: 2020,
        node: 'net_emissions',
        goal: 'net_emissions',
        disclaimer: 'Testing disclaimer',
      },
    ],
  },
  zuerich: {
    defaultOutcomeGraphType: {
      'net_emissions/emission_scope:indirect': 'bar',
      'net_emissions/emission_scope:direct+negative': 'area',
    },
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2023,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:direct+negative',
        disclaimer: 'Die Werte für den Bereich Mobilität 2023 sind provisorisch',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
  'zuerich-2024': {
    defaultOutcomeGraphType: {
      'net_emissions/emission_scope:indirect': 'bar',
      'net_emissions/emission_scope:direct+negative': 'area',
    },
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2023,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:direct+negative',
        disclaimer: 'Die Werte für den Bereich Mobilität 2023 sind provisorisch',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
  'zuerich-2025': {
    showOutcomeNodeDetails: false,
    defaultOutcomeGraphType: {
      'net_emissions/emission_scope:indirect': 'bar',
      'net_emissions/emission_scope:direct+negative': 'area',
    },
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023, 2024],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2024,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen in den Bereichen Ernährung und Konsum sowie teilweise im Bereich Mobilität (ca. 25%) im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2024,
        node: 'food_consumption_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Ernährung im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2024,
        node: 'other_consumption_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen des Konsums im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2024,
        node: 'transportation_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Stadtbevölkerung ausserhalb des Stadtgebiets (exkl. Flugzeug) und der Neufahrzeuge im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2024,
        node: 'transportation_emissions_outside_city',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Stadtbevölkerung ausserhalb des Stadtgebiets (exkl. Flugzeug) im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2024,
        node: 'new_vehicle_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Neufahrzeuge im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
  'zuerich-dev': {
    showOutcomeNodeDetails: false,
    defaultOutcomeGraphType: {
      'net_emissions/emission_scope:indirect': 'bar',
      'net_emissions/emission_scope:direct+negative': 'area',
    },
    separateYears: {
      'net_emissions/emission_scope:indirect': [1990, 2010, 2015, 2020, 2022, 2023, 2024, 2025],
      'net_emissions/emission_scope:direct+negative': null,
    },
    outcomeDisclaimers: [
      {
        year: 2025,
        node: 'net_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen in den Bereichen Ernährung und Konsum sowie teilweise im Bereich Mobilität (ca. 25%) im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2025,
        node: 'food_consumption_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Ernährung im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2025,
        node: 'other_consumption_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen des Konsums im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2025,
        node: 'transportation_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Stadtbevölkerung ausserhalb des Stadtgebiets (exkl. Flugzeug) und der Neufahrzeuge im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2025,
        node: 'transportation_emissions_outside_city',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Stadtbevölkerung ausserhalb des Stadtgebiets (exkl. Flugzeug) im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
      {
        year: 2025,
        node: 'new_vehicle_emissions',
        goal: 'net_emissions/emission_scope:indirect',
        disclaimer:
          'Für die indirekten Emissionen der Mobilität der Neufahrzeuge im Jahr 2024 wurden die Vorjahreswerte übernommen, da keine neuen Daten verfügbar waren.',
      },
    ],
    colorAdjust: {
      'net_emissions/emission_scope:indirect': 1.75,
      'net_emissions/emission_scope:direct+negative': 0,
    },
    hideForecast: {
      'net_emissions/emission_scope:indirect': true,
      'net_emissions/emission_scope:direct+negative': false,
    },
  },
};
