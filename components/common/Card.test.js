import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {

  it('renders with an image when imageUrl prop is provided', () => {
    render(
      <Card imageUrl="image.jpg">
        <div>Test Content</div>
      </Card>
    );
    const image = screen.getByStyle({
      backgroundImage: 'url(image.jpg)',
    });
    expect(image).toBeInTheDocument();
  });
});

