import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoMenu, IoClose, IoHomeOutline } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const { isLightMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const hamburgerButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and manage ESC key / window resize / focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        hamburgerButtonRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      // Move focus into the drawer close button for keyboard accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    hamburgerButtonRef.current?.focus();
  };

  return (
    <>
      <nav className="navBar" aria-label={t('navbar.mainNav')}>
        <div className="nav-left">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <h1>
              Hesap<span className="kitap">Kitap</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="menu">
          <li>
            <span className="title">{t('navbar.health')}</span>
            <div className="nalt">
              <NavLink to="/saglik/boy-kilo-endeksi">{t('navbar.bmi')}</NavLink>
              <NavLink to="/saglik/metabolizma-hizi">{t('navbar.bmr')}</NavLink>
            </div>
          </li>
          <li>
            <span className="title">{t('navbar.mathematics')}</span>
            <div className="nalt">
              <NavLink to="/matematik/alan-hesaplama">{t('navbar.area')}</NavLink>
              <NavLink to="/matematik/hacim-hesaplama">{t('navbar.volume')}</NavLink>
            </div>
          </li>
          <li>
            <span className="title">{t('navbar.time')}</span>
            <div className="nalt">
              <NavLink to="/zaman/yas-hesaplama">{t('navbar.age')}</NavLink>
            </div>
          </li>
          <li>
            <span className="title">{t('navbar.education')}</span>
            <div className="nalt">
              <NavLink to="/egitim/vize-final-hesaplama">{t('navbar.grade')}</NavLink>
            </div>
          </li>
        </ul>

        {/* Right side controls: Desktop language switcher, Desktop theme switch & Mobile Hamburger button */}
        <div className="nav-right">
          {/* Desktop Language Switcher */}
          <div
            className="lang-switcher desktop-lang-switcher"
            role="group"
            aria-label={t('accessibility.selectLanguage')}
          >
            <button
              type="button"
              className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
              onClick={() => setLanguage('tr')}
              aria-pressed={language === 'tr'}
            >
              TR
            </button>
            <span className="lang-divider" aria-hidden="true">|</span>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <div className="theme-switch desktop-theme-switch" id="theme-switch-container">
            <input
              type="checkbox"
              id="theme-checkbox"
              checked={isLightMode}
              onChange={toggleTheme}
              aria-label={t('accessibility.changeTheme')}
            />
            <label
              htmlFor="theme-checkbox"
              title={isLightMode ? t('navbar.switchToDark') : t('navbar.switchToLight')}
            >
              <div></div>
              <span>
                <MdOutlineWbSunny />
              </span>
              <span>
                <FaMoon />
              </span>
            </label>
          </div>

          <button
            ref={hamburgerButtonRef}
            type="button"
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-drawer"
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-backdrop ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Modern Mobile Drawer */}
      <aside
        id="mobile-drawer"
        className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('navbar.mobileMenu')}
      >
        <div className="drawer-header">
          <Link to="/" className="drawer-logo" onClick={closeMenu}>
            <h2>
              Hesap<span className="kitap">Kitap</span>
            </h2>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="drawer-close-btn"
            onClick={closeMenu}
            aria-label={t('navbar.closeMenu')}
          >
            <IoClose />
          </button>
        </div>

        <div className="drawer-content">
          {/* Mobile Language Switcher (inside drawer top) */}
          <div className="drawer-lang-section">
            <span className="drawer-lang-label">{t('accessibility.selectLanguage')}</span>
            <div
              className="lang-switcher drawer-lang-switcher"
              role="group"
              aria-label={t('accessibility.selectLanguage')}
            >
              <button
                type="button"
                className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
                onClick={() => setLanguage('tr')}
                aria-pressed={language === 'tr'}
              >
                TR
              </button>
              <span className="lang-divider" aria-hidden="true">|</span>
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
          </div>

          {/* Ana Sayfa */}
          <div className="drawer-section">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `drawer-link home-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <IoHomeOutline className="drawer-link-icon" />
              <span>{t('common.home')}</span>
            </NavLink>
          </div>

          {/* Sağlık */}
          <div className="drawer-section">
            <div className="drawer-section-title">{t('navbar.health')}</div>
            <NavLink
              to="/saglik/boy-kilo-endeksi"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.bmi')}
            </NavLink>
            <NavLink
              to="/saglik/metabolizma-hizi"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.bmr')}
            </NavLink>
          </div>

          {/* Matematik */}
          <div className="drawer-section">
            <div className="drawer-section-title">{t('navbar.mathematics')}</div>
            <NavLink
              to="/matematik/alan-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.area')}
            </NavLink>
            <NavLink
              to="/matematik/hacim-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.volume')}
            </NavLink>
          </div>

          {/* Zaman */}
          <div className="drawer-section">
            <div className="drawer-section-title">{t('navbar.time')}</div>
            <NavLink
              to="/zaman/yas-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.age')}
            </NavLink>
          </div>

          {/* Eğitim */}
          <div className="drawer-section">
            <div className="drawer-section-title">{t('navbar.education')}</div>
            <NavLink
              to="/egitim/vize-final-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {t('navbar.grade')}
            </NavLink>
          </div>
        </div>

        <div className="drawer-footer">
          <span className="drawer-theme-label">
            {isLightMode ? t('navbar.lightTheme') : t('navbar.darkTheme')}
          </span>
          <div className="theme-switch drawer-theme-switch">
            <input
              type="checkbox"
              id="theme-checkbox-drawer"
              checked={isLightMode}
              onChange={toggleTheme}
              aria-label={t('accessibility.changeThemeMobile')}
            />
            <label
              htmlFor="theme-checkbox-drawer"
              title={isLightMode ? t('navbar.switchToDark') : t('navbar.switchToLight')}
            >
              <div></div>
              <span>
                <MdOutlineWbSunny />
              </span>
              <span>
                <FaMoon />
              </span>
            </label>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
