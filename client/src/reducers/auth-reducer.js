export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
