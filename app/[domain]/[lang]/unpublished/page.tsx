import type { Metadata } from 'next';

type Props = {
  searchParams: { message: string };
};

export const metadata: Metadata = {
  title: 'Kausal Watch',
  robots: 'noindex',
};

export default function UnpublishedPage({ searchParams }: Props) {
  return (
    <div className="mb-5 rounded px-3 px-sm-4 py-3 py-sm-5 mb-5">
      <div className="container">
        <p className="text-muted">{searchParams.message}</p>
      </div>
    </div>
  );
}
