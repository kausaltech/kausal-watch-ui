import { render } from '@testing-library/react';

import { showSettingsPanelVar } from '@common/apollo/paths-cache';

import SettingsPanelVisibility from '@/components/paths/toolbar/SettingsPanelVisibility';

describe('SettingsPanelVisibility', () => {
  afterEach(() => {
    showSettingsPanelVar(false);
  });

  it("sets the panel's visibility for the page, and hides it when the page goes", () => {
    const { rerender, unmount } = render(<SettingsPanelVisibility visible />);
    expect(showSettingsPanelVar()).toBe(true);

    rerender(<SettingsPanelVisibility visible={false} />);
    expect(showSettingsPanelVar()).toBe(false);

    rerender(<SettingsPanelVisibility visible />);
    unmount();
    expect(showSettingsPanelVar()).toBe(false);
  });
});
