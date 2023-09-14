import React from 'react';
import { render, screen } from '@testing-library/react';

describe('div', () => {
  it('renders without crashing', () => {
    render(<div>Foo</div>);
    expect(screen.getByText('Foo')).toBeInTheDocument();
  });
});
