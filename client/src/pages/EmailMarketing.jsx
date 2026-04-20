import "../styles/info-pages.css";

const EmailMarketing = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Online Marketing</span>
          <h1>E-mail Marketing</h1>
          <p>
            Krijojmë fushata email marketing që ju ndihmojnë të komunikoni më
            mirë me klientët, të promovoni ofertat dhe të rrisni angazhimin.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Çfarë përfshihet</h2>
            <p>
              Newsletter profesional, emaile promocionale, njoftime për oferta,
              përmbajtje informuese dhe email automation bazë.
            </p>
          </div>

          <div className="info-card">
            <h2>Pse është efektiv</h2>
            <p>
              Email marketing mbetet një nga mënyrat më direkte dhe më të
              besueshme për të arritur klientin dhe për të ruajtur lidhjen me të.
            </p>
          </div>

          <div className="info-card">
            <h2>Përfitimet</h2>
            <p>
              Më shumë rikthim klientësh, më shumë shitje dhe komunikim më i
              rregullt me audiencën tuaj.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Qasja jonë</h2>
          <p>
            Ne kujdesemi që çdo email të duket profesional, të ketë strukturë të
            qartë dhe të përshtatet me objektivin e biznesit tuaj.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailMarketing;