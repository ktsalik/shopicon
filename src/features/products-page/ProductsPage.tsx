import './ProductsPage.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import { store } from '../../app/store';
import productsSlice from './productsSlice';
import { useAppSelector } from '../../app/hooks';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';
import Pagination from '../pagination/Pagination';

const Products = () => {
  const [page, setPage] = useState(1);

  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, params.categoryId]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const getProducts = () => {
    store.dispatch(productsSlice.actions.getProducts({ categoryId: params.categoryId, page: page }));

    window.scrollTo(0, 0);
  };

  let products = useAppSelector((state) => state.products.productListItems);

  /**
   * remove this when you setup the server
   */
  products = products.filter((p: any) => p.category.id.toString() === params.categoryId);
  // end of remove this

  const pageCount = useAppSelector((state) => state.products.productListPageCount);
  const categories = useAppSelector((state) => state.products.categories);
  
  let browsingCategory: ProductCategory = {
    id: -1,
    name: '',
    images: [],
    parent: -1,
  };

  let parentBrowsingCategory: ProductCategory = {
    id: -1,
    name: '',
    images: [],
    parent: -1,
  };
  
  if (params.categoryId) {
    // get browsing category
    const browsingCategoryIndex = categories.findIndex((c: ProductCategory) => c.id.toString() == params.categoryId);
    if (browsingCategoryIndex > -1) {
      browsingCategory = categories[browsingCategoryIndex];
    }

    if (browsingCategory.parent > 0) {
      const parentBrowsingCategoryIndex = categories.findIndex((c: ProductCategory) => c.id === browsingCategory.parent);
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

      <div className="list">
        {
          products.length === 0
            ? <div className="text-dark">No products on this category yet. Try our search or <Link to="/categories" className="link text-primary">browse product categories</Link></div>
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

      <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />
    </div>
  )
};

export default Products;