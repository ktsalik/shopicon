const changeNavbarTypeMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'navbar/changeType') {
    store.dispatch({ type: 'notification/create', payload: {
      id: Math.random().toString().slice(-5),
      type: 'info',
      text: `Navigation bar changed to ${action.payload.type}`,
    } });
  }

  return next(action);
};

export default changeNavbarTypeMiddleware;