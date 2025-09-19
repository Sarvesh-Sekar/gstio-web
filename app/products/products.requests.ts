import {
  POST_ADD_PRODUCT,
  api,
  GET_ALL_PRODUCTS,
  POST_DELETE_PRODUCT,
  POST_UPDATE_PRODUCT,
} from "@/app/apiUrls";

import {
  POST_ADD_PRODUCT_REQUEST,
  POST_DELETE_PRODUCT_REQUEST,
  POST_GET_ALL_PRODUCTS_REQUEST,
  POST_GET_ALL_PRODUCTS_RESPONSE,
  POST_UPDATE_PRODUCT_REQUEST,
  POST_DELETE_PRODUCT_RESPONSE,
  POST_UPDATE_PRODUCT_RESPONSE
} from "@/app/products/product.request.types";

export const postProduct = async (
  payload: POST_ADD_PRODUCT_REQUEST
): Promise<string> => {
  try {
    const response: string = await api.post(POST_ADD_PRODUCT, payload);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async (
  payload: POST_GET_ALL_PRODUCTS_REQUEST
): Promise<POST_GET_ALL_PRODUCTS_RESPONSE> => {
  try {
    const response = await api.post(GET_ALL_PRODUCTS, payload);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (
  data: POST_UPDATE_PRODUCT_REQUEST
): Promise<POST_UPDATE_PRODUCT_RESPONSE> => {
  try {
    const response = await api.post(POST_UPDATE_PRODUCT, data);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (
  data: POST_DELETE_PRODUCT_REQUEST
): Promise<POST_DELETE_PRODUCT_RESPONSE> => {
  try {
    const response: POST_DELETE_PRODUCT_RESPONSE = await api.post(
      POST_DELETE_PRODUCT,
      data
    );
    return response;
  } catch (err) {
    throw err;
  }
};
