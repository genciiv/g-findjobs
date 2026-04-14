import { Link } from "react-router-dom";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <div className="dropdown-section">
        <h4>Web Design</h4>
        <Link to="#">WordPress Website</Link>
        <Link to="#">Ecommerce Website</Link>
        <Link to="#">Custom CMS Website</Link>
      </div>

      <div className="dropdown-section">
        <h4>Online Marketing</h4>
        <Link to="#">Digital Branding</Link>
        <Link to="#">E-mail Marketing</Link>
        <Link to="#">Social Media Marketing</Link>
        <Link to="#">SEO Optimizing</Link>
      </div>
    </div>
  );
};

export default Dropdown;