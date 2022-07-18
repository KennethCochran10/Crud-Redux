import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import contactReducer from '../features/contacts/contactslice'
import thunk from 'redux-thunk'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contactList: contactReducer,

  },
  devTools: composeWithDevTools(),
  middleware: [thunk]


});
