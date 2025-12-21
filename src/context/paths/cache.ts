import { makeVar } from '@apollo/client';

import type { PathsInstanceType } from '@/components/providers/PathsProvider';

export const yearRangeVar = makeVar<[number, number]>(null!);
export const activeScenarioVar = makeVar<PathsInstanceType['scenarios'][number] | null>(null);
export const activeGoalVar = makeVar<PathsInstanceType['instance']['goals'][number] | null>(null);
export const showSettingsPanelVar = makeVar<boolean>(false); // Controls the visibility of the Paths settings panel
