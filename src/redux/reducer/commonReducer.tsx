import { IS_LOADING } from '../actionTypes';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default:
      return state;
  }
}
