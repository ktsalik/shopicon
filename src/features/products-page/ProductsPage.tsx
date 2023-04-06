import './ProductsPage.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import ProductCard from '../product-card/ProductCard';
import Pagination from '../pagination/Pagination';
import { capitalizeDashes } from '../../helpers';

const ProductsPage = () => {
  const params = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  // const [pageCount, setPageCount] = useState<number>(10);
  const [fetching, setFetching] = useState<Boolean>(true);

  const listElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [page, params.categoryId]);

  const fetchProducts = () => {
    setFetching(true);
    fetch(`https://dummyjson.com/products/category/${params.categoryId}`).then((response) => {
      response.json().then((data) => {
        setProducts(data.products);
        setFetching(false);
      });
    });
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const categories = useAppSelector((state) => state.products.categories);
  const category = categories.find((c: any) => c === params.categoryId) || '';

  return (
    <div
      className="Products"
    >
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Categories</Link>
        <span>/</span>
        <span>
          {capitalizeDashes(category)}
        </span>
      </div>

      <div
        className="list"
        ref={listElRef}
      >
        {
          !fetching && products.length === 0
            ? <div className="no-products-message">No products on this category yet. Try our search or <Link to="/categories" className="link text-primary">browse product categories</Link></div>
            : ''
        }

        {
          fetching && Array.from(Array(5)).map((n: number, i: number) => {
            return (
              <div
                key={i}
                className="product-skeleton-item"
              >
                <div className="thumbnail"></div>

                <div className="info">
                  <div className="name"></div>
                  <div className="description"></div>
                  <div className="price"></div>
                </div>
              </div>
            );
          })
        }

        {
          !fetching && products.map((product: any, i: number) => {
            return (
              <ProductCard
                key={i}
                data={product}
                type="default"
              />
            );
          })
        }
      </div>

      {/* {pageCount > 0 && !fetching && <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />} */}
    </div>
  )
};

export default ProductsPage;