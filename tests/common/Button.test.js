import '@testing-library/jest-dom';

import * as React from 'react';
import { render, screen } from '../test-utils';
import Button from '@/components/common/Button';

test('shows buttons', () => {
  const testMessage = 'Test Message';
  render(<Button>{testMessage}</Button>);
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
