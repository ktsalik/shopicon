import { Link } from 'react-router-dom';
import './ArticleCard.scss';

interface ArticleCardComponentProps {
  data: any;
};

const ArticleCard = (props: ArticleCardComponentProps) => {

  return (
    <div className="ArticleCard">
      <Link to={`/article/${props.data.id}`}>
        <img src={props.data.image} />
      </Link>
      <div className="info">
        <span className="date text-dark">{props.data.date}</span>
        <Link to={`/article/${props.data.id}`} className="title text-dark">{props.data.title}</Link>
        <span className="short-text text-dark">{props.data.text.substr(0, 200)}...</span>
        <Link to={`/article/${props.data.id}`} className="text-dark">Read more</Link>
      </div>
    </div>
  )
};

export default ArticleCard;