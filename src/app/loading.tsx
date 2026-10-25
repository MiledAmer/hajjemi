// Shown by Next.js while a route's server data loads (and during navigations).
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement"
      className="bg-background flex min-h-screen items-center justify-center"
    >
      <div className="border-primary size-10 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}
