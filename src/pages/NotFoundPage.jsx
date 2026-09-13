import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--button-color)', marginBottom: '10px' }}>404</h1>
      <h2 style={{ color: 'var(--text-color)', marginBottom: '15px' }}>{t('notFound.title')}</h2>
      <p style={{ color: 'var(--text-color)', opacity: 0.8, marginBottom: '25px' }}>
        {t('notFound.desc')}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--button-color)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
        }}
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}
