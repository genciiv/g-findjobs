import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h2 className="footer-logo">G-FindJobs</h2>
            <p className="footer-text">
              Platformë moderne për gjetjen e punës, zhvillimin e faqeve web
              dhe shërbime të marketingut online.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Navigimi</h3>
            <ul className="footer-links">
              <li><Link to="/">Kryefaqja</Link></li>
              <li><Link to="/about">Rreth Nesh</Link></li>
              <li><Link to="/contact">Na Kontaktoni</Link></li>
              <li><Link to="/login">Identifikohuni</Link></li>
              <li><Link to="/register">Regjistrohuni</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Shërbimet</h3>
            <ul className="footer-links">
              <li><Link to="/services/wordpress-website">WordPress Website</Link></li>
              <li><Link to="/services/ecommerce-website">Ecommerce Website</Link></li>
              <li><Link to="/services/custom-cms-website">Custom CMS Website</Link></li>
              <li><Link to="/services/digital-branding">Digital Branding</Link></li>
              <li><Link to="/services/seo-optimizing">SEO Optimizing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Kontakt</h3>
            <ul className="footer-contact">
              <li>Email: info@gfindjobs.com</li>
              <li>Tel: +355 69 000 0000</li>
              <li>Adresa: Tirane, Shqiperi</li>
            </ul>
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