import './Cart.scss';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClose, faCreditCard, faEraser } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import cartSlice from './cartSlice';

interface CartComponentProps {
  open: Boolean;
  onClose: any;
};

const Cart = (props: CartComponentProps) => {
  const CartElRef = useRef<HTMLDivElement>(null);

  const products = useAppSelector((state) => state.cart.products);

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (CartElRef.current) {
        if (CartElRef.current.classList.contains('open') && !CartElRef.current.contains(e.target)) {
          close();
        }
      }
    }, true);
  }, []);

  const close = () => {
    props.onClose();
  };

  return (
    <div
      className={`Cart ${props.open ? 'open' : 'closed'}`}
      ref={CartElRef}
    >
      <div className="header">
        <div className="text-dark d-flex flex-direction-row align-items-center">
          <span>Your Cart</span>
          <span className="products-count-badge">{products.length}</span>
        </div>
        <button className="btn-close" onClick={close}><FontAwesomeIcon icon={faClose} size="2x" /></button>
      </div>

      <div className="product-list">
        {products.length === 0 && <div className="h-100 d-flex flex-direction-column justify-content-center align-items-center">
          <FontAwesomeIcon icon={faCartShopping} size="3x" style={{color: '#DFDFDF'}} />
          <span className="cart-empty-message" style={{marginTop: '20px', color: '#CFCFCF'}}>Your cart is empty</span>
        </div>}

        {
          products.map((product: any, i: number) => {
            return (
              <div
                className="product-list__item"
                key={i}
              >
                <div className="image" style={{backgroundImage: `url('${product.thumbnail}')`}}></div>

                <div className="details">
                  <span className="name">{product.title}</span>
                  <span className="quantity">{product.quantity} x ${parseFloat(product.price).toFixed(2)}</span>
                </div>

                <div
                  className="btn-remove"
                  onClick={() => store.dispatch(cartSlice.actions.remove({ id: product.id }))}
                >
                  <FontAwesomeIcon icon={faEraser} />
                </div>
              </div>
            );
          })
        }
      </div>

      <div className="footer text-dark">
        <div className="d-flex flex-direction-row justify-content-between align-items-center">
          <div>
            <span>Subtotal:&nbsp;</span>
            <span>$0.00</span>
          </div>

          <Link to="/cart" className="link badge-primary" onClick={close}>View Cart</Link>
        </div>

        <Link to="/checkout" className="btn-checkout" onClick={close}>
          <FontAwesomeIcon icon={faCreditCard} size="lg" />
          &nbsp;
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;