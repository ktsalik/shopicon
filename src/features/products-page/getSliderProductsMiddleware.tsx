const getSliderProductsMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getSliderProducts') {
    fetch('https://dummyjson.com/products/category/laptops').then((response) => {
      response.json().then((data) => {
        action.payload = data.products;
        next(action);
      });
    });
  } else {
    next(action);
  }
};

export default getSliderProductsMiddleware;