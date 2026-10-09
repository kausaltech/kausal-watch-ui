import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import a11yMessages from '../../../locales/en/a11y.json';
import actionsMessages from '../../../locales/en/actions.json';
import commonMessages from '../../../locales/en/common.json';
import pathsMessages from '../../../locales/en/paths.json';
import SelectDropdown from '../../components/common/SelectDropdown';
import { render } from '../test-utils';

// Distinct from react-select's built-in English, so a pass proves the text
// comes from our message files.
const messages = {
  ...a11yMessages,
  ...actionsMessages,
  ...pathsMessages,
  ...commonMessages,
  'select-no-options': 'Aucune option',
  'select-results-available':
    '{count, plural, one {# résultat disponible} other {# résultats disponibles}}',
  'select-results-for-term': '{results} pour le terme de recherche {term}.',
};

const options = [
  { id: 'energy', label: 'Energy' },
  { id: 'transport', label: 'Transport' },
];

function renderDropdown() {
  render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <SelectDropdown
        id="sector"
        label="Sector"
        isMulti={false}
        options={options}
        value={null}
        onChange={() => undefined}
      />
    </NextIntlClientProvider>
  );
}

describe('SelectDropdown', () => {
  it('shows the localized notice when no option matches', async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.type(screen.getByLabelText('Sector'), 'zzz');
    expect(await screen.findByText('Aucune option')).toBeInTheDocument();
  });

  it('announces filter results in the current locale', async () => {
    const user = userEvent.setup();
    renderDropdown();
    await user.type(screen.getByLabelText('Sector'), 'tr');
    expect(
      await screen.findByText('1 résultat disponible pour le terme de recherche tr.')
    ).toBeInTheDocument();
  });
});
