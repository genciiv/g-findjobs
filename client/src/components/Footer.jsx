import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>G-FindJobs</h2>
            <p>
              Platformë moderne për gjetjen e punës, zhvillimin e faqeve web dhe
              shërbime profesionale të marketingut online.
            </p>
          </div>

          <div className="footer-column">
            <h3>Navigimi</h3>
            <Link to="/">Kryefaqja</Link>
            <Link to="/about">Rreth Nesh</Link>
            <Link to="/contact">Na Kontaktoni</Link>
            <Link to="/login">Identifikohuni</Link>
            <Link to="/register">Regjistrohuni</Link>
          </div>

          <div className="footer-column">
            <h3>Shërbimet</h3>
            <Link to="/services/wordpress-website">WordPress Website</Link>
            <Link to="/services/ecommerce-website">Ecommerce Website</Link>
            <Link to="/services/custom-cms-website">Custom CMS Website</Link>
            <Link to="/services/digital-branding">Digital Branding</Link>
            <Link to="/services/seo-optimizing">SEO Optimizing</Link>
          </div>

          <div className="footer-column">
            <h3>Kontakt</h3>
            <p>Email: info@gfindjobs.com</p>
            <p>Tel: +355 69 000 0000</p>
            <p>Adresa: Tiranë, Shqipëri</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 G-FindJobs. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;