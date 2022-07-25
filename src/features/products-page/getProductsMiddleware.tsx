import axios from "axios";

const productsMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getProducts') {
    axios.get(`http://localhostt/eshop-server/products/${action.payload.categoryId}?page=${action.payload.page}`).then((response) => {
      /**
       * server response should be a JSON object as the example below
        {
          products: [
            {
              id: 1,
              category: {
                id: 1,
                name: 'Headphones',
              },
              thumbnail: 'headphones-1.jpeg',
              images: [
                'headphones-1.jpeg',
                'headphones-1.jpeg',
              ],
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 16.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
              ],
            },
          ],
          page_count: 10,
        }
       */
      store.dispatch({ type: 'products/productsLoaded', payload: response.data });
    }).catch((err) => {
      /**
       * remove this when you setup the server
       */
      store.dispatch({
        type: 'products/productsLoaded',
        payload: {
          products: [
            {
              id: 1,
              category: {
                id: 1,
                name: 'Headphones',
                parent: 0,
              },
              thumbnail: 'headphones-1.jpeg',
              images: [
                'headphones-1.jpeg',
                'headphones-1.jpeg',
                'headphones-1.jpeg',
                'headphones-1.jpeg',
              ],
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 16.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 2,
              category: {
                id: 1,
                name: 'Headphones',
                parent: 0,
              },
              thumbnail: 'headphones-2.jpeg',
              images: [
                'headphones-2.jpeg',
                'headphones-2.jpeg',
                'headphones-2.jpeg',
                'headphones-2.jpeg',
              ],
              title: 'Black Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 20.00,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 3,
              category: {
                id: 1,
                name: 'Headphones',
                parent: 0,
              },
              thumbnail: 'headphones-3.jpeg',
              images: [
                'headphones-3.jpeg',
                'headphones-3.jpeg',
                'headphones-3.jpeg',
                'headphones-3.jpeg',
              ],
              title: 'Red Headphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 27.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 4,
              category: {
                id: 2,
                name: 'Earphones',
                parent: 0,
              },
              thumbnail: 'earphone-1.jpeg',
              images: [
                'earphone-1.jpeg',
                'earphone-1.jpeg',
                'earphone-1.jpeg',
                'earphone-1.jpeg',
              ],
              title: 'White Earphones',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 18.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 5,
              category: {
                id: 2,
                name: 'Earphones',
                parent: 0,
              },
              thumbnail: 'earphone-2.jpeg',
              images: [
                'earphone-2.jpeg',
                'earphone-2.jpeg',
                'earphone-2.jpeg',
                'earphone-2.jpeg',
              ],
              title: 'Black Earphone',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 21.00,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 6,
              category: {
                id: 2,
                name: 'Earphones',
                parent: 0,
              },
              thumbnail: 'earphone-3.jpeg',
              images: [
                'earphone-3.jpeg',
                'earphone-3.jpeg',
                'earphone-3.jpeg',
                'earphone-3.jpeg',
              ],
              title: 'Yellow Earphone',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 30.00,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 7,
              category: {
                id: 3,
                name: 'Microphones',
                parent: 0,
              },
              thumbnail: 'microphone-1.jpeg',
              images: [
                'microphone-1.jpeg',
                'microphone-1.jpeg',
                'microphone-1.jpeg',
                'microphone-1.jpeg',
              ],
              title: 'Blue Microphone',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 14.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 8,
              category: {
                id: 3,
                name: 'Microphones',
                parent: 0,
              },
              thumbnail: 'microphone-2.jpeg',
              images: [
                'microphone-2.jpeg',
                'microphone-2.jpeg',
                'microphone-2.jpeg',
                'microphone-2.jpeg',
              ],
              title: 'Gold Microphone',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 18.50,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
            {
              id: 9,
              category: {
                id: 3,
                name: 'Microphones',
                parent: 0,
              },
              thumbnail: 'microphone-3.jpeg',
              images: [
                'microphone-3.jpeg',
                'microphone-3.jpeg',
                'microphone-3.jpeg',
                'microphone-3.jpeg',
              ],
              title: 'Red Black Microphone',
              short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi.",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis volutpat mi. Nunc at ligula sed dolor euismod vestibulum id euismod urna. Fusce et libero vulputate, laoreet dui in, consequat ipsum. Cras urna odio, tincidunt id suscipit eu, tempor non nisi. Mauris interdum nisi quis molestie convallis. Morbi molestie justo sit amet sem porttitor, in ultricies eros tincidunt. Integer laoreet lobortis metus.",
              price: 20.00,
              details: [
                {
                  name: 'Color',
                  value: 'Red',
                },
                {
                  name: 'Type',
                  value: 'Cable',
                },
                {
                  name: 'Battery',
                  value: '1000mh',
                },
                {
                  name: 'Platform',
                  value: 'Windows',
                },
              ],
            },
          ],
          page_count: 20,
        },
      });
      // end of remove this
    });
  }

  return next(action);
};

export default productsMiddleware;