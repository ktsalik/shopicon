import './ProductCard.css';
import { Link } from 'react-router-dom';
import { ProductComponentInterface } from '../../interfaces/ProductsInterfaces';
import { baseUrl } from '../../helpers';

const ProductCard = (props: ProductComponentInterface) => {
  return (
    <div
      className={`ProductCard ${props.type}`}
    >
      <div className="thumbnail">
        <Link to={`/product/${props.data.id}`}>
          <img src={`${baseUrl}assets/images/${props.data.thumbnail}`}></img>
        </Link>
      </div>

      <div className="details">
        <Link to={`/product/${props.data.id}`}>
          <span className="name">{props.data.title}</span>
        </Link>
        <span className="description">{props.data.short_description}</span>
        <span className="price">${parseFloat(props.data.price.toString()).toFixed(2)}</span>
        <button className="btn-add">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;