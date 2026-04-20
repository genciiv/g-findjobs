import "../styles/info-pages.css";

const SocialMediaMarketing = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Online Marketing</span>
          <h1>Social Media Marketing</h1>
          <p>
            Ndihmojmë biznesin tuaj të ketë një prezencë më të fortë në rrjetet
            sociale përmes përmbajtjes së strukturuar, strategjisë së qartë dhe
            komunikimit profesional me audiencën.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Përmbajtje profesionale</h2>
            <p>
              Planifikim postimesh, ide kreative, përshkrime profesionale dhe
              strukturë që përputhet me brandin tuaj.
            </p>
          </div>

          <div className="info-card">
            <h2>Rritje e prezencës</h2>
            <p>
              Një menaxhim më i mirë i rrjeteve sociale ndihmon që biznesi juaj
              të jetë më i dukshëm dhe më i besueshëm.
            </p>
          </div>

          <div className="info-card">
            <h2>Angazhim më i lartë</h2>
            <p>
              Postime të menduara mirë ndihmojnë në rritjen e komenteve,
              mesazheve, ndërveprimit dhe interesit për markën tuaj.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Fokusi ynë</h2>
          <p>
            Që rrjetet sociale të mos jenë vetëm prezencë, por një kanal real
            për komunikim, promocion dhe rritje.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaMarketing;