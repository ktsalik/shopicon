import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { baseUrl } from '../../helpers';
import { ProductCategory } from '../../interfaces/ProductsInterfaces';
import './CategoryItem.css';

interface CategoryItemProps {
  id: string;
};

const CategoryItem = (props: CategoryItemProps) => {

  const categories = useAppSelector((state) => state.products.categories);

  let category: ProductCategory = {
    id: -1,
    name: '',
    images: [],
    parent: -1,
  };

  const categoryIndex = categories.findIndex((c: any) => c.id.toString() === props.id);
  if (categoryIndex > -1) {
    category = categories[categoryIndex];
  }

  let clickUrl = `/products/${category.id}`;
  if (categories.filter((c: any) => c.parent === category.id).length > 0) {
    clickUrl = `/categories/${category.id}`;
  }

  return (
    <div className="CategoryItem">
      {
        category.id === -1
          ? <div className="skeleton-item">
              <div className="skeleton-item__images"></div>
              <div className="skeleton-item__name"></div>
            </div>
          : ''
      }

      <Link to={clickUrl} className={`${category.id === -1 ? 'd-none' : ''}`}>
        <div className="images">
          <div className="big-image">
            {
              !category.images[0] && <div className="no-image-element">
                <div className="fill"></div>
              </div>
            }
            {category.images[0] && <img src={`${baseUrl}assets/images/${category.images[0]}`} width="210"></img>}
          </div>
          <div className="small-images">
            <div>
              {
                !category.images[1] && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {category.images[1] && <img src={`${baseUrl}assets/images/${category.images[1]}`} width="125"></img>}
            </div>
            <div>
              {
                !category.images[2] && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {category.images[2] && <img src={`${baseUrl}assets/images/${category.images[2]}`} width="125"></img>}
            </div>
          </div>
        </div>
        <div className="name text-dark">{category.name}</div>
      </Link>
    </div>
  );
};

export default CategoryItem;