export default function ErrorMessage({ message }) {
  return (
    <div className="status-box error-box" role="alert">
      <p>{message}</p>
    </div>
  );
}
