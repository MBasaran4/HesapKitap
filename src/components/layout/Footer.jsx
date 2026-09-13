import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} <strong>HesapKitap</strong>. {t('footer.rightsReserved')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
