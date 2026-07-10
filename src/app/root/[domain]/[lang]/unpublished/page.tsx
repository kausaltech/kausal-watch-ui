import type { Theme } from '@kausal/themes/types';
import type { Metadata } from 'next';

import UnpublishedPlan from '@/components/plans/UnpublishedPlan';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';

type Props = {
  searchParams: Promise<{
    message: string;
    loginEnabled: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Kausal Watch',
  robots: 'noindex',
};

export default async function UnpublishedPage(props: Props) {
  const searchParams = await props.searchParams;
  const loginEnabled = searchParams.loginEnabled === 'true';
  const message = searchParams.message;
  return (
    <ThemeProvider theme={defaultTheme as Theme}>
      <UnpublishedPlan message={message} loginEnabled={loginEnabled} testId="unpublished-page" />
    </ThemeProvider>
  );
}
