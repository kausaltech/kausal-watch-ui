import React from 'react';

import { act } from '@testing-library/react';

import ContentLoader from '@common/components/ContentLoader';

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
    const { queryAllByRole } = render(<ContentLoader />);
    const spinners = queryAllByRole('progressbar');
    expect(spinners).toHaveLength(0);
  });

  it('renders spinner and loading message after 250ms', async () => {
    const { findByRole } = render(<ContentLoader />);

    act(() => {
      jest.advanceTimersByTime(250);
    });

    const spinner = await findByRole('progressbar', { timeout: 300 });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });
});
