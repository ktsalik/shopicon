import './HomeSlider.css';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../helpers';

const HomeSlider = () => {
  const [sliderData, setSliderData] = useState<any>([]);

  const sliderElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(`http://localhostt/eshop-server/slider-data`).then((response) => {
      // the server response should be a JSON array as the example below
      /*
        [
          {
            image: 'headphones-1.jpeg',
            header: 'Offer Discount',
            subheader: 'Red Headphones',
            price: 24.00,
            buttonText: 'Buy now',
            buttonUrl: '/product/1',
          },
          {
            image: 'headphones-2.jpeg',
            header: 'Best Selling',
            subheader: 'Black Cat Headphones',
            price: 17.50,
            buttonText: 'Buy now',
            buttonUrl: '/product/2',
          },
        ]
      */
      setSliderData(response.data);

      setTimeout(() => {
        new Splide('.splide', {
          pagination: false,
          type: 'loop',
        }).mount();
      });
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      setSliderData([
        {
          image: 'headphones-1.jpeg',
          header: 'Offer Discount',
          subheader: 'Red Headphones',
          price: 24.00,
          buttonText: 'Buy now',
          buttonUrl: '/product/1',
        },
        {
          image: 'headphones-2.jpeg',
          header: 'Best Selling',
          subheader: 'Black Cat Headphones',
          price: 17.50,
          buttonText: 'Buy now',
          buttonUrl: '/product/2',
        },
        {
          image: 'headphones-3.jpeg',
          header: 'New Arrival',
          subheader: 'Red Black Headphones',
          price: 25.00,
          buttonText: 'Buy now',
          buttonUrl: '/product/3',
        },
      ]);
      // end of remove this

      setTimeout(() => {
        new Splide('.splide', {
          pagination: false,
          type: 'loop',
        }).mount();
      });
    });
  }, []);

  return (
    <div
      className="HomeSlider"
      ref={sliderElRef}
    >
      <div className="splide" role="group" aria-label="Splide Basic HTML Example">
        <div className="splide__track">
          <ul className="splide__list">
            {
              sliderData.map((slideData: any, i: number) => {
                return (
                  <li className="splide__slide" key={i}>
                    <div className="slide">
                      <div className="image">
                          <img src={`${baseUrl}assets/images/${slideData.image}`}></img>
                        </div>
                        <div className="info">
                          <div className="header text-dark">{slideData.header}</div>
                          <div className="subheader text-dark">{slideData.subheader}</div>
                          <div className="price text-dark text-bold">{parseFloat(slideData.price.toString()).toFixed(2).replace('.', ',')}€</div>
                          <Link to={slideData.buttonUrl} className="btn-offer">{slideData.buttonText}</Link>
                        </div>
                      </div>
                    </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;