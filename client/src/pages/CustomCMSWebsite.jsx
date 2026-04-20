import "../styles/info-pages.css";

const CustomCMSWebsite = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Web Design</span>
          <h1>Custom CMS Website</h1>
          <p>
            Zhvillojmë platforma të personalizuara me CMS sipas proceseve reale
            të biznesit tuaj. Kjo është zgjidhja ideale kur një faqe standarde
            nuk mjafton dhe ju duhet kontroll i plotë mbi përmbajtjen dhe rolet
            e përdoruesve.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Çfarë është Custom CMS</h2>
            <p>
              Një sistem administrimi i ndërtuar sipas nevojës, ku ju mund të
              menaxhoni përmbajtjen, përdoruesit, të dhënat dhe proceset nga një
              panel i personalizuar.
            </p>
          </div>

          <div className="info-card">
            <h2>Kur ju duhet</h2>
            <p>
              Kur keni role të ndryshme përdoruesish, procese specifike, module
              të veçanta ose kërkesa që nuk mbulohen nga platformat standarde.
            </p>
          </div>

          <div className="info-card">
            <h2>Përfitimet</h2>
            <p>
              Fleksibilitet maksimal, siguri më e lartë, performancë më e mirë
              dhe strukturë e ndërtuar posaçërisht për punën tuaj të përditshme.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Shembuj përdorimi</h2>
          <p>
            Portale menaxhimi, platforma edukimi, sisteme punësimi, panele
            administrative për kompani dhe zgjidhje të tjera unike me logjikë të
            personalizuar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomCMSWebsite;