import './Footer.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { capitalizeDashes } from '../../helpers';

const Footer = () => {

  const categories = useAppSelector((state) => state.products.categories);

  return (
    <div className="Footer">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faShop} size="lg" />
            &nbsp;
            <span>Shopicon</span>
          </Link>
        </div>

        <div className="links">
          <h3 className="text-light">USEFUL LINKS</h3>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="category-links">
          <h3 className="text-light">SHOP CATEGORIES</h3>
          {
            categories.map((category: any, i: number) => {
              return (
                <Link key={i} to={`/products/${category.slug}`}>{capitalizeDashes(category.name)}</Link>
              );
            })
          }
        </div>

        <div className="contact-info">
          <h3 className="text-light">CONTACT</h3>
          <span>Phone: (555) 555-1234</span>
          <span>Email: info@shopicon.com</span>
          <span>Monday - Friday: 10:00-17:00</span>
        </div>
      </div>
      
      <div className="copyright text-light">
        Copyright © {new Date().getFullYear()} shopicon All Rights and Wrongs Reserved
      </div>
    </div>
  );
};

export default Footer;