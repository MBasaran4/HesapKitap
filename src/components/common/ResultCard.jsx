import { useLanguage } from '../../context/LanguageContext';
import './ResultCard.css';

export default function ResultCard({
  result,
  status,
  detail,
  isError = false,
  errorBadge,
  className = '',
}) {
  const { t } = useLanguage();

  if (!result && !status && !detail) {
    return null;
  }

  return (
    <div
      className={`custom-result-card ${isError ? 'error' : 'success'} ${className}`}
      role="status"
      aria-live="polite"
    >
      {isError && (
        <div className="result-error-badge">
          {errorBadge || t('common.errorBadge')}
        </div>
      )}
      {result && <div className="result-title">{result}</div>}
      {status && <div className="result-status">{status}</div>}
      {detail && <div className="result-detail">{detail}</div>}
    </div>
  );
}
