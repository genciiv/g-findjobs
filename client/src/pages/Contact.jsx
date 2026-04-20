import "../styles/info-pages.css";

const Contact = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Na Kontaktoni</span>
          <h1>Le të flasim për projektin ose nevojën tuaj</h1>
          <p>
            Nëse jeni kandidat që kërkoni punë, kompani që dëshironi të publikoni
            njoftime pune, ose biznes që kërkon një website profesional apo
            marketing digjital, ekipi i G-FindJobs është gati t’ju ndihmojë.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Email</h2>
            <p>
              Na shkruani për pyetje, bashkëpunime ose kërkesa specifike te:
              <br />
              <strong>info@gfindjobs.com</strong>
            </p>
          </div>

          <div className="info-card">
            <h2>Telefon</h2>
            <p>
              Për komunikim më të shpejtë mund të na kontaktoni në:
              <br />
              <strong>+355 69 000 0000</strong>
            </p>
          </div>

          <div className="info-card">
            <h2>Adresa</h2>
            <p>
              Jemi të disponueshëm për bashkëpunime dhe konsultime në:
              <br />
              <strong>Tiranë, Shqipëri</strong>
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Për çfarë mund të na kontaktoni</h2>
          <ul className="info-list">
            <li>Publikim punësh dhe menaxhim kandidatësh</li>
            <li>Krijim websitesh profesionale</li>
            <li>Ecommerce dhe platforma të personalizuara</li>
            <li>Digital branding dhe marketing online</li>
            <li>Konsultim për prezencën digjitale të biznesit</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;