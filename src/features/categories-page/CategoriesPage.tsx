import './CategoriesPage.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import CategoryItem from '../category-item/CategoryItem';

const CategoryPage = () => {
  const categories = useAppSelector((state) => state.products.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="CategoryPage">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/categories">Categories</Link>
      </div>
      
      <div className="category-list">
        {
          categories.map((category: any, i: number) => {
            return (
              <CategoryItem
                key={i}
                id={category}
              ></CategoryItem>
            );
          })
        }
      </div>
    </div>
  );
};

export default CategoryPage;