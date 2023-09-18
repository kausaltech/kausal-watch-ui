import React from 'react';
import Card from '../../components/common/Card';
import { render } from '../test-utils';
import { screen } from '@testing-library/react';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card><div>Test Content</div></Card>);

    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
  });

  it('renders with an image when imageUrl is provided', () => {
    const imageUrl = "image.jpg";

    render(
      <Card imageUrl={imageUrl}>
        <div>Test Content</div>
      </Card>
    );

    const image = screen.getByTestId('image-bg');;
    expect(image).toBeInTheDocument();
});

  it('uses customcolor when provided', () => {
    const customColorValue = 'rgb(212, 235, 255)';
    render(
      <Card customColor={customColorValue}>
        <div>Test Content</div>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveStyle(`background-color: ${customColorValue}`);
  });

  it('use default theme color when customcolor is not provided', () => {
    const defaultColor = 'rgb(247, 246, 243)';
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle(`background-color: ${defaultColor}`);

  });
});










