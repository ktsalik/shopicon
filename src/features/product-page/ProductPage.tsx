import './ProductPage.scss';
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalizeDashes } from '../../helpers';
import { store } from '../../app/store';
import cartSlice from '../cart/cartSlice';
import notificationSlice from '../notification/notificationSlice';
import anime from 'animejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [imageSelected, setImageSelected] = useState<string>('');
  const [visibleTab, setVisibleTab] = useState<string>('description');
  const [fetching, setFetching] = useState<Boolean>(true);

  const params = useParams();

  const onTabClick = (tab: string) => {
    setVisibleTab(tab);
  };

  const changeImage = (image: string) => {
    setImageSelected(image);
  };

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  useEffect(() => {
    if (product) {
      setImageSelected(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
  }, [params.id]);

  const getProduct = () => {
    setFetching(true);
    fetch(`https://dummyjson.com/products/${params.productId}`).then((response) => {
      response.json().then((data) => {
        setProduct(data);
        setFetching(false);
      });
    });
  };

  const productInfoElRef = useRef<HTMLDivElement>(null);

  const addToCart = async () => {
    store.dispatch(cartSlice.actions.add(product));
    store.dispatch(notificationSlice.actions.create({
      id: Math.random().toString().slice(-5),
      type: 'info',
      text: `Product added to your cart`,
    }));

    const productImageCloneEl: any = productInfoElRef.current?.querySelector('.image img')?.cloneNode();
    if (productImageCloneEl) {
      const productInfoElPos = productInfoElRef.current?.querySelector('.image')?.getBoundingClientRect();
      if (productInfoElPos) {
        const c = productImageCloneEl;
        c.style.position = 'fixed';
        c.style.width = '100px';
        c.style.borderRadius = '10px';
        c.style.opacity = 0;
        c.style.zIndex = 999;
        document.body.append(c);
        c.style.left = (productInfoElPos.left + (productInfoElPos.width / 2)) - (c.offsetWidth / 2) + 'px';
        c.style.top = (productInfoElPos.top + (productInfoElPos.height / 4)) + 'px';
        await new Promise((resolve) => {
          anime({
            targets: c.style,
            opacity: 1,
            easing: 'linear',
            duration: 500,
            complete: resolve,
          });
        });
        const cartIconPos = document.querySelector('.Navbar .btn-cart')?.getBoundingClientRect();
        if (cartIconPos) {
          anime({
            targets: c.style,
            top: cartIconPos.top + 'px',
            left: cartIconPos.left + 'px',
            width: '25px',
            opacity: 0.1,
            easing: 'easeInOutCubic',
            duration: 1000,
            complete: () => {
              productImageCloneEl.remove();
            },
          });
        }
      }
    }
  };

  return (
    <div
      className="ProductPage"
    >
      {
        product
          ? <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/categories">Categories</Link>
              <span>/</span>
              <Link to={`/products/${product.category}`}>
                {capitalizeDashes(product.category)}
              </Link>
              <span>/</span>
              <span>{product.title}</span>
            </div>
          : ''
      }

      {
        fetching && <div className="w-100 h-100 d-flex flex-direction-column justify-content-center align-items-center" style={{flex: '1', color: '#AAAAAA'}}>
          <FontAwesomeIcon icon={faBoxOpen} size="4x" />
          <span style={{marginTop: '20px'}}>Unpacking product</span>
        </div>
      }
      
      {
        !fetching && product
          ? <div className="product-info" ref={productInfoElRef}>
              <div className="images">
                <div className="thumbnails">
                  {
                    product.images.map((image: string, i: number) => {
                      return (
                        <div key={i} className={`thumbnail ${imageSelected === image ? 'selected' : ''}`} style={{ backgroundImage: `url('${image}')`}} onClick={() => changeImage(image)}></div>
                      );
                    })
                  }
                </div>
                <div className="image">
                  <img src={imageSelected}></img>
                </div>
              </div>
              <div className="info">
                <span className="title">{product.title}</span>
                <span className="price">${parseFloat(product.price).toFixed(2)}</span>
                <span className="short-description">{product.description}</span>
                <div className="available">
                  <span className="label">Stock:</span>
                  <span className="value">{product.stock}</span>
                </div>
                <div className="d-flex flex-direction-column mt-2">
                  <input
                    type="number"
                    className="input-quantity"
                    onChange={onQuantityChange}
                    value={quantity}
                    min={1}></input>
                  <button
                    className="btn-add-to-cart"
                    onClick={addToCart}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          : ''
      }

      {
        !fetching && product
        ? <div className="product-details">
            <div className="tabs">
              <div
                className={`${visibleTab === 'description' ? 'selected' : ''}`}
                onClick={() => onTabClick('description')}
              >
                Description
              </div>
              <div
                className={`${visibleTab === 'details' ? 'selected' : ''}`}
                onClick={() => onTabClick('details')}
              >
                Details
              </div>
            </div>
            <div className="tab-content">
              <div className={`description ${visibleTab === 'description' ? '' : 'd-none'}`}>
                {product.description}
              </div>
              <div className={`details ${visibleTab === 'details' ? '' : 'd-none'}`}>
                <div className="labels">
                  <span>Brand</span>
                  <span>Rating</span>
                </div>
                <div className="values">
                  <span>{product.brand}</span>
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        : ''
      }
    </div>
  );
};

export default ProductPage;