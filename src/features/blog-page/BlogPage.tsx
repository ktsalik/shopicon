import './BlogPage.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../article-card/ArticleCard';
import Pagination from '../pagination/Pagination';

const Blog = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    getArticles();

    window.scrollTo(0, 0);
  }, [page]);

  const getArticles = () => {
    setLoading(true);

    setArticles([
      {
        id: 1,
        image: 'https://picsum.photos/id/1/200/100',
        title: 'Lorem ipsum dolor sit amet.',
        date: '15/03/2022',
        text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
      },
      {
        id: 2,
        image: 'https://picsum.photos/id/1/200/100',
        title: 'Suspendisse imperdiet dapibus ipsum vel.',
        date: '16/04/2022',
        text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
      },
      {
        id: 3,
        image: 'https://picsum.photos/id/1/200/100',
        title: 'Vestibulum ullamcorper, nulla non finibus.',
        date: '17/05/2022',
        text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
      },
      {
        id: 4,
        image: 'https://picsum.photos/id/1/200/100',
        title: 'Nullam pharetra nisl vitae egestas.',
        date: '18/06/2022',
        text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
      },
      {
        id: 5,
        image: 'https://picsum.photos/id/1/200/100',
        title: 'Fusce scelerisque, turpis nec scelerisque.',
        date: '19/07/2022',
        text: 'Vivamus tempor metus odio, ut lobortis massa malesuada ac. Maecenas feugiat eu felis vel semper. Phasellus odio ex, placerat sed ornare quis, luctus ac lacus. Etiam quis consequat velit, eu maximus est. Phasellus laoreet finibus odio, at viverra erat elementum vel. Donec fermentum pellentesque lectus, nec dictum est tincidunt eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc iaculis non turpis non dictum. Integer ultrices leo ut ante pharetra, at auctor quam pretium. Duis nec nisi vel ligula faucibus tempor. Phasellus consectetur efficitur dolor sit amet fringilla. Sed nec odio molestie, sodales risus id, auctor enim. Quisque vitae enim leo. Curabitur scelerisque in enim vitae semper. Maecenas non fermentum odio. Etiam rutrum eu est sed posuere. Maecenas eget venenatis nulla. Curabitur pharetra justo iaculis, iaculis leo eget, eleifend ipsum. Quisque faucibus orci nec erat eleifend fermentum. Nam quis tincidunt ligula. Integer imperdiet neque vitae venenatis tincidunt. Donec sit amet est sed tellus tincidunt elementum. Morbi cursus tristique eros, quis placerat dolor laoreet eu. Quisque dignissim vulputate porttitor. Praesent quis neque laoreet odio egestas venenatis. Quisque semper leo vitae lorem semper ornare. Pellentesque eleifend congue nunc, eu lacinia lectus fringilla et. Nam congue posuere venenatis. In laoreet elementum turpis eu elementum. Morbi neque sapien, mollis vel sapien nec, ultrices accumsan ipsum. Nullam ut dui mollis, accumsan ex sed, dapibus nulla. Nulla luctus, metus vitae convallis rutrum, quam tellus dignissim quam, facilisis bibendum est felis eu ipsum. Mauris in mi ultrices, scelerisque odio ut, ultricies turpis. Nam lobortis eros a felis tristique fringilla. Suspendisse pretium nulla eget elit lobortis rhoncus. Phasellus quis sapien mauris. Sed sed scelerisque augue, et commodo sapien. Donec fringilla nunc sed felis maximus auctor. Suspendisse potenti. Aenean ac metus tincidunt, interdum justo sit amet, consectetur sem. Etiam sit amet consequat odio, volutpat iaculis ligula. Mauris sodales ultrices mauris egestas ultrices. In quis arcu risus. Suspendisse mollis enim sit amet porta porttitor. Cras vel velit purus. Ut fermentum id nisl vel iaculis. Integer scelerisque blandit sem, eget porttitor diam vehicula et. Nulla vestibulum suscipit finibus. Ut tempor orci nec nunc varius gravida. Pellentesque diam tortor, dapibus sed sagittis nec, interdum at metus. Sed laoreet iaculis neque in commodo. Aliquam feugiat rutrum mi, viverra tincidunt quam. Nunc aliquam efficitur dapibus. Vivamus rhoncus, nunc quis lobortis tincidunt, risus nisl tempus eros, et porta turpis lorem eu orci. Curabitur fringilla luctus diam, a egestas mauris mattis sed. Donec ac malesuada turpis. Nunc tincidunt consequat velit sed gravida. Morbi vestibulum lacinia urna, eget congue nisi mollis eu.',
      },
    ]);
    setPageCount(10);
    setLoading(false);
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="Blog">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Blog</span>
      </div>

      <div className="article-list">
        {
          articles.map((article: any, i: number) => {
            return (
              <ArticleCard key={i} data={article} />
            );
          })
        }
      </div>

      {pageCount > 0 && !loading && <Pagination page={page} pageCount={pageCount} onPageChange={changePage} />}
    </div>
  )
};

export default Blog;