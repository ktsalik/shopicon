import './ProductPage.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { baseUrl } from '../../helpers';

const ProductPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [imageSelected, setImageSelected] = useState<string>('');
  const [visibleTab, setVisibleTab] = useState<string>('description');

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
  }, [product])

  /**
   * remove this when you setup the server
   */
  const products = useAppSelector((state: any) => state.products.productListItems);
  useEffect(() => {
    setProduct(products.find((p: any) => p.id.toString() === params.id));
  }, [products, params.id]);
  // end of remove this

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getProduct();
  }, [params.id]);

  const getProduct = () => {
    axios.get(`http://localhostt/eshop-server/product/${params.id}`).then((response) => {
      /*
        server response should be a JSON object as the example below
        {
          id: 1,
          category: {
            id: 2,
            name: 'Microphones',
            parent: 0,
          },
          images: [
            'image-1.jpeg',
            'image-2.jpeg',
          ],
          title: 'Red Black Microphone',
          short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
          price: 20.00,
          details: [
            {
              name: 'Color',
              value: 'Red',
            },
            {
              name: 'Type',
              value: 'Cable',
            },
          ],
        },
      */
      setProduct(response.data);
    });
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
              <Link to={`/products/${product.category.id}`}>
                {product.category.name}
              </Link>
              <span>/</span>
              <span>{product.title}</span>
            </div>
          : ''
      }
      
      {
        product
          ? <div className="product-info">
              <div className="images">
                <div className="thumbnails">
                  {
                    product.images.map((image: string, i: number) => {
                      return (
                        <img key={i} className={`${imageSelected === image ? 'selected' : ''}`} src={`${baseUrl}assets/images/${image}`} onClick={() => changeImage(image)}></img>
                      );
                    })
                  }
                </div>
                <div className="image">
                  <img src={`${baseUrl}assets/images/${imageSelected}`}></img>
                </div>
              </div>
              <div className="info">
                <span className="title">{product.title}</span>
                <span className="price">{parseFloat(product.price.toString()).toFixed(2)}€</span>
                <span className="short-description">{product.short_description}</span>
                <div className="d-flex flex-direction-column mt-3">
                  <input
                    type="number"
                    className="input-quantity"
                    onChange={onQuantityChange}
                    value={quantity}
                    min={1}></input>
                  <button className="btn-add-to-cart">Add to cart</button>
                </div>
              </div>
            </div>
          : ''
      }
      {
        product
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
              <div className={`${visibleTab === 'description' ? '' : 'd-none'}`}>
                {product.description}
              </div>
              <div className={`${visibleTab === 'details' ? '' : 'd-none'}`}>
                {
                  product.details.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="mt-1"
                      >
                        {detail.name}: {detail.value}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        : ''
      }
    </div>
  );
};

export default ProductPage;