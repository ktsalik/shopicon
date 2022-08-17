import './ProductsPage.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import axios from 'axios';
import ProductCard from '../product-card/ProductCard';
import Pagination from '../pagination/Pagination';
import { baseUrl } from '../../helpers';

const ProductsPage = () => {
  const params = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(10);
  const [loading, setLoading] = useState<Boolean>(true);
  const [lastSeenProductId, setLastSeenProductId] = useState<number>(-1);

  const listElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [page, params.categoryId]);

  useEffect(() => {
    const listIsShowingProducts = listElRef.current?.querySelector('.ProductCard') !== null;

    if (listIsShowingProducts) {
      const lastSeenProductId = localStorage.getItem('last-seen-product');
      localStorage.removeItem('last-seen-product');

      if (lastSeenProductId) {
        setLastSeenProductId(parseInt(lastSeenProductId));

        const indexOfLastSeenProduct = products.findIndex((p: any) => p.id === parseInt(lastSeenProductId));

        if (indexOfLastSeenProduct > -1 && listElRef.current) {
            const lastSeenProductCardEl: any = listElRef.current.querySelector(`[data-id="${lastSeenProductId}"]`);

            setTimeout(() => {
              window.scrollTo(0, lastSeenProductCardEl.offsetTop - (lastSeenProductCardEl.offsetHeight * 0.5));
            });
        }
      }
    }
  }, [listElRef.current?.children.length]);

  const getProducts = () => {
    setLoading(true);
    axios.get(`${baseUrl}products.json?category=${params.categoryId}&page=${page}`).then((response) => {
      setProducts(response.data.products);
      setPageCount(response.data.page_count);
      setLoading(false);
    });
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const categories = useAppSelector((state) => state.products.categories);
  
  let browsingCategory = {
    id: -1,
    name: '',
    images: [],
    parent: -1,
    productsCount: 0,
  };

  let parentBrowsingCategory = {
    id: -1,
    name: '',
    images: [],
    parent: -1,
    productsCount: 0,
  };
  
  if (params.categoryId) {
    const browsingCategoryIndex = categories.findIndex((c: any) => c.id.toString() == params.categoryId);
    if (browsingCategoryIndex > -1) {
      browsingCategory = categories[browsingCategoryIndex];
    }

    if (browsingCategory.parent > 0) {
      const parentBrowsingCategoryIndex = categories.findIndex((c: any) => c.id === browsingCategory.parent);
      if (parentBrowsingCategoryIndex > -1) {
        parentBrowsingCategory = categories[parentBrowsingCategoryIndex];
      }
    }
  }

  return (
    <div
      className="Products"
    >
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Categories</Link>
        <span className={`${parentBrowsingCategory.id === -1 ? 'd-none' : ''}`}>/</span>
        <Link to={`/categories/${parentBrowsingCategory.id}`} className={`${parentBrowsingCategory.id === -1 ? 'd-none' : ''}`}>
          {parentBrowsingCategory.name}
        </Link>
        <span>/</span>
        <span className={`${browsingCategory.id === -1 ? 'd-none' : ''}`}>
          {browsingCategory.name}
        </span>
      </div>

      <div
        className="list"
        ref={listElRef}
      >
        {
          !loading && products.length === 0
            ? <div className="no-products-message">No products on this category yet. Try our search or <Link to="/categories" className="link text-primary">browse product categories</Link></div>
            : ''
        }

        {
          loading && Array.from(Array(5)).map((n: number, i: number) => {
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
          !loading && products.map((product: any, i: number) => {
            return (
              <ProductCard
                key={i}
                data={product}
                type="default"
                className={`${product.id === lastSeenProductId ? 'highlight' : ''}`}
              />
            );
          })
        }
      </div>

      {pageCount > 0 && !loading && <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />}
    </div>
  )
};

export default ProductsPage;