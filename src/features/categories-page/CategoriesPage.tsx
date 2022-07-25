import './CategoriesPage.css';
import CategoryItem from '../category-item/CategoryItem';
import { useAppSelector } from '../../app/hooks';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';

const CategoryPage = () => {
  const params = useParams();
  const categories = useAppSelector((state) => state.products.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.parent]);

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
  
  if (params.parent) {
    // get browsing category
    const browsingCategoryIndex = categories.findIndex((c: ProductCategory) => c.id.toString() == params.parent);
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
    <div className="CategoryPage">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Categories</Link>
        <span className={`${parentBrowsingCategory.id === -1 ? 'd-none' : ''}`}>/</span>
        <Link to={`/categories/${parentBrowsingCategory.id}`} className={`${parentBrowsingCategory.id === -1 ? 'd-none' : ''}`}>
          {parentBrowsingCategory.name}
        </Link>
        <span className={`${browsingCategory.id === -1 ? 'd-none' : ''}`}>/</span>
        <span className={`${browsingCategory.id === -1 ? 'd-none' : ''}`}>
          {browsingCategory.name}
        </span>
      </div>
      
      <div className="category-list">
        {
          params.parent
            // render child categories
            ? categories.filter((c: any) => c.parent.toString() === params.parent).map((category: any, i: number) => {
                return (
                  <CategoryItem
                    key={i}
                    id={category.id.toString()}
                  ></CategoryItem>
                );
              })
            // render root categories
            : categories.filter((c: any) => c.parent === 0).map((category: any, i: number) => {
                return (
                  <CategoryItem
                    key={i}
                    id={category.id.toString()}
                  ></CategoryItem>
                );
              })
        }
      </div>
    </div>
  );
};

export default CategoryPage;