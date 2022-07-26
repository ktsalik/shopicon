import { createSlice } from "@reduxjs/toolkit"

interface Notification {
  id: string;
  type: string;
  text: string;
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [] as Notification[],
  },
  reducers: {
    create: (state, action) => {
      const notification = {
        id: action.payload.id,
        type: action.payload.type,
        text: action.payload.text,
      };

      state.notifications.push(notification);
    },
    remove: (state, action) => {
      const notificationIndex = state.notifications.findIndex((n: Notification) => n.id === action.payload.id);
      
      if (notificationIndex > -1) {
        state.notifications.splice(notificationIndex, 1);
      }
    },
  },
});

export default notificationSlice;