import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeartPulse, FaCalculator, FaClock, FaGraduationCap } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './HomePage.css';

export default function HomePage() {
  const { t } = useLanguage();

  const categories = useMemo(
    () => [
      {
        id: 'health',
        title: t('home.categories.healthTitle'),
        icon: <FaHeartPulse />,
        calculators: [
          {
            path: '/saglik/boy-kilo-endeksi',
            title: t('home.cards.bmiTitle'),
            desc: t('home.cards.bmiDesc'),
            icon: '⚖️',
          },
          {
            path: '/saglik/metabolizma-hizi',
            title: t('home.cards.bmrTitle'),
            desc: t('home.cards.bmrDesc'),
            icon: '🔥',
          },
        ],
      },
      {
        id: 'mathematics',
        title: t('home.categories.mathTitle'),
        icon: <FaCalculator />,
        calculators: [
          {
            path: '/matematik/alan-hesaplama',
            title: t('home.cards.areaTitle'),
            desc: t('home.cards.areaDesc'),
            icon: '📐',
          },
          {
            path: '/matematik/hacim-hesaplama',
            title: t('home.cards.volumeTitle'),
            desc: t('home.cards.volumeDesc'),
            icon: '🧊',
          },
        ],
      },
      {
        id: 'time',
        title: t('home.categories.timeTitle'),
        icon: <FaClock />,
        calculators: [
          {
            path: '/zaman/yas-hesaplama',
            title: t('home.cards.ageTitle'),
            desc: t('home.cards.ageDesc'),
            icon: '⏳',
          },
        ],
      },
      {
        id: 'education',
        title: t('home.categories.eduTitle'),
        icon: <FaGraduationCap />,
        calculators: [
          {
            path: '/egitim/vize-final-hesaplama',
            title: t('home.cards.gradeTitle'),
            desc: t('home.cards.gradeDesc'),
            icon: '🎓',
          },
        ],
      },
    ],
    [t]
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <span className="home-badge">{t('home.badge')}</span>
        <h1 className="home-hero-title">
          Hesap<span className="highlight">Kitap</span>
        </h1>
        <p className="home-hero-desc">
          {t('home.desc')}
        </p>
      </section>

      {/* Categorized Calculator Cards */}
      <div className="home-categories">
        {categories.map((cat) => (
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
                    <span>{t('home.cards.action')}</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact & Feedback Section */}
      <section className="home-footer-connect" aria-label={t('home.contact.title')}>
        <div className="home-footer-text">
          <h3>{t('home.contact.title')}</h3>
          <p>{t('home.contact.desc')}</p>
        </div>
        <div className="home-social-links">
          <a
            href="https://github.com/MBasaran4/HesapKitap"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label={t('home.contact.githubAria')}
            title={t('home.contact.githubTitle')}
          >
            <FaGithub />
          </a>
          <a
            href="mailto:basaranmucahit785@gmail.com"
            className="social-btn"
            aria-label={t('home.contact.emailAria')}
            title={t('home.contact.emailTitle')}
          >
            <FiMail />
          </a>
          <a
            href="https://www.linkedin.com/in/mücahit-başaran/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label={t('home.contact.linkedinAria')}
            title={t('home.contact.linkedinTitle')}
          >
            <FaLinkedin />
          </a>
        </div>
      </section>
    </div>
  );
}
