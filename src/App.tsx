import { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './features/navbar/Navbar';
import Home from './features/home-page/HomePage';
import Products from './features/products-page/ProductsPage'
import ProductPage from './features/product-page/ProductPage';
import { store } from './app/store';
import productsSlice from './features/products-page/productsSlice';
import SearchPage from './features/search-page/SearchPage';
import Footer from './features/footer/Footer';
import CategoryPage from './features/categories-page/CategoriesPage';

function App() {
  useEffect(() => {
    store.dispatch(productsSlice.actions.getCategories({}));

    /**
     * remove this when you setup the server
     */
    store.dispatch(productsSlice.actions.getProducts({}));
    // end of remove this
  }, []);

  return (
    <BrowserRouter /*basename="/eshop-template"*/>
      <div className="App">
        <Navbar></Navbar>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories" element={<CategoryPage />}></Route>
          <Route path="/categories/:parent" element={<CategoryPage />}></Route>
          <Route path="/products/:categoryId" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/search/:query" element={<SearchPage />}></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
