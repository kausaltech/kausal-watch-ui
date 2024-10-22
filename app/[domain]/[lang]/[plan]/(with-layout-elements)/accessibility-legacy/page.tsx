import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function AccessibilityLegacyPage(props: Props) {
  const params = await props.params;
  redirect(`/${params.lang}/accessibility`);
}
