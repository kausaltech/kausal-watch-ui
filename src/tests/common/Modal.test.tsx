import { fireEvent, screen } from '@testing-library/react';

import Modal from '../../components/common/Modal';
import { render } from '../test-utils';

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

  it('is a dialog named by its header and described by its help text', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} header={header} helpText={helpText}>
        <div data-testid={contentId}>Child Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog', { name: header });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription(helpText);
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

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });

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

    // The backdrop area around the dialog; a click must also start there
    const backdropArea = screen.getByRole('dialog').parentElement!;
    fireEvent.mouseDown(backdropArea);
    fireEvent.click(backdropArea);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
