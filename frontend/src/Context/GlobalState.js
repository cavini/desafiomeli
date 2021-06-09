import React, { useReducer } from 'react';
import ProductList from '../lib/ProductList';
import GlobalContext from './globalContext';
import globalReducer from './globalReducer';
import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_ERROR,
  SET_PRODUCT_DETAIL,
  LOADING,
  SET_BREADCRUMB_ARRAY,
  IS_SEARCH,
} from '../types';
import ProductDetails from '../lib/ProductDetails';

const GlobalState = (props) => {
  const initialState = {
    products: [],
    categories: [],
    error: false,
    productDetail: {},
    loading: true,
    breadcrumb: [],
    isSearch: false,
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);
  const validateSearchQuery = async (e) => {
    if (!e) {
      setError('Por favor, preencha os campos de busca.');
      return false;
    } else {
      const response = await getProductList(e);
      if (response.items.length > 0) {
        return { valid: true, path: `/items?search=${e}` };
      } else {
        return false;
      }
    }
  };

  const setIsSearch = (boolean) => {
    dispatch({ type: IS_SEARCH, payload: boolean });
  };

  const validateDetailId = async (id) => {
    const response = await getProductDetail(id);
    if (!response) {
      setError('Este produto não existe.');
      return { valid: false, path: `/items/${id}` };
    } else {
      return { valid: true, path: `/items/${id}` };
    }
  };

  const getProductList = async (query) => {
    dispatch({ type: LOADING });
    const response = await fetch(`/api/items?search=${query}`);
    const data = await response.json();

    if (data.results.length === 0) {
      setError('Não encontramos nenhum produto para essa busca.');
      return { items: [] };
    } else {
      const shortArray = trimArray(data);

      let categories = getCategories(shortArray);
      let uniqueCategories = [...new Set(categories)];

      const allCategories = data.results.map((item) => item.category_id);

      const mostFrequentCategoryId = getMostFrequentCategory(allCategories);

      createBreadCrumb(mostFrequentCategoryId);

      const categoryNames = await getCategoriesName(uniqueCategories);

      const productList = new ProductList(shortArray, categoryNames);
      dispatch({ type: SET_PRODUCTS, payload: productList.items });
      dispatch({ type: SET_CATEGORIES, payload: categoryNames });
      console.log(productList);
      return productList;
    }
  };

  const trimArray = (array) => {
    return array.results.slice(0, 4);
  };

  const getCategories = (shortArray) => {
    return shortArray.map((item) => item.category_id);
  };

  const getCategoriesName = async (categories) => {
    return await Promise.all(
      categories.map(async (category) => {
        const categoryName = await fetch(
          `https://api.mercadolibre.com/categories/${category}`
        );

        let result = await categoryName.json();

        return result.name;
      })
    );
  };

  const getMostFrequentCategory = (array) => {
    const hashmap = array.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  };

  const createBreadCrumb = async (id) => {
    const response = await fetch(`/api/categories/${id}`);

    const data = await response.json();

    const breadcrumbArray = data.path_from_root.map((item) => item.name);

    dispatch({ type: SET_BREADCRUMB_ARRAY, payload: breadcrumbArray });
  };

  const getProductDetail = async (query) => {
    dispatch({ type: LOADING });
    const response = await fetch(`/api/items/${query}`);
    if (response.ok) {
      const data = await response.json();

      await createBreadCrumb(data.category_id);
      await setProductDetail(data);
      return true;
    }
  };

  const setProductDetail = async (product) => {
    const productDetail = new ProductDetails(product);
    console.log(productDetail);
    dispatch({ type: SET_PRODUCT_DETAIL, payload: productDetail });
  };

  const setError = (messageString) => {
    dispatch({
      type: SET_ERROR,
      payload: { message: messageString },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        searchQuery: state.searchQuery,
        searchResults: state.searchResults,
        categories: state.categories,
        error: state.error,
        productDetail: state.productDetail,
        loading: state.loading,
        breadcrumb: state.breadcrumb,
        isSearch: state.isSearch,
        getProductList,
        setError,
        getProductDetail,
        validateSearchQuery,
        validateDetailId,
        setIsSearch,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
