import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { store } from '../../app/store';
import cartSlice from '../cart/cartSlice';
import notificationSlice from '../../features/notification/notificationSlice';
import { useRef } from 'react';
import anime from 'animejs';

interface ProductCardComponentInterface {
  type: string;
  data: any;
  className?: string;
};

const ProductCard = (props: ProductCardComponentInterface) => {
  const productCardElRef = useRef<HTMLDivElement>(null);

  const addToCart = async () => {
    store.dispatch(cartSlice.actions.add(props.data));
    store.dispatch(notificationSlice.actions.create({
      id: Math.random().toString().slice(-5),
      type: 'info',
      text: `Product added to your cart`,
    }));

    const productImageCloneEl: any = productCardElRef.current?.querySelector('.image')?.cloneNode();
    if (productImageCloneEl) {
      const productCardPos = productCardElRef.current?.querySelector('.image')?.getBoundingClientRect();
      if (productCardPos) {
        const c = productImageCloneEl;
        c.style.position = 'fixed';
        c.style.backgroundSize = 'cover';
        c.style.width = '100px';
        c.style.height = '100px';
        c.style.borderRadius = '10px';
        c.style.opacity = 0;
        c.style.zIndex = 999;
        document.body.append(c);
        c.style.left = (productCardPos.left + (productCardPos.width / 2)) - (c.offsetWidth / 2) + 'px';
        c.style.top = (productCardPos.top + (productCardPos.height / 4)) + 'px';
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
            height: '25px',
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
      className={`ProductCard ${props.type} ${props.className || ''}`}
      data-id={props.data.id}
      ref={productCardElRef}
    >
      <div className="thumbnail">
        <Link to={`/product/${props.data.id}`}>
          <div className="image" style={{backgroundImage: `url('${props.data.thumbnail}')`}}></div>
        </Link>
      </div>

      <div className="details">
        <Link to={`/product/${props.data.id}`}>
          <span className="name">{props.data.title}</span>
        </Link>
        <span className="description">{props.data.description}</span>
        <span className="price">${parseFloat(props.data.price).toFixed(2)}</span>
        <button
          className="btn-add"
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;