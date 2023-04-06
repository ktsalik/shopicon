import './ArticlePage.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface ArticlePageComponentProps {

};

const ArticlePage = (props: ArticlePageComponentProps) => {
  const [article, setArticle] = useState<any>({});

  const params = useParams();

  useEffect(() => {
    setArticle({
      image: 'https://api.lorem.space/image/watch?w=1180&h=400&hash=BDC01094',
      title: 'Lorem ipsum dolor sit amet.',
      date: '15/03/2022',
      text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus sed nisl quis volutpat. Nam ut pharetra lorem, eleifend rutrum lacus. Duis finibus, urna at porttitor gravida, mauris ligula laoreet massa, ultrices vestibulum neque nisl eu tellus. Cras fringilla pulvinar ornare. Curabitur placerat dui at tortor imperdiet malesuada. Suspendisse nulla lacus, feugiat ac arcu non, accumsan facilisis sapien. Suspendisse metus massa, porttitor ac malesuada ac, faucibus eget nisl. Integer id lorem pellentesque, consectetur purus a, ultricies turpis. Fusce turpis purus, placerat vel risus egestas, porttitor lobortis massa.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vulputate efficitur risus sit amet euismod. Quisque molestie elit tortor, sed pretium arcu faucibus sit amet. Donec id nulla rhoncus elit consequat gravida eget in urna. Fusce eros enim, tempor eu nibh quis, consequat fringilla erat. Integer enim tellus, gravida vitae ultricies malesuada, sodales eget metus. Phasellus sit amet neque in velit consectetur commodo id ut tortor. Fusce non turpis ut odio viverra consectetur sit amet eu mi. Curabitur auctor sodales est et pharetra. Donec dictum tristique efficitur. Morbi sed egestas lectus. Duis scelerisque purus eros, ac volutpat mauris feugiat sit amet. Suspendisse sit amet feugiat libero, sed tempus ipsum.

<img src="https://api.lorem.space/image/watch?w=500&h=500&hash=A89D0DE6" />

In facilisis odio eget nunc tempus dignissim. Mauris sapien velit, molestie at mauris eu, blandit aliquam nulla. Phasellus vestibulum blandit lacus, a semper turpis. Cras in lorem nunc. Sed ipsum nibh, congue nec faucibus ac, euismod sit amet nisi. Cras ex ante, pulvinar eu convallis ac, varius eu arcu. Nunc viverra dapibus tortor, eu molestie dui sagittis sed. Phasellus erat orci, pellentesque non molestie a, congue nec turpis. Ut egestas lorem sem.

Nulla tincidunt faucibus blandit. Mauris eget urna nulla. Quisque sed tortor id lectus condimentum hendrerit quis quis felis. Morbi sit amet mi augue. Vestibulum bibendum dignissim viverra. Maecenas iaculis fringilla nunc sed luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis condimentum leo quis massa tincidunt, et tincidunt tellus mollis. Cras a dictum ex.
<img src="https://api.lorem.space/image/watch?w=1180&h=200&hash=225E6693" />
Sed bibendum est eget dapibus commodo. Phasellus dignissim aliquet convallis. Sed tincidunt dignissim ex, ac auctor quam varius vitae. Duis dapibus, enim tincidunt finibus ullamcorper, lacus nisl consectetur velit, nec vehicula augue mi eget nunc. Duis et tortor vel tellus mollis vehicula non viverra odio. Etiam et rutrum leo, eu imperdiet nulla. Mauris in bibendum mi.
      `,
    });
  }, []);

  return (
    <div className="ArticlePage">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/blog">Blog</Link>
        <span>/</span>
        <span>{article.title}</span>
      </div>

      <div className="article">
        <div className="image">
          <img src={article.image} />
        </div>
        <span className="date text-dark">
          <FontAwesomeIcon icon={faCalendar} />
          &nbsp;
          {article.date}
        </span>
        <span className="title text-dark">{article.title}</span>
        <div className="content" dangerouslySetInnerHTML={{ __html: article.text }}></div>
      </div>
    </div>
  );
};

export default ArticlePage;