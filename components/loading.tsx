export function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-700 dark:border-zinc-700 dark:border-t-zinc-200"
        role="status"
        aria-label="Hleður"
      />
    </div>
  );
}
