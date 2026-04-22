import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  "IT & Software",
  "Marketing & Media",
  "Graphic Design",
  "Sales & Business",
  "Finance",
  "Administration",
  "Education",
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

const whyChooseUs = [
  {
    title: "Platformë profesionale",
    description:
      "Ndërtuar me fokus te eksperienca e përdoruesit, funksionaliteti dhe paraqitja serioze.",
  },
  {
    title: "Kërkim më i shpejtë i punës",
    description:
      "Filtra, kategori dhe rezultate më të qarta për të gjetur më shpejt mundësinë e duhur.",
  },
  {
    title: "Zgjidhje për bizneset",
    description:
      "Përveç punësimit, ofrojmë edhe website dhe marketing për rritjen e prezencës online.",
  },
];

const steps = [
  {
    title: "Krijo llogarinë",
    description:
      "Regjistrohu si kandidat ose kompani dhe plotëso të dhënat kryesore.",
  },
  {
    title: "Eksploro ose posto",
    description:
      "Kandidatët kërkojnë punë, ndërsa kompanitë publikojnë pozicione të reja.",
  },
  {
    title: "Lidhu me mundësinë",
    description:
      "Apliko, menaxho kandidatë dhe krijo më shumë mundësi reale për bashkëpunim.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    search: "",
    location: "",
    category: "",
    jobType: "",
  });

  const handleChange = (e) => {
    setSearchData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (searchData.search.trim()) {
      queryParams.append("search", searchData.search.trim());
    }

    if (searchData.location.trim()) {
      queryParams.append("location", searchData.location.trim());
    }

    if (searchData.category.trim()) {
      queryParams.append("category", searchData.category.trim());
    }

    if (searchData.jobType.trim()) {
      queryParams.append("jobType", searchData.jobType.trim());
    }

    navigate(`/jobs?${queryParams.toString()}`);
  };

  const openCategory = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="home-container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">
              Platformë moderne për punë dhe shërbime digjitale
            </span>

            <h1>
              Gjej punën e duhur ose ndërto prezencën tënde online me
              <span> G-FindJobs</span>
            </h1>

            <p>
              G-FindJobs lidh profesionistët me mundësitë më të mira të punës
              dhe ndihmon bizneset të rriten përmes web design dhe marketingut
              online.
            </p>

            <div className="hero-actions">
              <Link to="/jobs" className="hero-btn primary-btn">
                Shiko të gjitha punët
              </Link>

              <Link to="/register" className="hero-btn secondary-btn">
                Regjistrohu Tani
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
              <p>
                Gjej pozicionin ideal sipas profesionit, qytetit, kategorisë dhe tipit të punës.
              </p>

              <form className="job-search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="search"
                  placeholder="Shkruaj pozicionin, p.sh. Frontend Developer"
                  value={searchData.search}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Qyteti, p.sh. Tirane"
                  value={searchData.location}
                  onChange={handleChange}
                />

                <select
                  name="category"
                  value={searchData.category}
                  onChange={handleChange}
                >
                  <option value="">Zgjidh kategorinë</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  name="jobType"
                  value={searchData.jobType}
                  onChange={handleChange}
                >
                  <option value="">Zgjidh tipin e punës</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>

                <button type="submit">Kërko Tani</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section">
        <div className="home-container trusted-wrapper">
          <p>
            Kërkohet nga profesionistë dhe biznese që duan prezencë serioze online
          </p>

          <div className="trusted-logos">
            <span>TechVision</span>
            <span>Creative Studio</span>
            <span>Alba Digital</span>
            <span>Next Solution</span>
            <span>MarketPro</span>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Why Choose Us</span>
            <h2>Pse G-FindJobs është zgjedhja e duhur</h2>
            <p>
              Krijuar për kandidatët dhe kompanitë që kërkojnë një përvojë më të
              qartë, më moderne dhe më profesionale.
            </p>
          </div>

          <div className="why-grid">
            {whyChooseUs.map((item, index) => (
              <div className="why-card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">How It Works</span>
            <h2>Si funksionon platforma</h2>
            <p>
              Vetëm disa hapa të thjeshtë për të nisur udhëtimin tënd në G-FindJobs.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-number">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="front-jobs-preview-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Punët më të kërkuara</span>
            <h2>Eksploro punët direkt nga kryefaqja</h2>
            <p>
              Mund të shohësh mundësitë më të fundit dhe më pas të vazhdosh te
              faqja e plotë e punëve për filtra, kërkim dhe renditje.
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
                  <Link to="/jobs" className="apply-btn">
                    Shiko Punët
                  </Link>
                  <Link to="/jobs" className="details-btn">
                    Më shumë
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="front-jobs-cta">
            <Link to="/jobs" className="hero-btn primary-btn">
              Hape faqen e plotë të punëve
            </Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="home-container">
          <div className="section-head">
            <span className="section-label">Kategoritë</span>
            <h2>Eksploro fusha të ndryshme punësimi</h2>
            <p>
              Kliko një kategori dhe shiko menjëherë punët e asaj fushe.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <button
                type="button"
                className="category-card category-clickable"
                key={index}
                onClick={() => openCategory(category)}
              >
                <h3>{category}</h3>
                <p>Shiko njoftime dhe mundësi të reja në këtë kategori.</p>
              </button>
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
                Regjistrohu si kandidat ose si kompani dhe nis menjëherë përdorimin
                e platformës.
              </p>
            </div>

            <div className="cta-actions">
              <Link to="/register" className="hero-btn primary-btn">
                Regjistrohu
              </Link>

              <Link to="/jobs" className="hero-btn secondary-btn">
                Shiko Punët
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;