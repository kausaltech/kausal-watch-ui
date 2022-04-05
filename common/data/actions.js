export const ORDERED_ACTION_STATUSES = [
  'completed',
  'on_time',
  'in_progress',
  'not_started',
  'late',
  'cancelled',
  'merged',
  'postponed',
  'undefined',
];

export function actionStatusOrder(status) {
  const index = ORDERED_ACTION_STATUSES.indexOf(status.identifier);
  if (index === -1) {
    return Number.MAX_SAFE_INTEGER;
  }
  return index;
}
