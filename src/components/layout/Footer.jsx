import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} <strong>HesapKitap</strong>. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
