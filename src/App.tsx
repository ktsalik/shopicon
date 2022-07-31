import { useEffect, useState } from 'react';
import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { store } from './app/store';
import { useAppSelector } from './app/hooks';
import productsSlice from './features/products-page/productsSlice';
import navbarSlice from './features/navbar/navbarSlice';
import Navbar from './features/navbar/Navbar';
import Home from './features/home-page/HomePage';
import Products from './features/products-page/ProductsPage'
import ProductPage from './features/product-page/ProductPage';
import SearchPage from './features/search-page/SearchPage';
import CategoryPage from './features/categories-page/CategoriesPage';
import Notification from './features/notification/Notification';
import BlogPage from './features/blog-page/BlogPage';
import ArticlePage from './features/article-page/ArticlePage';
import TermsPage from './features/terms-page/TermsPage';
import ContactPage from './features/contact-page/ContactPage';
import SignInPage from './features/sign-in-page/SignInPage';
import SignUpPage from './features/sign-up-page/SignUpPage';
import Footer from './features/footer/Footer';

function App() {
  const navbarType = useAppSelector((state) => state.navbar.type);
  const notifications = useAppSelector((state) => state.notification.notifications);

  useEffect(() => {
    store.dispatch(navbarSlice.actions.loadTypePreference({ loadFrom: 'localstorage' }));
    store.dispatch(productsSlice.actions.getCategories({}));

    /**
     * remove this when you setup the server
     */
    store.dispatch(productsSlice.actions.getProducts({}));
    // end of remove this
  }, []);

  const onNavbarTypeChange = (type: string) => {
    store.dispatch(navbarSlice.actions.changeType({ type }));
  };

  return (
    <BrowserRouter /*basename="/eshop-template"*/>
      <div className={`App ${navbarType === 'fixed' ? 'navbar-fixed' : ''}`}>
        <Navbar onTypeChange={onNavbarTypeChange} ></Navbar>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories" element={<CategoryPage />}></Route>
          <Route path="/categories/:id" element={<CategoryPage />}></Route>
          <Route path="/products/:categoryId" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/search/:query" element={<SearchPage />}></Route>
          <Route path="/blog" element={<BlogPage />}></Route>
          <Route path="/article/:id" element={<ArticlePage />}></Route>
          <Route path="/terms" element={<TermsPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
        </Routes>

        <Footer></Footer>

        {
          notifications.map((notification: any, i :number) => {
            return (
              <Notification id={notification.id} type={notification.type} text={notification.text} index={i} />
            );
          })
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
