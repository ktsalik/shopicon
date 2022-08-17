import axios from "axios";
import { baseUrl } from "../../helpers";

const categoriesMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'products/getCategories') {
    axios.get(`${baseUrl}categories.json`).then((response) => {
      store.dispatch({ type: 'products/categoriesLoaded', payload: response.data });
    });
  }

  return next(action);
};

export default categoriesMiddleware;