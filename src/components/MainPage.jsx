 import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Body from './Body';
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";

function MainPage() {
  // URL'deki tema parametresini al ve localStorage'a kaydet
  const getThemeFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    if (theme) {
      localStorage.setItem('theme', theme);
      return theme;
    }
    return localStorage.getItem('theme') || 'light'; // Varsayılan olarak light mode
  };

  const [isLightMode, setIsLightMode] = useState(getThemeFromURL() === 'light');

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
    document.body.classList.toggle('dark-mode', !isLightMode);
  }, [isLightMode]);

  const handleThemeChange = () => {
    const newTheme = !isLightMode ? 'light' : 'dark';
    setIsLightMode(!isLightMode);
    localStorage.setItem('theme', newTheme);

    // URL'i güncelle ve tema parametresini ekle
    const url = new URL(window.location);
    url.searchParams.set('theme', newTheme);
    window.history.replaceState({}, '', url);
  };

  return (
    <div>
      <div className='navBar'>
        <a href="http://localhost:5173/"><h1>Hesap<span className='kitap'>Kitap</span></h1></a>
        <div className='menu'>
          <li>
            <a className='title'>Sağlık</a>
            <div className='nalt'>
              <a href="http://localhost:5174?theme={isLightMode ? 'light' : 'dark'}">Boy Kilo Endeksi Hesap</a>
              <a href="http://localhost:5175?theme={isLightMode ? 'light' : 'dark'}">Metobalizma Hızı Hesap</a>
              <a href="">Günlük Su İhtiyacı Hesap</a>
            </div>
          </li>
          <li>
            <a className='title'>Matematik</a>
            <div className='nalt'>
              <a href="">Karekök Hesap</a>
            </div>
          </li>
        </div>
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-checkbox"
            checked={isLightMode}
            onChange={handleThemeChange}
          />
          <label htmlFor="theme-checkbox">
            <div></div>
            <span>
              <MdOutlineWbSunny/>
            </span>
            <span>
              <FaMoon/>
            </span>
          </label>
        </div>
      </div>

      <div className='body'>
        <Body />
      </div>
    </div>
  );
}

export default MainPage;
