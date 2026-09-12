import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BmiPage from './pages/health/BmiPage';
import BmrPage from './pages/health/BmrPage';
import AreaPage from './pages/mathematics/AreaPage';
import VolumePage from './pages/mathematics/VolumePage';
import AgePage from './pages/time/AgePage';
import GradePage from './pages/education/GradePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="saglik/boy-kilo-endeksi" element={<BmiPage />} />
          <Route path="saglik/metabolizma-hizi" element={<BmrPage />} />
          <Route path="matematik/alan-hesaplama" element={<AreaPage />} />
          <Route path="matematik/hacim-hesaplama" element={<VolumePage />} />
          <Route path="zaman/yas-hesaplama" element={<AgePage />} />
          <Route path="egitim/vize-final-hesaplama" element={<GradePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
