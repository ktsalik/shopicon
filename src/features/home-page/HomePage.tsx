import './HomePage.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../helpers';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import CategoryItem from '../category-item/CategoryItem';
import ProductCard from '../product-card/ProductCard';

const HomePage = () => {
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<any[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<any[]>([]);
  const [saleProducts, setSaleProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${baseUrl}slider-data.json`).then((response) => {
      setSliderData(response.data);
    });

    axios.get(`${baseUrl}featured-products.json`).then((response) => {
      setFeaturedProducts(response.data);
    });

    axios.get(`${baseUrl}new-arrival-products.json`).then((response) => {
      setNewArrivalProducts(response.data);
    });

    axios.get(`${baseUrl}best-seller-products.json`).then((response) => {
      setBestSellerProducts(response.data);
    });

    axios.get(`${baseUrl}sale-products.json`).then((response) => {
      setSaleProducts(response.data);
    });

    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <div
      className="HomePage"
    >
      <Splide 
        options={{
          rewind: true,
          perPage: 1,
          rewindByDrag: true,
        }}
      >
        {
          sliderData.map((slideData: any, i: number) => {
            return (
              <SplideSlide key={i}>
                <div
                  className="slide"
                  
                >
                  <div className="image">
                    <img src={`${baseUrl}assets/images/${slideData.image}`}></img>
                  </div>
                  <div className="info">
                    <div className="header animate__animated animate__fadeInDown animate__fast">{slideData.header}</div>
                    <div className="subheader animate__animated animate__fadeInDown animate__fast animate__delay-200ms">{slideData.subheader}</div>
                    <div className="price animate__animated animate__fadeInDown animate__fast animate__delay-400ms">${parseFloat(slideData.price.toString()).toFixed(2)}</div>
                    <Link
                      to={slideData.buttonUrl}
                      className="btn-offer animate__animated animate__fadeInUp animate__delay-400ms"
                    >
                      {slideData.buttonText}
                    </Link>
                  </div>
                </div>
              </SplideSlide>
            );
          })
        }
      </Splide>

      <section className="categories">
        <h2 className="section-title">Popular Categories</h2>

        <div className="categories__list">
          <CategoryItem id="1"></CategoryItem>
          <CategoryItem id="2"></CategoryItem>
          <CategoryItem id="3"></CategoryItem>
        </div>

        <Link to="/categories" className="categories__btn-all">ALL CATEGORIES</Link>
      </section>

      <section className="featured">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-list">
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
        <div className="section">
          <h2>New Arrivals</h2>

          <div className="product-list">
            {
              newArrivalProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price.toString()).toFixed(2)}</span>
                  </Link>
                );
              })
            }
          </div>
        </div>

        <div className="section">
          <h2>Best Sellers</h2>

          <div className="product-list">
            {
              bestSellerProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price.toString()).toFixed(2)}</span>
                  </Link>
                );
              })
            }
          </div>
        </div>

        <div className="section">
          <h2>Sale Products</h2>

          <div className="product-list">
            {
              saleProducts.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <img className="product-item__thumbnail" src={`${baseUrl}assets/images/${product.thumbnail}`} height="50"></img>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price.toString()).toFixed(2)}</span>
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
