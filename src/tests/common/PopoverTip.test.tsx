import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PopoverTip from '../../components/common/PopoverTip';
import { render } from '../test-utils';

describe('PopoverTip', () => {
  const mockContent = 'Tooltip content';
  const mockIdentifier = 'test-id';

  it('shows correctly', () => {
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the tooltip on keyboard focus', async () => {
    const user = userEvent.setup();
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent(mockContent);
  });

  it('hides the tooltip when focus leaves', async () => {
    const user = userEvent.setup();
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    await user.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
