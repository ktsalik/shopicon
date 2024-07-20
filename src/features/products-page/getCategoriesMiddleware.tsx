const categoriesMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getCategories') {
    fetch('https://dummyjson.com/products/categories').then((response) => {
      response.json().then((data) => {
        action.payload = data;
        next(action);
      });
    });
  } else {
    next(action);
  }
};

export default categoriesMiddleware;