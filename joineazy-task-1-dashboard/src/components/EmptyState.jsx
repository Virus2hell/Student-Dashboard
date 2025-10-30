export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      {action}
    </div>
  );
}
