const getStatsProductsMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getStatsProducts') {
    const getPromises = [];

    const getNewArrivalProductsPromise = fetch('https://dummyjson.com/products/category/smartphones').then((response) => {
      return response.json().then((data) => {
        return data.products;
      });
    });
    getPromises.push(getNewArrivalProductsPromise);

    const getBestSellerProductsPromise = fetch('https://dummyjson.com/products/category/laptops').then((response) => {
      return response.json().then((data) => {
        return data.products;
      });
    });
    getPromises.push(getBestSellerProductsPromise);

    const getSaleProductsPromise = fetch('https://dummyjson.com/products/category/home-decoration').then((response) => {
      return response.json().then((data) => {
        return data.products;
      });
    });
    getPromises.push(getSaleProductsPromise);

    Promise.all(getPromises).then((data: any[]) => {
      action.payload = {
        newArrival: data[0],
        bestSeller: data[1],
        sale: data[2],
      };
      
      next(action);
    });
  } else {
    next(action);
  }
};

export default getStatsProductsMiddleware;