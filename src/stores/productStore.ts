import {
  PRODUCT,
  POST_GET_ALL_PRODUCTS_REQUEST,
  POST_GET_ALL_PRODUCTS_RESPONSE,
  POST_DELETE_PRODUCT_REQUEST,
  POST_DELETE_PRODUCT_RESPONSE,
  POST_UPDATE_PRODUCT_REQUEST,
  POST_UPDATE_PRODUCT_RESPONSE,
} from "@/app/products/product.request.types";

import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "@/app/products/products.requests";

import { create } from "zustand";
interface ProductState {
  productData: {
    products: PRODUCT[];
    totalCount: number;
    count: number;
    pageNo: number;
    totalPages: number;
  };
}

interface ProductActions {
  getProductList: (
    payload: POST_GET_ALL_PRODUCTS_REQUEST
  ) => Promise<POST_GET_ALL_PRODUCTS_RESPONSE>;

  deleteProduct: (
    payload: POST_DELETE_PRODUCT_REQUEST
  ) => Promise<POST_DELETE_PRODUCT_RESPONSE>;

  updateProduct: (
    payload: POST_UPDATE_PRODUCT_REQUEST
  ) => Promise<POST_UPDATE_PRODUCT_RESPONSE>;
}

type ProductStore = ProductState & ProductActions;

const initialState: ProductState = {
  productData: {
    products: [],
    totalCount: 0,
    count: 0,
    pageNo: 0,
    totalPages: 0,
  },
};

export const useProductsStore = create<ProductStore>((set, get) => ({
  ...initialState,
  getProductList: async (
    payload: POST_GET_ALL_PRODUCTS_REQUEST
  ): Promise<POST_GET_ALL_PRODUCTS_RESPONSE> => {
    try {
      const response = await getAllProducts(payload);
     
      set((state) => ({
        productData: {
          // keep other keys
          products:
            payload?.pageNo === 1
              ? response?.products
              : [...state?.productData?.products, ...response?.products],
          totalCount: response?.totalCount,
          count: response?.count,
          pageNo: response?.pageNo,
          totalPages: response?.totalPages,
        },
      }));

      // console.log("store");
      // console.log(initialState?.productData);
      return response;
    } catch (err) {
      throw err;
    }
  },

  
  deleteProduct: async (
    payload: POST_DELETE_PRODUCT_REQUEST
  ): Promise<POST_DELETE_PRODUCT_RESPONSE> => {
    try {
      const response = await deleteProduct(payload);

      if (response?.success) {
        set((state) => ({
          productData: {
            ...state.productData,
            products:
              state?.productData?.products?.filter((product: PRODUCT) => {
                return product?.productId !== payload?.productId;
              }) || [],
          },
        }));
      }

      return response;
    } catch (err) {
      throw err;
    }
  },
  updateProduct: async (
    payload: POST_UPDATE_PRODUCT_REQUEST
  ): Promise<POST_UPDATE_PRODUCT_RESPONSE> => {
    try {
      const response = await updateProduct(payload);

      if (response?.success)
        set((state) => ({
          productData: {
            ...state.productData,
            products: state?.productData?.products?.map((product: PRODUCT) =>
              product?.productId === payload?.productId
                ? response?.product
                : product
            ),
          },
        }));

      return response;
    } catch (err) {
      throw err;
    }
  },
}));
