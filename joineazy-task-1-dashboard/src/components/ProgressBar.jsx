export default function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full rounded bg-gray-100">
      <div className="h-2 rounded bg-brand-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
