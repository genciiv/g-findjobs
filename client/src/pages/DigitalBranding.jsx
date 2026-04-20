import "../styles/info-pages.css";

const DigitalBranding = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Online Marketing</span>
          <h1>Digital Branding</h1>
          <p>
            Ndihmojmë biznesin tuaj të krijojë një identitet të fortë digjital
            që reflekton profesionalizëm, besueshmëri dhe dallim në treg.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Identitet vizual</h2>
            <p>
              Punojmë për paraqitjen e markës suaj në mënyrë të njëtrajtshme në
              website, rrjete sociale dhe materiale promocionale.
            </p>
          </div>

          <div className="info-card">
            <h2>Mesazh i qartë</h2>
            <p>
              Ndërtojmë mënyrën se si biznesi juaj komunikon me klientët për të
              krijuar një imazh të fortë dhe të besueshëm.
            </p>
          </div>

          <div className="info-card">
            <h2>Pse ka rëndësi</h2>
            <p>
              Një brand i fortë rrit njohjen, besimin dhe mundësinë që klientët
              të zgjedhin shërbimin ose produktin tuaj.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Rezultati</h2>
          <p>
            Me digital branding, biznesi juaj duket më serioz, më i qartë dhe
            më profesional në sytë e klientëve potencialë.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalBranding;