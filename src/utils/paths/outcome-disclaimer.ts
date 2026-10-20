type OutcomeDisclaimer = { year: number; node: string; goal: string; disclaimer: string };

/**
 * The disclaimer of a node's outcome for the active goal, if the years shown
 * include the disclaimer's year: `separateYears` when given, else the range.
 */
export function getOutcomeDisclaimer(
  disclaimers: readonly OutcomeDisclaimer[] | undefined,
  nodeId: string,
  goalId: string | undefined,
  years: { startYear: number; endYear: number; separateYears?: readonly number[] | null }
) {
  const { startYear, endYear, separateYears } = years;
  const isShown = (year: number) =>
    separateYears?.length ? separateYears.includes(year) : year >= startYear && year <= endYear;
  return disclaimers?.find(
    (disclaimer) =>
      disclaimer.node === nodeId && disclaimer.goal === goalId && isShown(disclaimer.year)
  )?.disclaimer;
}
