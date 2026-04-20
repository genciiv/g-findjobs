import "../styles/info-pages.css";

const SeoOptimizing = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Online Marketing</span>
          <h1>SEO Optimizing</h1>
          <p>
            Optimizojmë faqen tuaj që të ketë më shumë mundësi të shfaqet në
            rezultatet e kërkimit në Google dhe motorë të tjerë kërkimi.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>SEO On-page</h2>
            <p>
              Strukturë më e mirë titujsh, përmbajtje e optimizuar, URL më të
              qarta dhe organizim teknik më i mirë i faqeve.
            </p>
          </div>

          <div className="info-card">
            <h2>Përmirësim i performancës</h2>
            <p>
              Shpejtësia, përdorshmëria mobile dhe eksperienca e përdoruesit janë
              pjesë shumë e rëndësishme e optimizimit SEO.
            </p>
          </div>

          <div className="info-card">
            <h2>Më shumë trafik organik</h2>
            <p>
              Me një strukturë SEO më të mirë, biznesi juaj ka më shumë mundësi
              të tërheqë vizitorë realë pa u mbështetur vetëm te reklamat.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Rezultati</h2>
          <p>
            Një faqe më e dukshme, më e kuptueshme për Google dhe më e fortë në
            konkurrencën online.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeoOptimizing;