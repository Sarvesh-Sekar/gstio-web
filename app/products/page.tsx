"use client";
import Button from "@mui/material/Button";
import { BadgePlus } from "lucide-react";
import { useState, useEffect } from "react";
import EmptyStateTableComponent from "@/src/components/EmptyTableComponent";
import AddProductModal from "@/src/components/AddProductModal";
import TextInput from "@/src/components/TextInput";
import { useProductsStore } from "@/src/stores/productStore";
import { POST_GET_ALL_PRODUCTS_REQUEST } from "@/app/products/product.request.types";
import CommonTable from "@/src/components/CommonTable";
import { Trash } from "lucide-react";
import { SquarePen } from "lucide-react";
import { getAllProducts } from "@/app/products/products.requests";
import AlertModal from "@/src/components/AlertModal";

export default function Products() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const productData = useProductsStore((state) => state?.productData);
  const getProductList = useProductsStore((state) => state?.getProductList);
  const updateProduct = useProductsStore((state) => state?.updateProduct);
  const deleteProduct = useProductsStore((state) => state?.deleteProduct);

  const [openAlertModal, setOpenAlertModal] = useState(true);
  const [preData, setPreData] = useState({});

  const tableColumns = [
    {
      width: 200,
      label: "Product Name",
      dataKey: "productName",
    },
    {
      width: 200,
      label: "Price Per Unit",
      dataKey: "pricePerUnit",
    },
    {
      width: 200,
      label: "CGST",
      dataKey: "cgst",
    },
    {
      width: 200,
      label: "SGST",
      dataKey: "sgst",
    },
    {
      width: 200,
      label: "IGST",
      dataKey: "igst",
    },
    {
      width: 200,
      label: "Price",
      dataKey: "productPrice",
    },
    {
      width: 200,
      label: "Product Code",
      dataKey: "productCode",
    },
    {
      width: 200,
      label: "Edit",
      dataKey: "edit",
      numeric: true,
      icon: SquarePen,
      onClick: async (productId) => {
        const response = await getAllProducts({
          pageNo: 1,
          searchFor: "",
          productId: productId,
          count: 10,
        });

        setPreData(response?.products[0]);
        setOpen(true);
      },
    },
    {
      width: 200,
      label: "Delete",
      dataKey: "delete",
      numeric: true,
      icon: Trash,

      onClick: async (productId) => {
        setOpenAlertModal(true);
        // await deleteProduct({ productId: productId });
        // fetchProductData({ pageNo: 1, searchFor: "", count: 10 });
      },
    },
  ];
  const fetchProductData = async (payload: POST_GET_ALL_PRODUCTS_REQUEST) => {
    try {
      await getProductList(payload);
      return productData;
    } catch (err) {
      console.log(err);
    }
  };

  const onLoadMore = () => {
    fetchProductData({
      pageNo: productData?.pageNo + 1,
      searchFor: "",
      count: 10,
    });
  };

  const endReached = productData?.totalPages === productData?.pageNo;

  useEffect(() => {
    fetchProductData({ pageNo: 1, searchFor: "", count: 40 });
  }, []);

  return (
    <div className="flex h-full flex-col  w-full items-center gap-y-4 p-2">
      <div className="text-3xl">Welcome to Products Page...</div>
      <div className="flex flex-row w-full h-[15vh] justify-between m-2 p-2">
        <div className="flex flex-col h-full items-start justify-center">
          <div className="text-2xl text-primary">Products</div>
          <div className="text-lg text-muted">
            Manage your Inventory Products here{" "}
          </div>
        </div>

        <div className="flex flex-row h-full items-center gap-x-10  justify-center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1d4ed8",
              fontFamily: "Lexend",
              borderRadius: "5px",

              "&:hover": { backgroundColor: "#67737e", color: "white" },
            }}
            className="flex gap-x-2"
            onClick={() => setOpen(true)}
          >
            <BadgePlus className="w-5 h-5" />
            Add
          </Button>
        </div>
      </div>

      {!productData?.products?.length ? (
        <EmptyStateTableComponent
          title="Products"
          subtitle="Manage your Inventory Products here"
          emptyStateDescription="No Products Found , Add a new Product"
          onClick={() => setOpen(true)}
        />
      ) : (
        <CommonTable
          data={productData?.products}
          columns={tableColumns}
          // endReached={onLoadMore}
          // loader={endReached}
        />
      )}

      {open && (
        <AddProductModal
          open={open}
          preData={preData}
          setPreData={setPreData}
          setOpen={setOpen}
          onSuccessCallBack={() =>
            fetchProductData({
              pageNo: 1,
              searchFor: "",
              count: 40,
            })
          }
        />
      )}
      {openAlertModal && <AlertModal open = {openAlertModal} />}
    </div>
  );
}
