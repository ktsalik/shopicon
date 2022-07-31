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
    axios.get(`http://localhostt/article/${params.id}`).then((response) => {
      /**
       server response should be a JSON object as the example below
       {
          image: 'https://picsum.photos/500/200',
          title: 'Lorem ipsum dolor sit amet.',
          date: '15/3/2022',
          text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
        }
       */
      setArticle(response.data);
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
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
      // end of remove this
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