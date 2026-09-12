import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-layout">
      <Analytics />
      <SpeedInsights />
      <header className="header">
        <Navbar />
      </header>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
