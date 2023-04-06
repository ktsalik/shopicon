const getFeaturedProductsMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getFeaturedProducts') {
    fetch('https://dummyjson.com/products/category/smartphones').then((response) => {
      response.json().then((data) => {
        action.payload = data.products;
        next(action);
      });
    });
  } else {
    next(action);
  }
};

export default getFeaturedProductsMiddleware;