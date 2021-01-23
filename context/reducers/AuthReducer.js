import { SET_CURRENT_USER } from './../actions/AuthActions';
import isEmpty from './../../assets/common/isEmpty';
export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
