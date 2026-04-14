import { Link } from "react-router-dom";
import "../styles/home.css";

const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechVision Albania",
    location: "Tirane",
    type: "Full Time",
    salary: "80,000 - 120,000 ALL",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Durres",
    type: "Part Time",
    salary: "60,000 - 90,000 ALL",
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    company: "BrandBoost Agency",
    location: "Vlore",
    type: "Remote",
    salary: "70,000 - 100,000 ALL",
  },
];

const categories = [
  "Teknologji & IT",
  "Marketing & Media",
  "Dizajn Grafik",
  "Shitje & Biznes",
  "Financë",
  "Administratë",
  "Edukim",
  "Remote Jobs",
];

const services = [
  {
    title: "WordPress Website",
    description:
      "Faqe profesionale WordPress për kompani, institucione dhe biznese lokale.",
    link: "/services/wordpress-website",
  },
  {
    title: "Ecommerce Website",
    description:
      "Zgjidhje të plota për dyqane online, pagesa, produkte dhe menaxhim porosish.",
    link: "/services/ecommerce-website",
  },
  {
    title: "Custom CMS Website",
    description:
      "Platforma të personalizuara me dashboard, role përdoruesish dhe funksione unike.",
    link: "/services/custom-cms-website",
  },
  {
    title: "Digital Branding",
    description:
      "Ndërtim identiteti digjital që rrit besueshmërinë dhe prezencën online të biznesit.",
    link: "/services/digital-branding",
  },
  {
    title: "E-mail Marketing",
    description:
      "Fushata profesionale email për klientë, promovime dhe komunikim automatik.",
    link: "/services/email-marketing",
  },
  {
    title: "SEO Optimizing",
    description:
      "Optimizim për Google dhe motorë kërkimi që të sjell më shumë vizita organike.",
    link: "/services/seo-optimizing",
  },
];

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="home-container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Platformë moderne për punë dhe shërbime digjitale</span>
            <h1>
              Gjej punën e duhur ose ndërto prezencën tënde online me
              <span> G-FindJobs</span>
            </h1>
            <p>
              G-FindJobs lidh profesionistët me mundësitë më të mira të punës
              dhe ndihmon bizneset të rriten përmes web design dhe marketingut online.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="hero-btn primary-btn">
                Filloni Tani
              </Link>
              <Link to="/contact" className="hero-btn secondary-btn">
                Na Kontaktoni
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <h3>1200+</h3>
                <p>Punë të publikuara</p>
              </div>
              <div className="stat-card">
                <h3>850+</h3>
                <p>Përdorues aktivë</p>
              </div>
              <div className="stat-card">
                <h3>150+</h3>
                <p>Kompani partnere</p>
              </div>
            </div>
          </div>

          <div className="hero-search-box">
            <div className="search-card">
              <h2>Kërko punë</h2>
              <p>Gjej pozicionin ideal sipas profesionit, qytetit dhe kategorisë.</p>

              <form className="job-search-form">
                <input type="text" placeholder="Shkruaj pozicionin, p.sh. Frontend Developer" />
                <input type="text" placeholder="Qyteti, p.sh. Tirane" />
                <select>
                  <option>Zgjidh kategorinë</option>
                  <option>IT & Software</option>
                  <option>Marketing</option>
                  <option>Dizajn</option>
                  <option>Administratë</option>
                </select>
                <button type="button">Kërko Tani</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section">
        <div className="home-container trusted-wrapper">
          <p>Kërkohet nga profesionistë dhe biznese që duan prezencë serioze online</p>
          <div className="trusted-logos">
            <span>TechVision</span>
            <span>Creative Studio</span>
            <span>Alba Digital</span>
            <span>Next Solution</span>
            <span>MarketPro</span>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Kategoritë</span>
            <h2>Eksploro fusha të ndryshme punësimi</h2>
            <p>
              Gjej mundësi pune në sektorë të ndryshëm sipas aftësive dhe interesit tënd.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div className="category-card" key={index}>
                <h3>{category}</h3>
                <p>Shiko njoftime dhe mundësi të reja në këtë kategori.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Punë të veçuara</span>
            <h2>Oportunitetet më të fundit</h2>
            <p>
              Zbuloni pozicionet që janë më të kërkuara nga kompanitë partnere.
            </p>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-card-top">
                  <span className="job-badge">{job.type}</span>
                  <span className="job-location">{job.location}</span>
                </div>

                <h3>{job.title}</h3>
                <p className="job-company">{job.company}</p>
                <p className="job-salary">{job.salary}</p>

                <div className="job-card-actions">
                  <button className="apply-btn">Apliko Tani</button>
                  <button className="details-btn">Më shumë</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Shërbimet</span>
            <h2>Ndërto biznesin tënd me zgjidhje profesionale</h2>
            <p>
              Përveç platformës së punësimit, G-FindJobs ofron edhe zgjidhje web
              dhe marketing për biznese moderne.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link}>Lexo më shumë</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="home-container">
          <div className="cta-box">
            <div>
              <span className="section-label">Gati për të filluar?</span>
              <h2>Krijo llogarinë tënde dhe hyr në botën e mundësive</h2>
              <p>
                Regjistrohu si kandidat ose si kompani dhe nis menjëherë përdorimin e platformës.
              </p>
            </div>

            <div className="cta-actions">
              <Link to="/register" className="hero-btn primary-btn">
                Regjistrohu
              </Link>
              <Link to="/login" className="hero-btn secondary-btn">
                Identifikohu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;