import './CalculatorLayout.css';

export default function CalculatorLayout({
  category,
  title,
  description,
  children,
  result,
  infoTitle = 'Nasıl Hesaplanır?',
  infoContent,
}) {
  return (
    <article className="calculator-page-wrapper">
      <header className="calculator-header-block">
        {category && <span className="calculator-category-badge">{category}</span>}
        <h1 className="calculator-main-title">{title}</h1>
        {description && <p className="calculator-lead-desc">{description}</p>}
      </header>

      <section className="calculator-panel-card">
        <div className="calculator-form-body">
          {children}
        </div>

        {result}
      </section>

      {infoContent && (
        <aside className="calculator-info-section" aria-label="Bilgilendirme">
          <div className="calculator-info-title">
            <span>ℹ️</span> {infoTitle}
          </div>
          <div className="calculator-info-content">
            {infoContent}
          </div>
        </aside>
      )}
    </article>
  );
}
