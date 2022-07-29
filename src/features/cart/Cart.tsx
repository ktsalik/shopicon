import { faClose, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Cart.css';

interface CartComponentProps {
  open: Boolean;
  onClose: any;
};

const Cart = (props: CartComponentProps) => {

  const products = [];

  const close = () => {
    props.onClose();
  };

  return (
    <div className={`Cart ${props.open ? 'open' : 'closed'}`}>
      <div className="header">
        <div className="text-dark d-flex flex-direction-row align-items-center">
          <span>Your Cart</span>
          <span className="products-count-badge">0</span>
        </div>
        <button className="btn-close" onClick={close}><FontAwesomeIcon icon={faClose} size="2x" /></button>
      </div>

      <div className="product-list">
        {products.length === 0 && <span className="cart-empty-message text-dark">Your cart is empty</span>}
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