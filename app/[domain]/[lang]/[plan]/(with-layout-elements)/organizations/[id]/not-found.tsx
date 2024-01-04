import Link from 'next/link';

// TODO: dictionary and proper 404 page
export default function NotFound() {
  return (
    <div>
      <h2>Organization not found</h2>
      <p>Could not find requested indicator</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
