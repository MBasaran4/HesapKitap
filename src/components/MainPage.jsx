import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Body from './Body';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from './Navbar';

function MainPage() {
 

  return (
    <div>
      <Analytics/>
      <SpeedInsights/>
      
      <div className='header'>
        <Navbar/>  
      </div>      
      <div className='body'>
        <Body />
      </div>
    </div>
  );
}

export default MainPage;