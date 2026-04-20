import "../styles/info-pages.css";

const About = () => {
  return (
    <section className="info-page">
      <div className="info-container">
        <div className="info-hero">
          <span className="info-badge">Rreth Nesh</span>
          <h1>G-FindJobs – Platformë moderne për punë dhe zgjidhje digjitale</h1>
          <p>
            G-FindJobs është një platformë profesionale që lidh kandidatët me
            mundësitë më të mira të punës dhe ndihmon kompanitë të gjejnë
            talentin e duhur. Përveç shërbimeve të punësimit, ne ofrojmë edhe
            zgjidhje të avancuara në web design dhe marketing online për biznese
            që duan të rriten në tregun digjital.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h2>Misioni ynë</h2>
            <p>
              Misioni ynë është të krijojmë një urë të fortë mes profesionistëve
              dhe kompanive, duke ofruar një eksperiencë të thjeshtë, të sigurt
              dhe profesionale për kërkimin dhe publikimin e punëve.
            </p>
          </div>

          <div className="info-card">
            <h2>Vizioni ynë</h2>
            <p>
              Synimi ynë është të bëhemi një nga platformat më të besueshme për
              punësim dhe shërbime digjitale, duke mbështetur zhvillimin e
              karrierës dhe transformimin online të bizneseve.
            </p>
          </div>

          <div className="info-card">
            <h2>Pse të na zgjidhni</h2>
            <p>
              Ne kombinojmë teknologjinë, dizajnin profesional dhe funksionalitetin
              praktik për të krijuar një platformë të dobishme si për kandidatët,
              ashtu edhe për kompanitë. Te G-FindJobs fokusi është te cilësia,
              lehtësia e përdorimit dhe paraqitja serioze.
            </p>
          </div>

          <div className="info-card">
            <h2>Çfarë ofrojmë</h2>
            <p>
              Ofrim të punëve sipas kategorive, aplikime të thjeshta, menaxhim
              të njoftimeve për kompanitë, si dhe shërbime profesionale si
              WordPress websites, ecommerce websites, custom CMS platforms,
              digital branding, email marketing, social media marketing dhe SEO.
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2>Vlerat tona</h2>
          <ul className="info-list">
            <li>Profesionalizëm në paraqitje dhe në shërbim</li>
            <li>Besueshmëri në komunikim dhe menaxhim të të dhënave</li>
            <li>Rritje reale për kandidatët dhe bizneset</li>
            <li>Zgjidhje moderne dhe të përshtatura sipas nevojës</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;