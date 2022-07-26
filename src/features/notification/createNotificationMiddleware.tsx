const createNotificationMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === 'notification/create') {
    setTimeout(() => {
      store.dispatch({ type: 'notification/remove', payload: { id: action.payload.id }});
    }, 5000);
  }

  return next(action);
};

export default createNotificationMiddleware;