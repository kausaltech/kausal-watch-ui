import { redirect } from 'next/navigation';

type Props = {
  params: {
    lang: string;
  };
};

export default function AccessibilityLegacyPage({ params }: Props) {
  redirect(`/${params.lang}/accessibility`);
}
