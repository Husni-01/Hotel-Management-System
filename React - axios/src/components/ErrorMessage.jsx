export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status status-error" role="alert">
      <p>
        <strong>We could not complete that request.</strong>
      </p>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
