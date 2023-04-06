import './SearchPage.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import Pagination from '../pagination/Pagination';

const SearchPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<Boolean>(false);

  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, params.query]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const getProducts = () => {
    setLoading(true);

    window.scrollTo(0, 0);
  };

  return (
    <div className="SearchPage">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Search</span>
        <span>/</span>
        <span className="badge-primary">
          {params.query}
        </span>
      </div>

      <div className="list">
        {
          products.length === 0
            ? <div className="text-dark">No products found with the term "{params.query}". Try <Link to="/categories" className="link text-primary">browsing product categories</Link></div>
            : ''
        }

        {
          products.map((product: any, i: number) => {
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

      {pageCount > 0 && !loading && <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />}
    </div>
  );
};

export default SearchPage;