import React from 'react';

import Icon from '../../components/common/Icon';
import { render } from '../test-utils';

describe('<Icon />', () => {
  it('renders the Icon with the correct class', () => {
    const { container } = render(<Icon name="arrow-right" />);
    const icon = container.firstChild;

    expect(icon).toHaveClass('icon');
  });

  it('renders the Icon with custom className', () => {
    const { container } = render(<Icon name="arrow-right" className="custom-icon" />);
    const icon = container.firstChild;

    expect(icon).toHaveClass('custom-icon');
  });

  it('renders the correct icon using the name prop', () => {
    const { container } = render(<Icon name="arrow-right" />);
    const useElement = container.querySelector('use');

    expect(useElement).toHaveAttribute('xlink:href', '#symbol-icon-arrow-right');
  });

  it('applies the provided color', () => {
    const { container } = render(<Icon name="arrow-right" color="red" />);
    const useElement = container.querySelector('use');

    expect(useElement).toHaveAttribute('fill', 'red');
  });

  it('sets aria-hidden and focusable attributes correctly when alt is provided', () => {
    const { container } = render(<Icon name="arrow-right" alt="Right Arrow" />);
    const icon = container.firstChild;

    expect(icon).toHaveAttribute('aria-hidden', 'false');
    expect(icon).toHaveAttribute('focusable', 'true');
  });

  it('renders the correct title when alt is provided', () => {
    const { getByTitle } = render(<Icon name="arrow-right" alt="Right Arrow" />);

    const title = getByTitle('Right Arrow');
    expect(title).toBeInTheDocument();
  });
});
