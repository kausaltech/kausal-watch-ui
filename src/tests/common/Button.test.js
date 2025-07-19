import * as React from 'react';

import '@testing-library/jest-dom';
import Button from 'components/common/Button';

import { render, screen } from '../test-utils';

test('shows buttons', () => {
  const testMessage = 'Test Message';
  render(<Button>{testMessage}</Button>);
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
