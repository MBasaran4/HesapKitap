import './SubmitButton.css';

export default function SubmitButton({
  loading = false,
  onClick,
  text = 'Hesapla',
  type = 'button',
  disabled = false,
  className = '',
}) {
  return (
    <button
      className={`custom-submit-btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <div className="custom-btn-spinner" /> : text}
    </button>
  );
}
