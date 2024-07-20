import './CategoryItem.scss';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { capitalizeDashes } from '../../helpers';
import { useEffect, useState } from 'react';

interface CategoryItemProps {
  slug: string;
};

const CategoryItem = (props: CategoryItemProps) => {
  const [images, setImages] = useState<any[]>([]);

  const categories = useAppSelector((state) => state.products.categories);

  const params = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${props.slug}`).then((response) => {
      response.json().then((data) => {
        const i: any[] = [];
        
        data.products.slice(0, 3).forEach((p: any) => {
          i.push(p.thumbnail);
        });

        setImages(i);
      });
    });
  }, []);

  const category = categories.find((c: any) => c === props.slug) || '';
  const categoryLabel = capitalizeDashes(category);

  return (
    <div className="CategoryItem">
      <Link to={`/products/${props.slug}`}>
        <div className="images">
          <div className="big-image">
            {
              !images.length && <div className="no-image-element">
                <div className="fill"></div>
              </div>
            }
            {images.length > 0 && <div className="image" style={{ backgroundImage: `url('${images[0]}')`}}></div>}
          </div>
          <div className="small-images">
            <div>
              {
                !images.length && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {images.length > 0 && <div className="image" style={{ backgroundImage: `url('${images[1]}')`}}></div>}
            </div>
            <div>
              {
                !images.length && <div className="no-image-element">
                  <div className="fill"></div>
                </div>
              }
              {images.length > 0 && <div className="image" style={{ backgroundImage: `url('${images[2]}')`}}></div>}
            </div>
          </div>
        </div>
        <span className="name text-dark">{categoryLabel || <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }}></span>}</span>
      </Link>
    </div>
  );
};

export default CategoryItem;