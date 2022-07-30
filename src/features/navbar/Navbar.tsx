import './Navbar.css';
import React, { useEffect, useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCaretRight, faShop, faHeart, faSearch, faClose, faUser, faCircleDot, faCircle, faShoppingCart, faSignInAlt, faFileCircleCheck, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';
import { useAppSelector } from '../../app/hooks';
import SearchModal from '../search-modal/SearchModal';
import Cart from '../cart/Cart';

interface NavbarComponentProps {
  onTypeChange: any;
};

const Navbar = (props: NavbarComponentProps) => {
  const [showSearchModal, setShowSearchModal] = useState<Boolean>(false);
  const [openCart, setOpenCart] = useState<Boolean>(false);

  const type = useAppSelector((state) => state.navbar.type);

  const cartElRef = React.useRef<HTMLDivElement>(null);
  const navbarElRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarElRef.current) {
      navbarElRef.current.querySelector('.dropdown')?.addEventListener('mouseover', function() {
        if (navbarElRef.current) {
          navbarElRef.current.querySelector('.dropdown__menu')?.classList.remove('d-none');
        }
      });
    }
  }, []);

  const closeCategoriesMenu = () => {
    if (navbarElRef.current) {
      navbarElRef.current.querySelector('.dropdown__menu')?.classList.add('d-none');
    }
  };

  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  const closeCart = () => {
    setOpenCart(false);
  };

  const categories = useAppSelector((state) => state.products.categories);

  return (
    <div className={`Navbar ${type}`} ref={navbarElRef}>
      <div className="content">
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faShop} size="2x" />
            &nbsp;
            <span>Shopicon</span>
          </Link>
        </div>

        <div
          className="menu"
        >
          <Link to="/" className="text-dark">Home</Link>
          
          <div className="dropdown">
            <Link to="/categories" className="text-dark">Products</Link>
            
            <div className="dropdown__menu">
              {
                categories.filter((category: ProductCategory) => category.parent == 0).map((category: ProductCategory, i: number) => {
                  const childCategoriesExist = categories.some((c: ProductCategory) => c.parent === category.id);
                  const clickUrl = childCategoriesExist ? `/categories/${category.id}` : `/products/${category.id}`;
                  
                  return (
                    <div
                      className="dropdown__item"
                      key={i}
                      onClick={closeCategoriesMenu}
                    >
                      <Link to={clickUrl} className="text-dark">
                        {category.name}
                        {
                          childCategoriesExist
                            ? <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
                            : ''
                        }
                      </Link>
                      
                      {
                        childCategoriesExist
                          ? <div className="submenu">
                              {
                                categories.filter((c: ProductCategory) => c.parent === category.id).map((c: ProductCategory, i: number) => {
                                  const childCategoriesExist = categories.some((cat: ProductCategory) => cat.parent === c.id);
                                  const clickUrl = childCategoriesExist ? `/categories/${c.id}` : `/products/${c.id}`;

                                  return (
                                    <Link key={i} to={clickUrl} className="text-dark" onClick={closeCategoriesMenu}>{c.name}</Link>
                                  );
                                })
                              }
                            </div>
                          : ''
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
          <Link to="/blog" className="text-dark">Blog</Link>
          <Link to="/contact" className="text-dark">Contact Us</Link>
        </div>
        
        <div className="right-menu">
          <div className="btn-search" onClick={openSearchModal}>
            <FontAwesomeIcon icon={faSearch} size="lg" className="text-dark" />
          </div>

          <div className="btn-favourites">
            <FontAwesomeIcon icon={faHeart} size="lg" className="text-dark" />
          </div>

          <div className="btn-sign-in">
            <FontAwesomeIcon icon={faUser} size="lg" className="text-dark" />
            
            <div className="user-dropdown-menu">
              <Link to="/" className="text-dark">
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Sign In</span>
              </Link>
              <Link to="/" className="text-dark">
                <FontAwesomeIcon icon={faUserCheck} />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>

          <div className="btn-cart" onClick={() => setOpenCart(true)}>
            <span className="products-count-badge">0</span>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-dark" />
          </div>

          <div className="btn-change-navbar-type">
            {
              type === 'normal'
                ? <FontAwesomeIcon icon={faCircle} size="xs" className="text-dark" onClick={() => props.onTypeChange('fixed')} />
                : type === 'fixed'
                    ? <FontAwesomeIcon icon={faCircleDot} size="xs" className="text-dark" onClick={() => props.onTypeChange('normal')} />
                    : ''
            }
          </div>
        </div>
      </div>

      <SearchModal open={showSearchModal} onClose={closeSearchModal} />

      <Cart open={openCart} onClose={closeCart} />
    </div>
  );
};

export default Navbar;