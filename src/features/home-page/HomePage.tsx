import './HomePage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import CategoryItem from '../category-item/CategoryItem';
import ProductCard from '../product-card/ProductCard';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const sliderProducts = useSelector((state: any) => state.products.sliderProducts);
  const featuredProducts = useSelector((state: any) => state.products.featuredProducts);
  const statsProducts = useSelector((state: any) => state.products.statsProducts);

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
          sliderProducts.map((product: any, i: number) => {
            return (
              <SplideSlide key={i}>
                <div
                  className="slide"
                  
                >
                  <div className="image-wrapper">
                    <div className="image" style={{backgroundImage: `url(${product.images[0]})`}}></div>
                  </div>

                  <div className="info">
                    <div className="header animate__animated animate__fadeInDown animate__fast">New Arrival</div>
                    <div className="subheader animate__animated animate__fadeInDown animate__fast animate__delay-200ms">{product.title}</div>
                    <div className="price animate__animated animate__fadeInDown animate__fast animate__delay-400ms">${parseFloat(product.price).toFixed(2)}</div>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-offer animate__animated animate__fadeInUp animate__delay-400ms"
                    >
                      Buy Now
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
          <CategoryItem slug="smartphones"></CategoryItem>
          <CategoryItem slug="laptops"></CategoryItem>
          <CategoryItem slug="home-decoration"></CategoryItem>
        </div>

        <Link to="/categories" className="categories__btn-all">ALL CATEGORIES</Link>
      </section>

      <section className="featured">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-list">
          {
            featuredProducts.slice(0, 4).map((product: any, i: number) => {
              return (
                <ProductCard
                  key={i}
                  data={product}
                  type="grid"
                />
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
              statsProducts.newArrival.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <div className="product-item__thumbnail" style={{ backgroundImage: `url('${product.thumbnail}')`}}></div>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price).toFixed(2)}</span>
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
              statsProducts.bestSeller.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <div className="product-item__thumbnail" style={{ backgroundImage: `url('${product.thumbnail}')`}}></div>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price).toFixed(2)}</span>
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
              statsProducts.sale.map((product: any, i: number) => {
                return (
                  <Link key={i} to={`/product/${product.id}`} className="product-item">
                    <div className="product-item__thumbnail" style={{ backgroundImage: `url('${product.thumbnail}')`}}></div>
                    <span className="product-item__title">{product.title}</span>
                    <span className="product-item__price">${parseFloat(product.price).toFixed(2)}</span>
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
