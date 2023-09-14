import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../test-utils';
import Modal from '../../components/common/Modal';  

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
  });

  it('closes the modal when the close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
  
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render Modal when isOpen is false', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={false} onClose={onCloseMock} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    expect(screen.queryByText(header)).not.toBeInTheDocument();
    expect(screen.queryByText(helpText)).not.toBeInTheDocument();
    expect(screen.queryByTestId(contentId)).not.toBeInTheDocument();
    expect(onCloseMock).toHaveBeenCalledTimes(0);
  });

  it('closes the modal on Escape', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(helpText)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes the modal on click outside', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal isOpen={true} onClose={onCloseMock} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    expect(screen.getByText(header)).toBeInTheDocument();
    expect(screen.getByText(helpText)).toBeInTheDocument();

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

