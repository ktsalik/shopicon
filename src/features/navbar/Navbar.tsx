import './Navbar.scss';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Link, useNavigate,
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faShop, faHeart, faSearch, faUser, faCircleDot, faCircle, faShoppingCart, faSignInAlt, faUserCheck, faBars, faUserEdit, faUserShield, faMapLocation, faLocationDot, faSearchLocation, faEdit, faBoxesAlt, faHeartCircleCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import SearchModal from '../search-modal/SearchModal';
import Cart from '../cart/Cart';
import { store } from '../../app/store';
import accountSlice from '../account/accountSlice';
import { capitalizeDashes } from '../../helpers';

interface NavbarComponentProps {
  onTypeChange: any;
};

const Navbar = (props: NavbarComponentProps) => {
  const navigate = useNavigate();

  const [showSearchModal, setShowSearchModal] = useState<Boolean>(false);
  const [openCart, setOpenCart] = useState<Boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<Boolean>(false);

  const type = useAppSelector((state) => state.navbar.type);
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const cartProducts = useAppSelector((state) => state.cart.products);

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

  const signOut = () => {
    store.dispatch(accountSlice.actions.logout({}));
    navigate('/sign-in');
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

  const openMobileMenu = () => {
    setShowMobileMenu(true);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
          <Link to="/">Home</Link>
          
          <div className="dropdown">
            <span>Products</span>
            
            <div className="dropdown__menu">
              {
                categories.map((category: any, i: number) => {
                  return (
                    <div
                      className="dropdown__item"
                      key={i}
                      onClick={closeCategoriesMenu}
                    >
                      <Link to={`/products/${category}`}>
                        {capitalizeDashes(category)}
                      </Link>
                    </div>
                  );
                })
              }
            </div>
          </div>

          <Link to="/blog">Blog</Link>
          
          <Link to="/contact">Contact Us</Link>
        </div>
        
        <div className="right-menu">
          <div className="btn-search" onClick={openSearchModal}>
            <FontAwesomeIcon icon={faSearch} size="lg" className="text-dark" />
          </div>

          <div className="btn-favourites">
            <FontAwesomeIcon icon={faHeart} size="lg" className="text-dark" />
          </div>

          <div className="btn-sign-in">
            <FontAwesomeIcon icon={faUser} size="lg" className="btn-toggle-menu" />
            
            <div className="account-dropdown-menu">
              {
                !loggedIn
                  ? <Fragment>
                      <Link to="/sign-in">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span>Sign In</span>
                      </Link>
                      <Link to="/sign-up">
                        <FontAwesomeIcon icon={faUserCheck} />
                        <span>Sign Up</span>
                      </Link>
                    </Fragment>
                  : <Fragment>
                      <Link to="/account">
                        <FontAwesomeIcon icon={faUserEdit} />
                        <span>Details</span>
                      </Link>
                      <Link to="/account">
                        <FontAwesomeIcon icon={faUserShield} />
                        <span>Security</span>
                      </Link>
                      <Link to="/account">
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Addresses</span>
                      </Link>
                      <Link to="/account">
                        <FontAwesomeIcon icon={faBoxesAlt} />
                        <span>Orders</span>
                      </Link>
                      <Link to="/account">
                        <FontAwesomeIcon icon={faHeartCircleCheck} />
                        <span>Wishlist</span>
                      </Link>
                      <button onClick={signOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Sign Out</span>
                      </button>
                    </Fragment>
              }
            </div>
          </div>

          <div className="btn-cart" onClick={() => setOpenCart(true)}>
            <span className="products-count-badge">{cartProducts.length}</span>
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

        <div
          className="btn-mobile-menu"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>

        <div className={`mobile-menu ${showMobileMenu ? 'd-flex' : 'd-none'}`}>
          <Link to="/" onClick={() => closeMobileMenu()}>Home</Link>
          <Link to="/categories" onClick={() => closeMobileMenu()}>Categories</Link>
          <Link to="/blog" onClick={() => closeMobileMenu()}>Blog</Link>
          <Link to="/contact" onClick={() => closeMobileMenu()}>Contact Us</Link>
        </div>
      </div>

      <SearchModal open={showSearchModal} onClose={closeSearchModal} />

      <Cart open={openCart} onClose={closeCart} />
    </div>
  );
};

export default Navbar;