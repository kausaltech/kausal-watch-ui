import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ActionScheduleBlock from '@/components/actions/blocks/ActionScheduleBlock';

import { MOCK_PLAN } from './mocks/plan.mocks';

type Props = React.ComponentProps<typeof ActionScheduleBlock>;
type Schedule = Props['plan']['actionSchedules'][number];

// Council terms as set up in real plans: the plan's schedules set the range of
// the timeline, the action's schedules the highlighted part of it.
const SCHEDULES = {
  previousTerm: {
    id: '1',
    name: 'Previous council term (2017–2021)',
    beginsAt: '2017-06-01',
    endsAt: '2021-05-31',
  },
  currentTerm: {
    id: '2',
    name: 'Current council term (2021–2025)',
    beginsAt: '2021-06-01',
    endsAt: '2025-05-31',
  },
  nextTerm: {
    id: '3',
    name: 'Next council term (2025–2029)',
    beginsAt: '2025-06-01',
    endsAt: '2029-05-31',
  },
  later: {
    id: '4',
    name: 'Later (2025–2035)',
    beginsAt: '2025-06-01',
    endsAt: '2035-12-31',
  },
} satisfies Record<string, Schedule>;

const THREE_TERMS = [SCHEDULES.previousTerm, SCHEDULES.currentTerm, SCHEDULES.nextTerm];

function makePlan(actionSchedules: Schedule[]): Props['plan'] {
  return { ...MOCK_PLAN, actionSchedules };
}

// Only the fields the block reads
function makeAction(fields: {
  schedule?: Schedule[];
  startDate?: string;
  endDate?: string;
  scheduleContinuous?: boolean;
}): Props['action'] {
  return {
    schedule: [],
    startDate: null,
    endDate: null,
    scheduleContinuous: false,
    dateFormat: null,
    ...fields,
  } as unknown as Props['action'];
}

const meta = {
  title: 'Actions/ActionAttribute/ActionScheduleBlock',
  component: ActionScheduleBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    // The block sits in the narrow side column of the action page
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    heading: '',
    plan: makePlan(THREE_TERMS),
  },
} satisfies Meta<typeof ActionScheduleBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

// --- Schedules: a timeline over the plan's schedules ---

export const ScheduleCurrentTerm: Story = {
  args: {
    action: makeAction({ schedule: [SCHEDULES.currentTerm] }),
  },
};

export const ScheduleSeveralTerms: Story = {
  args: {
    action: makeAction({ schedule: [SCHEDULES.currentTerm, SCHEDULES.nextTerm] }),
  },
};

/** Plans spanning over ten years get a tick every three years */
export const ScheduleLongPlan: Story = {
  args: {
    plan: makePlan([SCHEDULES.previousTerm, SCHEDULES.currentTerm, SCHEDULES.later]),
    action: makeAction({ schedule: [SCHEDULES.later] }),
  },
};

export const ScheduleShortPlan: Story = {
  args: {
    plan: makePlan([SCHEDULES.currentTerm, SCHEDULES.nextTerm]),
    action: makeAction({ schedule: [SCHEDULES.nextTerm] }),
  },
};

export const CustomHeading: Story = {
  args: {
    heading: 'Implementation period',
    action: makeAction({ schedule: [SCHEDULES.currentTerm] }),
  },
};

// --- Dates: start and end dates set on the action ---

export const StartAndEndDate: Story = {
  args: {
    action: makeAction({ startDate: '2023-01-12', endDate: '2026-06-30' }),
  },
};

export const OnlyStartDate: Story = {
  args: {
    action: makeAction({ startDate: '2023-01-12' }),
  },
};

export const OnlyEndDate: Story = {
  args: {
    action: makeAction({ endDate: '2026-06-30' }),
  },
};

export const ContinuousWithStartDate: Story = {
  args: {
    action: makeAction({ startDate: '2023-01-12', scheduleContinuous: true }),
  },
};

export const ContinuousWithEndDate: Story = {
  args: {
    action: makeAction({ endDate: '2026-06-30', scheduleContinuous: true }),
  },
};

export const ContinuousWithStartAndEndDate: Story = {
  args: {
    action: makeAction({
      startDate: '2023-01-12',
      endDate: '2026-06-30',
      scheduleContinuous: true,
    }),
  },
};

/** Both are shown when an action has schedules as well as dates */
export const ScheduleAndDates: Story = {
  args: {
    action: makeAction({
      schedule: [SCHEDULES.currentTerm],
      startDate: '2023-01-12',
      endDate: '2025-05-31',
    }),
  },
};
