import { useLanguage } from '../../context/LanguageContext';
import './SubmitButton.css';

export default function SubmitButton({
  loading = false,
  onClick,
  text,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const { t } = useLanguage();
  const buttonText = text || t('common.calculate');

  return (
    <button
      className={`custom-submit-btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <div className="custom-btn-spinner" /> : buttonText}
    </button>
  );
}
