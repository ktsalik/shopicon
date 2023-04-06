import './CategoryItem.scss';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { capitalizeDashes } from '../../helpers';
import { useEffect, useState } from 'react';

interface CategoryItemProps {
  id: string;
};

const CategoryItem = (props: CategoryItemProps) => {
  const [images, setImages] = useState<any[]>([]);

  const categories = useAppSelector((state) => state.products.categories);

  const params = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${props.id}`).then((response) => {
      response.json().then((data) => {
        const i: any[] = [];
        
        data.products.slice(0, 3).forEach((p: any) => {
          i.push(p.thumbnail);
        });

        setImages(i);
      });
    });
  }, []);

  const category = categories.find((c: any) => c === props.id) || '';
  const categoryLabel = capitalizeDashes(category);

  return (
    <div className="CategoryItem">
      <Link to={`/products/${category}`}>
        <div className="images">
          <div className="big-image">
            {
              !images.length && <div className="no-image-element">
                <div className="fill"></div>
              </div>
            }
            {images.length > 0 && <img src={images[0]}></img>}
          </div>
          <div className="small-images">
            <div>
              {
                !images.length && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {images.length > 0 && <img src={images[1]}></img>}
            </div>
            <div>
              {
                !images.length && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {images.length > 0 && <img src={images[2]}></img>}
            </div>
          </div>
        </div>
        <span className="name text-dark">{categoryLabel || '&nbsp;'}</span>
      </Link>
    </div>
  );
};

export default CategoryItem;