import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeartPulse, FaCalculator, FaClock, FaGraduationCap } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import './HomePage.css';

const CATEGORIES = [
  {
    id: 'health',
    title: 'Sağlık Hesaplayıcıları',
    icon: <FaHeartPulse />,
    calculators: [
      {
        path: '/saglik/boy-kilo-endeksi',
        title: 'Boy Kilo Endeksi (VKİ)',
        desc: 'Vücut kitle indeksinizi, sağlık sınıfınızı ve ideal kilo aralığınızı anında öğrenin.',
        icon: '⚖️',
      },
      {
        path: '/saglik/metabolizma-hizi',
        title: 'Metabolizma Hızı (BMR)',
        desc: 'Harris-Benedict formülü ile günlük bazal kalori ihtiyacınızı ve aktivite çarpanlarını hesaplayın.',
        icon: '🔥',
      },
    ],
  },
  {
    id: 'mathematics',
    title: 'Matematik Hesaplayıcıları',
    icon: <FaCalculator />,
    calculators: [
      {
        path: '/matematik/alan-hesaplama',
        title: 'Alan Hesaplama',
        desc: 'Dikdörtgen, kare, üçgen ve daire alanlarını pratik ve yüksek hassasiyetle hesaplayın.',
        icon: '📐',
      },
      {
        path: '/matematik/hacim-hesaplama',
        title: 'Hacim Hesaplama',
        desc: 'Küp, prizma, küre, silindir, koni ve kare piramit hacimlerini 3 boyutlu formüllerle hesaplayın.',
        icon: '🧊',
      },
    ],
  },
  {
    id: 'time',
    title: 'Zaman Hesaplayıcıları',
    icon: <FaClock />,
    calculators: [
      {
        path: '/zaman/yas-hesaplama',
        title: 'Yaş ve Gün Hesaplama',
        desc: 'Tam yaşınızı (yıl, ay, gün), yaşadığınız toplam gün sayısını ve doğum gününüze kalan süreyi öğrenin.',
        icon: '⏳',
      },
    ],
  },
  {
    id: 'education',
    title: 'Eğitim Hesaplayıcıları',
    icon: <FaGraduationCap />,
    calculators: [
      {
        path: '/egitim/vize-final-hesaplama',
        title: 'Vize Final Not Hesaplama',
        desc: 'Üniversite ve lise dersleriniz için dönem sonu ortalamasını veya geçmek için gereken final notunu hesaplayın.',
        icon: '🎓',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <span className="home-badge">Çok Amaçlı Hesaplama Portalı</span>
        <h1 className="home-hero-title">
          Hesap<span className="highlight">Kitap</span>
        </h1>
        <p className="home-hero-desc">
          Sağlık, matematik, zaman ve eğitim kategorilerinde karmaşık hesaplamaları sizin için
          basit, hızlı ve anlaşılır hale getiren profesyonel araçlar koleksiyonu.
        </p>
      </section>

      {/* Categorized Calculator Cards */}
      <div className="home-categories">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="category-block" aria-labelledby={`cat-${cat.id}`}>
            <div className="category-header">
              <span className="category-icon">{cat.icon}</span>
              <h2 id={`cat-${cat.id}`} className="category-title">{cat.title}</h2>
            </div>

            <div className="category-grid">
              {cat.calculators.map((calc) => (
                <Link key={calc.path} to={calc.path} className="calc-card">
                  <div className="calc-card-top">
                    <div className="calc-card-icon-wrap" aria-hidden="true">
                      {calc.icon}
                    </div>
                    <div>
                      <h3 className="calc-card-title">{calc.title}</h3>
                    </div>
                  </div>
                  <p className="calc-card-desc">{calc.desc}</p>
                  <div className="calc-card-action">
                    <span>Hesapla</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact & Feedback Section */}
      <section className="home-footer-connect" aria-label="İletişim ve Geri Bildirim">
        <div className="home-footer-text">
          <h3>İletişim & Geri Bildirim</h3>
          <p>Yeni hesaplayıcı önerilerinizi ve görüşlerinizi bize iletebilirsiniz.</p>
        </div>
        <div className="home-social-links">
          <a
            href="https://github.com/MBasaran4/HesapKitap"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="GitHub Repository"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:basaranmucahit785@gmail.com"
            className="social-btn"
            aria-label="E-posta"
            title="E-posta ile İletişime Geçin"
          >
            <FiMail />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>
    </div>
  );
}
