import './Navbar.css';
import React, { useEffect, useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCaretRight, faShop, faHeart, faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';
import { useAppSelector } from '../../app/hooks';
import SearchModal from '../search-modal/SearchModal';

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState<Boolean>(false);

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

  const openModal = () => {
    setShowSearchModal(true);
  };

  const closeModal = () => {
    setShowSearchModal(false);
  };

  const categories = useAppSelector((state) => state.products.categories);

  return (
    <div className="Navbar" ref={navbarElRef}>
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
            <Link to="/categories" className="text-dark">Categories</Link>
            
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
                                  return (
                                    <Link key={i} to={`/products/${c.id}`} className="text-dark" onClick={closeCategoriesMenu}>{c.name}</Link>
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
          <Link to="/contact" className="text-dark">Blog</Link>
          <Link to="/contact" className="text-dark">Contact Us</Link>
        </div>
        
        <div className="right-menu">
          <div className="btn-search" onClick={openModal}>
            <FontAwesomeIcon icon={faSearch} size="lg" className="text-dark" />
          </div>

          <SearchModal open={showSearchModal} onClose={closeModal} />

          <div className="btn-favourites">
            <FontAwesomeIcon icon={faHeart} size="lg" className="text-dark" />
          </div>

          <div className="btn-cart">
            <FontAwesomeIcon icon={faShoppingBasket} size="lg" className="text-dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;