import React from 'react';
import { render, screen } from '../test-utils';
import ErrorBoundary from '../../components/common/ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('renders children when there is no error', () => {
    const testText = 'Child component';
    render(
      <ErrorBoundary>
        <div>{testText}</div>
      </ErrorBoundary>
    );
    const childComponent = screen.getByText(testText);
    expect(childComponent).toBeInTheDocument();
  });
});
