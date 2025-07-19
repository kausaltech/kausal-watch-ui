import React from 'react';

import { act } from '@testing-library/react';

import ContentLoader from '../../components/common/ContentLoader';
import { render } from '../test-utils';

const t = (key) => key;

describe('<ContentLoader />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('does not render immediately', () => {
    const { queryAllByRole } = render(<ContentLoader t={t} />);
    const spinners = queryAllByRole('status');
    expect(spinners).toHaveLength(0);
  });

  it('renders spinner and loading message after 250ms', async () => {
    const { findAllByRole } = render(<ContentLoader t={t} />);

    act(() => {
      jest.advanceTimersByTime(250);
    });

    const spinners = await findAllByRole('status', { timeout: 300 });
    expect(spinners).toHaveLength(3);
  });
});
