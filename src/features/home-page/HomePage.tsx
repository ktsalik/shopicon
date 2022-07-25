import './HomePage.css';
import { useEffect, useState } from 'react';
import { baseUrl, shuffle } from '../../helpers';
import HomeSlider from '../home-slider/HomeSlider';
import CategoryItem from '../category-item/CategoryItem';
import axios from 'axios';
import ProductCard from '../product-card/ProductCard';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [bestRatedProducts, setBestRatedProducts] = useState<any[]>([]);

  /**
   * remove this when you setup the server
   */
  const demoProducts = useAppSelector((state) => state.products.productListItems);
  useEffect(() => {
    setNewArrivalProducts(shuffle(demoProducts.map((p: any) => {
      return {
        id: p.id,
        thumbnail: p.images[0],
        title: p.title,
        price: p.price,
      };
    }).slice(0, 5)));
    setBestSellingProducts(shuffle(demoProducts.map((p: any) => {
      return {
        id: p.id,
        thumbnail: p.images[0],
        title: p.title,
        price: p.price,
      };
    }).slice(0, 5)));
    setBestRatedProducts(shuffle(demoProducts.map((p: any) => {
      return {
        id: p.id,
        thumbnail: p.images[0],
        title: p.title,
        price: p.price,
      };
    }).slice(0, 5)));
  }, [demoProducts]);
  // end of remove this

  useEffect(() => {
    axios.get(`http://localhostt/eshop-server/featured-products`).then((response) => {
      /*
        server response should be a JSON array as the example below
        [
          {
            id: 2,
            thumbnail: 'headphones-2.jpeg',
            title: 'Black Headphones',
            short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
            price: 20.00,
          },
          {
            id: 3,
            thumbnail: 'headphones-3.jpeg',
            title: 'Red Headphones',
            short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
            price: 27.50,
          },
        ]
      */
      setFeaturedProducts(response.data);
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      setFeaturedProducts([
        {
          id: 2,
          thumbnail: 'headphones-2.jpeg',
          title: 'Black Headphones',
          short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
          price: 20.00,
        },
        {
          id: 3,
          thumbnail: 'headphones-3.jpeg',
          title: 'Red Headphones',
          short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
          price: 27.50,
        },
        {
          id: 5,
          thumbnail: 'earphone-2.jpeg',
          title: 'Black Earphone',
          short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
          price: 21.00,
        },
      ]);
      // end of remove this
    });

    axios.get(`http://localhostt/eshop-server/statistic-products`).then((response) => {
      /*
        server response should be a JSON object as the example below
        {
          new_arrivals: [
            {
              id: 2,
              thumbnail: 'headphones-2.jpeg',
              title: 'Black Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 20.00,
            },
            {
              id: 3,
              thumbnail: 'headphones-3.jpeg',
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 27.50,
            },
          ],
          best_selling: [
            {
              id: 2,
              thumbnail: 'headphones-2.jpeg',
              title: 'Black Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 20.00,
            },
            {
              id: 3,
              thumbnail: 'headphones-3.jpeg',
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 27.50,
            },
          ],
          best_rated: [
            {
              id: 2,
              thumbnail: 'headphones-2.jpeg',
              title: 'Black Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 20.00,
            },
            {
              id: 3,
              thumbnail: 'headphones-3.jpeg',
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              price: 27.50,
            },
          ]
        }
      */
      setNewArrivalProducts(response.data.new_arrivals);
      setBestSellingProducts(response.data.best_selling);
      setBestRatedProducts(response.data.best_rated);
    });

    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <div
      className="HomePage"
    >
      <HomeSlider />

      <section className="categories">
        <h2 className="section-title text-dark">Popular Categories</h2>

        <div className="categories__list">
          <CategoryItem id="1"></CategoryItem>
          <CategoryItem id="2"></CategoryItem>
          <CategoryItem id="3"></CategoryItem>
        </div>

        <Link to="/categories" className="categories__btn-see-all">See all</Link>
      </section>

      <section>
        <h2 className="section-title text-dark">Featured Products</h2>

        <div className="d-flex flex-direction-row flex-wrap">
          {
            featuredProducts.map((product: any, i: number) => {
              return (
                <ProductCard key={i} data={product} type="grid" />
              );
            })
          }
        </div>
      </section>

      <section className="statistic-products">
        <div>
          <h2>New Arrivals</h2>

          <div className="product-list">
            {
              newArrivalProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">{parseFloat(product.price.toString()).toFixed(2)}€</span>
                  </Link>
                );
              })
            }
          </div>
        </div>

        <div>
          <h2>Best Selling</h2>

          <div className="product-list">
            {
              bestSellingProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">{parseFloat(product.price.toString()).toFixed(2)}€</span>
                  </Link>
                );
              })
            }
          </div>
        </div>

        <div>
          <h2>Best Rated</h2>

          <div className="product-list">
            {
              bestRatedProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">{parseFloat(product.price.toString()).toFixed(2)}€</span>
                  </Link>
                );
              })
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
