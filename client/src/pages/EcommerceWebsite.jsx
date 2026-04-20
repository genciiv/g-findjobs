import "../styles/info-pages.css";

const EcommerceWebsite = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Web Design</span>
          <h1>Ecommerce Website</h1>
          <p>
            Ndërtojmë dyqane online moderne që ndihmojnë biznesin tuaj të
            shesë më shumë, të menaxhojë produktet me lehtësi dhe të krijojë një
            eksperiencë të këndshme për klientët.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Funksionalitetet kryesore</h2>
            <p>
              Menaxhim produktesh, kategori, çmime, porosi, klientë, oferta,
              favorite dhe filtra kërkimi për ta bërë blerjen sa më të thjeshtë.
            </p>
          </div>

          <div className="info-card">
            <h2>Eksperienca e përdoruesit</h2>
            <p>
              Dizajn i pastër, navigim i lehtë, faqe produkti profesionale dhe
              strukturë që ndihmon klientin të arrijë më shpejt te blerja.
            </p>
          </div>

          <div className="info-card">
            <h2>Përfitimet për biznesin</h2>
            <p>
              Rritje e shitjeve online, menaxhim më i mirë i stokut dhe prezencë
              më profesionale në tregun digjital.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Zgjidhje të personalizuara</h2>
          <p>
            Çdo ecommerce website ndërtohet sipas nevojës së biznesit tuaj, në
            mënyrë që të përputhet me produktet, audiencën dhe objektivat që keni.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcommerceWebsite;