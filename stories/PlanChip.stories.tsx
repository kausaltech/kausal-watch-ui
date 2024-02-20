import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from 'styled-components';
import PlanChip from '@/components/plans/PlanChip';
import { DecoratorHelpers } from '@storybook/addon-themes';
const { pluckThemeFromContext, useThemeParameters } = DecoratorHelpers;

const ThemeableBackgrounds = (Story, context) => {
  const theme = context.args?.activeTheme;
  return (
    <div style={{ backgroundColor: theme.brandDark, padding: '20px' }}>
      <Story {...context} />
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Plans/PlanChip',
  component: PlanChip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    planShortName: 'Plan Name',
    organization: 'Organization',
  },
} satisfies Meta<typeof PlanChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Negative: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    negative: true,
  },
  decorators: [ThemeableBackgrounds],
};
