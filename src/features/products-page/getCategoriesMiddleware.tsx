import axios from "axios";

const categoriesMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getCategories') {
    axios.get(`http://localhostt/eshop-server/categories`).then((response) => {
      store.dispatch({ type: 'products/categoriesLoaded', payload: response.data });
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      store.dispatch({ 
        type: 'products/categoriesLoaded',
        // server response is an array of objects
        payload: [
          {
            id: 1,
            name: 'Headphones',
            images: [
              'headphones-1.jpeg',
              'headphones-2.jpeg',
              'headphones-3.jpeg',
            ],
            parent: 0,
          },
          {
            id: 2,
            name: 'Earphones',
            images: [
              'earphone-1.jpeg',
              'earphone-2.jpeg',
              'earphone-3.jpeg',
            ],
            parent: 0,
          },
          {
            id: 3,
            name: 'Microphones',
            images: [
              'microphone-1.jpeg',
              'microphone-2.jpeg',
              'microphone-3.jpeg',
            ],
            parent: 0,
          },
          {
            id: 4,
            name: 'Category',
            images: [],
            parent: 0,
          },
          {
            id: 5,
            name: 'Subcategory A',
            images: [],
            parent: 4,
          },
          {
            id: 6,
            name: 'Subcategory B',
            images: [],
            parent: 4,
          },
          {
            id: 7,
            name: 'Subcategory C',
            images: [],
            parent: 4,
          },
          {
            id: 8,
            name: 'Subcategory D',
            images: [],
            parent: 7,
          },
        ],
      });
      // end of remove this
    });
  }

  return next(action);
};

export default categoriesMiddleware;