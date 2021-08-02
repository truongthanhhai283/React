import { Types } from "../../constants/types";
import { getCategories, getCategoriesLv1 } from "../../untils/service";

const initialState = {
  products: [],
  filters: {},
  isFilter: false,
  isLoading: false,
  showResultFor: [],
  types: [],
  brands: [],
  panigations: {
    currentPage: 1,
    total: 1,
    size: 16,
  },
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ALL_PRODUCT: {
      const { categories, types, brands } = getCategories(
        action.payload.products
      );
      state = {
        ...state,
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }

    case Types.GET_CATEGORIES_LVL_0: {
      const { categories, types, brands } = getCategoriesLv1(
        action.payload.products,
        state.showResultFor,
        action.payload.category
      );
      state = {
        ...state,
        filters: { ...state.filters, ...action.payload.filters },
        isFilter: true,
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }

    case Types.CHANGE_CURRENT_PAGE: {
      state = {
        ...state,
        isLoading: false,
        products: action.payload.productsInPage,
        panigations: {
          ...state.panigations,
          currentPage: action.payload.currentPage,
          size: action.payload.size,
        },
      };
      return state;
    }
    case Types.SET_IS_LOADING: {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
};