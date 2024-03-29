import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import '@testing-library/jest-dom/extend-expect';
import PopoverTip from '../../components/common/PopoverTip';

describe('PopoverTip', () => {
  const mockContent = 'Tooltip content';
  const mockIdentifier = 'test-id';

  it('shows correctly', () => {
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the tooltip on hover', async () => {
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    const infoButton = screen.getByRole('button');
    fireEvent.mouseOver(infoButton);
    expect(await screen.findByRole('tooltip')).toHaveTextContent(mockContent);
  });

  it('stops displaying the tooltip when mouse is not over', () => {
    render(<PopoverTip content={mockContent} identifier={mockIdentifier} />);
    const infoButton = screen.getByRole('button');
    fireEvent.mouseOut(infoButton);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
