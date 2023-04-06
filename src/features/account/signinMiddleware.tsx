import axios from "axios";

const signInMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'account/login') {
    axios.post(`dummy-sign-in`, {
      email: action.payload.email,
      password: action.payload.password,
    }).then((response: any) => {
      if (response.status === 'ok') {
        store.dispatch({ type: 'account/updateState', payload: {
          hasLoggedIn: true,
          username: response.username,
        }});
      }
    }).catch((err: any) => {
      store.dispatch({ type: 'account/updateState', payload: {
        hasLoggedIn: true,
        username: 'John',
      }});
    });
  }

  return next(action);
};

export default signInMiddleware;