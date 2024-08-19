import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Body from './Body';
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <Analytics/>
      <SpeedInsights/>

      <div className='navBar'>
        <a href="https://hesap-kitap.vercel.app"><h1>Hesap<span className='kitap'>Kitap</span></h1></a>
        <div className='menu'>
          <li>
            <a className='title'>Sağlık</a>
            <div className='nalt'>
              <a href="https://boy-kilo-endeks.vercel.app">Boy Kilo Endeksi Hesap</a>
              <a href="https://metabolizma-hesap.vercel.app">Metobalizma Hızı Hesap</a>
            </div>
          </li>
          <li>
            <a className='title'>Matematik</a>
            <div className='nalt'>
              <a href="">Yakında..</a>
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