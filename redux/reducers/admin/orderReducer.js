import {
  UPDATE_ORDER,
  FETCH_ORDERS,
  UPDATE_ORDER_ERROR,
  FETCH_ORDERS_ERROR,
  CLEAR_ERRORS,
  SET_LOADING,
} from './../../types/admin/orderTypes';

const INITIAL_STATE = {
  orders: [],
  isLoading: false,
  errors: {},
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload.orderList,
      };
    case UPDATE_ORDER:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      return { ...state, orders: updatedOrders };
    case UPDATE_ORDER_ERROR:
      return { ...state, error: action.payload.error };
    case FETCH_ORDERS_ERROR:
      return { ...state, error: action.payload.error };
    case CLEAR_ERRORS:
      return { ...state, errors: {} };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
