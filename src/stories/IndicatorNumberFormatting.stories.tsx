import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import useNumberFormatter from '@/common/numbers';

const IndicatorNumberFormatting = ({
  maximumSignificantDigits: maximumSignificantDigitsRaw,
  maximumFractionDigits: maximumFractionDigitsRaw,
  numbers,
  locale,
}: {
  maximumSignificantDigits: string | undefined;
  maximumFractionDigits: string | undefined;
  numbers: number[];
  locale?: string;
}) => {
  const maximumSignificantDigits = maximumSignificantDigitsRaw
    ? parseInt(maximumSignificantDigitsRaw, 10) || undefined
    : undefined;
  const maximumFractionDigits =
    maximumFractionDigitsRaw !== undefined && maximumFractionDigitsRaw !== ''
      ? parseInt(maximumFractionDigitsRaw, 10)
      : undefined;
  const numberFormatter = useNumberFormatter();
  return (
    <div>
      <h3>Number Formatting Showcase</h3>
      <ul>
        <li>maximumSignificantDigits: {maximumSignificantDigits ?? 'undefined'}</li>
        <li>maximumFractionDigits: {maximumFractionDigits ?? 'undefined'}</li>
        <li>locale: {locale}</li>
      </ul>

      <table style={{ textAlign: 'right', borderCollapse: 'collapse' }}>
        <style>{`td, th { padding: 4px 12px; }`}</style>
        <thead>
          <tr>
            <th>Original</th>
            <th></th>
            <th>Converted</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((num, idx) => (
            <tr key={idx}>
              <td>{num}</td>
              <td style={{ textAlign: 'center' }}>→</td>
              <td>
                {(() => {
                  try {
                    return numberFormatter(
                      num,
                      maximumSignificantDigits,
                      maximumFractionDigits,
                      locale
                    );
                  } catch {
                    return '—';
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta = {
  title: 'Indicators/NumberFormatting',
  component: IndicatorNumberFormatting,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: { type: 'text' },
    },
    maximumSignificantDigits: {
      control: { type: 'text' },
    },
    maximumFractionDigits: {
      control: { type: 'text' },
    },
  },
  args: {
    locale: 'fi',
    maximumSignificantDigits: '2',
    maximumFractionDigits: '3',
    numbers: [0.0075087155164786906, 233.22779556372646, 2901.32413739182, 92875863.242415788],
  },
} satisfies Meta<typeof IndicatorNumberFormatting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Exmples: Story = {};
