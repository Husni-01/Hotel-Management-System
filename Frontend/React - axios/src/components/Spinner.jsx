export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="status status-loading" role="status">
      <span className="spinner" aria-hidden="true" />
      {label}
    </div>
  );
}
