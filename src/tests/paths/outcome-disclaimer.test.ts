import { getOutcomeDisclaimer } from '@/utils/paths/outcome-disclaimer';

const disclaimers = [
  {
    year: 2023,
    node: 'net_emissions',
    goal: 'direct',
    disclaimer: 'Values for 2023 are provisional',
  },
];

describe('getOutcomeDisclaimer', () => {
  it("shows a node's disclaimer for the goal when the range includes its year", () => {
    expect(
      getOutcomeDisclaimer(disclaimers, 'net_emissions', 'direct', {
        startYear: 2010,
        endYear: 2040,
      })
    ).toBe('Values for 2023 are provisional');
  });

  it('hides it when the range leaves out its year', () => {
    expect(
      getOutcomeDisclaimer(disclaimers, 'net_emissions', 'direct', {
        startYear: 2024,
        endYear: 2040,
      })
    ).toBeUndefined();
  });

  it('follows the separate years compared, not the range between them', () => {
    const years = { startYear: 2010, endYear: 2040 };
    expect(
      getOutcomeDisclaimer(disclaimers, 'net_emissions', 'direct', {
        ...years,
        separateYears: [2010, 2024],
      })
    ).toBeUndefined();
    expect(
      getOutcomeDisclaimer(disclaimers, 'net_emissions', 'direct', {
        ...years,
        separateYears: [2010, 2023],
      })
    ).toBe('Values for 2023 are provisional');
  });

  it('needs the same node and goal', () => {
    const years = { startYear: 2010, endYear: 2040 };
    expect(getOutcomeDisclaimer(disclaimers, 'mobility', 'direct', years)).toBeUndefined();
    expect(getOutcomeDisclaimer(disclaimers, 'net_emissions', 'other', years)).toBeUndefined();
  });
});
