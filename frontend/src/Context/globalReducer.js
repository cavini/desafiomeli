import {
  SET_PRODUCTS,
  SET_CATEGORIES,
  SET_ERROR,
  SET_PRODUCT_DETAIL,
  LOADING,
  SET_BREADCRUMB_ARRAY,
  IS_SEARCH,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        error: false,
        loading: false,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        error: false,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        breadcrumb: [],
        loading: false,
      };
    case IS_SEARCH:
      return {
        ...state,
        isSearch: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        breadcrumb: [],
      };

    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
        loading: false,
      };

    case SET_BREADCRUMB_ARRAY:
      return {
        ...state,
        breadcrumb: action.payload,
      };

    default:
      return state;
  }
};
