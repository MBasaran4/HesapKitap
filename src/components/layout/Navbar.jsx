import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoMenu, IoClose, IoHomeOutline } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

function Navbar() {
  const { isLightMode, toggleTheme } = useTheme();
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
      <nav className="navBar" aria-label="Ana Gezinme">
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
            <span className="title">Sağlık</span>
            <div className="nalt">
              <NavLink to="/saglik/boy-kilo-endeksi">Boy Kilo Endeksi Hesap</NavLink>
              <NavLink to="/saglik/metabolizma-hizi">Metabolizma Hızı Hesap</NavLink>
            </div>
          </li>
          <li>
            <span className="title">Matematik</span>
            <div className="nalt">
              <NavLink to="/matematik/alan-hesaplama">Alan Hesaplama</NavLink>
              <NavLink to="/matematik/hacim-hesaplama">Hacim Hesaplama</NavLink>
            </div>
          </li>
          <li>
            <span className="title">Zaman</span>
            <div className="nalt">
              <NavLink to="/zaman/yas-hesaplama">Yaş Hesaplama</NavLink>
            </div>
          </li>
          <li>
            <span className="title">Eğitim</span>
            <div className="nalt">
              <NavLink to="/egitim/vize-final-hesaplama">Vize Final Hesaplama</NavLink>
            </div>
          </li>
        </ul>

        {/* Right side controls: Desktop theme switch & Mobile Hamburger button */}
        <div className="nav-right">
          <div className="theme-switch desktop-theme-switch" id="theme-switch-container">
            <input
              type="checkbox"
              id="theme-checkbox"
              checked={isLightMode}
              onChange={toggleTheme}
              aria-label="Tema Değiştir"
            />
            <label htmlFor="theme-checkbox" title={isLightMode ? 'Karanlık moda geç' : 'Aydınlık moda geç'}>
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
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
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
        aria-label="Mobil Menü"
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
            aria-label="Menüyü kapat"
          >
            <IoClose />
          </button>
        </div>

        <div className="drawer-content">
          {/* Ana Sayfa */}
          <div className="drawer-section">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `drawer-link home-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <IoHomeOutline className="drawer-link-icon" />
              <span>Ana Sayfa</span>
            </NavLink>
          </div>

          {/* Sağlık */}
          <div className="drawer-section">
            <div className="drawer-section-title">Sağlık</div>
            <NavLink
              to="/saglik/boy-kilo-endeksi"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Boy-Kilo Endeksi
            </NavLink>
            <NavLink
              to="/saglik/metabolizma-hizi"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Metabolizma Hızı
            </NavLink>
          </div>

          {/* Matematik */}
          <div className="drawer-section">
            <div className="drawer-section-title">Matematik</div>
            <NavLink
              to="/matematik/alan-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Alan Hesaplama
            </NavLink>
            <NavLink
              to="/matematik/hacim-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Hacim Hesaplama
            </NavLink>
          </div>

          {/* Zaman */}
          <div className="drawer-section">
            <div className="drawer-section-title">Zaman</div>
            <NavLink
              to="/zaman/yas-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Yaş Hesaplama
            </NavLink>
          </div>

          {/* Eğitim */}
          <div className="drawer-section">
            <div className="drawer-section-title">Eğitim</div>
            <NavLink
              to="/egitim/vize-final-hesaplama"
              className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Vize-Final Hesaplama
            </NavLink>
          </div>
        </div>

        <div className="drawer-footer">
          <span className="drawer-theme-label">
            {isLightMode ? 'Aydınlık Tema' : 'Karanlık Tema'}
          </span>
          <div className="theme-switch drawer-theme-switch">
            <input
              type="checkbox"
              id="theme-checkbox-drawer"
              checked={isLightMode}
              onChange={toggleTheme}
              aria-label="Tema Değiştir (Mobil)"
            />
            <label htmlFor="theme-checkbox-drawer" title={isLightMode ? 'Karanlık moda geç' : 'Aydınlık moda geç'}>
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
