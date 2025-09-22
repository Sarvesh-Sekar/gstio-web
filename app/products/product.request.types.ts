export type PRODUCT = {
  productId: number;
  productCode: string;
  userId: string;
  productName: string;
  pricePerUnit: number;
  cgst: number;
  sgst: number;
  igst: number;
  productPrice: number;
};

export type POST_ADD_PRODUCT_REQUEST = {
  searchFor: string;
  offset: number;
  limit: number;
};

export type POST_GET_ALL_PRODUCTS_REQUEST = {
  productId?: number;
  searchFor?: string;
  pageNo: number;
  count: number;
};

export type POST_GET_ALL_PRODUCTS_RESPONSE = {
  products: PRODUCT[];
  totalCount: number;
  count: number;
  pageNo: number;
  totalPages: number;
};

export type POST_DELETE_PRODUCT_REQUEST = {
  productId: number;
};

export type POST_DELETE_PRODUCT_RESPONSE = {
  success: boolean;
  message: string;
};

export type POST_UPDATE_PRODUCT_REQUEST = {
  productId: number;
  productName?: string;
  pricePerUnit?: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  productPrice?: number;
};

export type POST_UPDATE_PRODUCT_RESPONSE = {
  success: boolean;
  message: string;
  product?: PRODUCT;
};