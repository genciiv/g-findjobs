import "../styles/info-pages.css";

const WordpressWebsite = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Web Design</span>
          <h1>WordPress Website</h1>
          <p>
            Ne krijojmë faqe profesionale WordPress për biznese, institucione,
            organizata dhe profesionistë që duan një prezencë serioze online.
            Faqet tona janë të ndërtuara me fokus te dizajni modern, shpejtësia,
            lehtësia e përdorimit dhe optimizimi për pajisje mobile.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Çfarë përfshihet</h2>
            <p>
              Dizajn profesional, strukturë e qartë e faqeve, integrim i
              formularëve të kontaktit, menaxhim i lehtë i përmbajtjes dhe
              konfigurim bazë SEO për motorët e kërkimit.
            </p>
          </div>

          <div className="info-card">
            <h2>Për kë është i përshtatshëm</h2>
            <p>
              Për kompani, shkolla, klinika, studio, agjenci, dyqane të vogla
              dhe këdo që kërkon një faqe prezantuese elegante dhe funksionale.
            </p>
          </div>

          <div className="info-card">
            <h2>Përfitimet</h2>
            <p>
              Kosto më e ulët zhvillimi, kohë e shpejtë realizimi, panel i
              thjeshtë administrimi dhe fleksibilitet për zgjerime në të ardhmen.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Shërbimi ynë</h2>
          <p>
            Ne kujdesemi që faqja juaj WordPress të mos jetë thjesht e bukur,
            por edhe praktike, e shpejtë dhe e ndërtuar për të krijuar besim te
            klientët tuaj.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WordpressWebsite;