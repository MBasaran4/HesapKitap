import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--button-color)', marginBottom: '10px' }}>404</h1>
      <h2 style={{ color: 'var(--text-color)', marginBottom: '15px' }}>Sayfa Bulunamadı</h2>
      <p style={{ color: 'var(--text-color)', opacity: 0.8, marginBottom: '25px' }}>
        Aradığınız hesaplayıcı veya sayfa mevcut değil ya da taşınmış olabilir.
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
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
