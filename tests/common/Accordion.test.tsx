import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../test-utils';
import Accordion from '../../components/common/Accordion';
import { filterProps } from 'framer-motion';

describe('<Accordion />', () => {
  it('renders without crashing', () => {
    render(
      <Accordion>
        <Accordion.Item id="1">
          <Accordion.Header>Header 1</Accordion.Header>
          <Accordion.Body>Body 1</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );

    const header = screen.getByText('Header 1');

    expect(header).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();

    const copyButton = screen.getByTestId('link-copy-btn');
    expect(copyButton).toBeInTheDocument();
  });

  it('content visibility state is changing by click on header', async () => {
    render(
      <Accordion>
        <Accordion.Item id="test1">
          <Accordion.Header>Test Header 1</Accordion.Header>
          <Accordion.Body>Test Content 1</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );

    const content = screen.getByText('Test Content 1');
    expect(content).toHaveClass('collapse');

    const header = screen.getByText('Test Header 1');

    fireEvent.click(header);
    await waitFor(() => {
      expect(content).not.toHaveClass('collapse');
    });

    fireEvent.click(header);
    await waitFor(() => {
      expect(content).toHaveClass('collapse');
    });
  });
});
