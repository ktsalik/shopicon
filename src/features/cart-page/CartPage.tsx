import './CartPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCode, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { store } from '../../app/store';
import cartSlice from '../cart/cartSlice';

const CartPage = (props: any) => {

  const products = useSelector((state: any) => state.cart.products);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let total = 0;
  products.forEach((product: any) => {
    total += product.quantity * product.price;
  });
  
  return (
    <div className="CartPage">
      <div className={`product-list ${products.length === 0 ? 'd-none' : ''}`}>
        <div className="product-list__header">
          <div className="product-label">Product</div>
          <div className="price-label">Price</div>
          <div className="quantity-label">Quantity</div>
          <div className="total-label">Total</div>
        </div>

        <div className="product-list__items-container">
          {
            products.map((product: any, i: number) => {
              const productTotal = product.quantity * product.price;

              return (
                <div
                  key={i}
                  className="product-list__item"
                >
                  <img src={product.thumbnail} />
                  <Link to={`/product/${product.id}`} className="title">{product.title}</Link>
                  <div className="price">{product.price.toFixed(2)}€</div>
                  <div className="quantity">x{product.quantity}</div>
                  <div className="total">{productTotal.toFixed(2)}€</div>
                  <div
                    className="btn-remove"
                    onClick={() => store.dispatch(cartSlice.actions.remove({ id: product.id }))}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="product-list__footer">
          <span className="label">Total: </span>
          <span className="total">{total.toFixed(2)}€</span>
        </div>
      </div>

      <Link to="/checkout" className={`btn-checkout ${products.length === 0 ? 'd-none' : ''}`}>Checkout</Link>
    
      {
        products.length === 0
          ? <div className="d-flex flex-direction-column" style={{color: '#AAAAAA'}}>
              <FontAwesomeIcon icon={faCartShopping} size="3x" style={{color: '#DFDFDF'}} />
              <span className="cart-empty-message" style={{marginTop: '20px', color: '#CFCFCF'}}>Your cart is empty</span>
            </div>
          : ''
      }
    </div>
  );
}

export default CartPage;