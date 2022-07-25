import './Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../app/hooks';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';

const Footer = () => {

  const categories = useAppSelector((state) => state.products.categories);

  return (
    <div className="Footer">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faShop} size="2x" />
            &nbsp;
            <span>Shopicon</span>
          </Link>
        </div>

        <div className="links">
          <h3 className="text-light">Useful Links</h3>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="category-links">
          <h3 className="text-light">Shop Categories</h3>
          {
            categories.filter((category: ProductCategory) => category.parent == 0).map((category: ProductCategory, i: number) => {
              return (
                <Link key={i} to={`products/${category.id}`}>{category.name}</Link>
              );
            })
          }
        </div>

        <div className="contact-info">
          <h3 className="text-light">Contact</h3>
          <span>Phone: +30 210 1234 567</span>
          <span>Email: info@shopicon.com</span>
          <span>Monday - Friday: 10:00-17:00</span>
        </div>
      </div>
      
      <div className="copyright text-light">
        © 2022 shopicon All Rights and Wrongs Reserved
      </div>
    </div>
  );
};

export default Footer;