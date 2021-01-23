import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import cartItems from './reducers/cartItem';
import orderReducer from './reducers/admin/orderReducer';

const reducers = combineReducers({
  cartItems: cartItems,
  orderStore: orderReducer,
});
const middleware = [thunk];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
