import './SearchPage.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import { useAppSelector } from '../../app/hooks';
import axios from 'axios';
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

  /**
   * remove this when you setup the server
   */
  const demoProducts = useAppSelector((state) => state.products.productListItems);
  // end of remove this

  const getProducts = () => {
    setLoading(true);

    axios.get(`http://localhostt/eshop-server/search?q=${params.query}&page=${page}`).then((response) => {
      /**
       * server response should be a JSON object as the example below
        {
          products: [
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
          ],
          page_count: 10,
        }
       */
      setProducts(response.data.products);
      setPageCount(response.data.page_count);
      setLoading(false);
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      setProducts(demoProducts.filter((p: any) => p.title.toLowerCase().includes(params.query?.toLowerCase() || '')));
      setPageCount(10);
      setLoading(false);
      // end of remove this
    });

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