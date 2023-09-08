import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from './Modal';  


describe('Modal component', () => {
  const header = 'Test Header';
  const helpText = 'Test Help Text';
  const contentId = 'child-content';

  it('renders Modal with child content', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(helpText)).toBeInTheDocument();
    expect(screen.getByTestId(contentId)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('times')); 
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render Modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    expect(screen.queryByText(header)).not.toBeInTheDocument();
    expect(screen.queryByText(helpText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(contentId)).not.toBeInTheDocument();
  });
});
