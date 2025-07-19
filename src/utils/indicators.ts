export function isValidIndicatorId(id: string) {
  return typeof id === 'string' && !isNaN(id as unknown as number) && !isNaN(parseFloat(id));
}
