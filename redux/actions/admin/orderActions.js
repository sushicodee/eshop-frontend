import axiosApi from '../../../axiosApi';
import {
  UPDATE_ORDER,
  FETCH_ORDERS,
  UPDATE_ORDER_ERROR,
  FETCH_ORDERS_ERROR,
  SET_LOADING,
  CLEAR_ERRORS,
} from './../../types/admin/orderTypes';
const url = 'order';

export const updateOrder = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosApi.put(`${url}/${payload.id}`, payload, {}, true);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.updatedOrder,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_ORDER_ERROR,
      payload: err,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchOrders = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await axiosApi.get(url, {}, true);
    dispatch({
      type: FETCH_ORDERS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ORDERS_ERROR,
      payload: err,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
