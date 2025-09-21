"use client";
import Dialog from "@mui/material/Dialog";
import {
  CircleX,
  BadgePlus,
  Notebook,
  BadgePercent,
  BadgeIndianRupee,
} from "lucide-react";
import TextInput from "@/src/components/TextInput";
import FormComponent from "@/src/components/FormComponent";
import LinearProgress from "@mui/material/LinearProgress";
import SuccessImage from "@/src/assets/success.gif";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { postProduct } from "@/app/products/products.requests";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { useProductsStore } from "@/src/stores/productStore";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  return (
    <Slide
      {...props}
      direction={direction}
      onEntered={() => setDirection("down")}
      onExited={() => setDirection("up")}
      timeout={{ enter: 300, exit: 300 }}
    />
  );
});

export default function AddProduct({
  open = false,
  setOpen = () => {},
  preData,
  setPreData,
  onSuccessCallBack,
}: any) {
  const getProductList = useProductsStore((state) => state?.getProductList);
  const updateProduct = useProductsStore((state) => state?.updateProduct);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    productName: preData?.productName || "",
    productPrice: preData?.productPrice || "",
    cgst: preData?.cgst || "",
    sgst: preData?.sgst || "",
    igst: preData?.igst || "",
    pricePerUnit: preData?.pricePerUnit || "",
  });

  const disableButton =
    preData?.productName === formData?.productName &&
    Number(preData?.pricePerUnit) === Number(formData?.pricePerUnit) &&
    Number(preData?.productPrice) === Number(formData?.productPrice) &&
    Number(preData?.cgst) === Number(formData?.cgst) &&
    Number(preData?.sgst) === Number(formData?.sgst) &&
    Number(preData?.igst) === Number(formData?.igst);

  const addProduct = async () => {
    try {
      setLoading(true);

      const payloadData: any = {
        productName: formData?.productName,
        pricePerUnit: Number(formData?.pricePerUnit),
        cgst: Number(formData?.cgst),
        sgst: Number(formData?.sgst),
        igst: Number(formData?.igst),
        productPrice: Number(formData?.productPrice),
      };
      const response = await postProduct(payloadData);
      setSuccess(true);
      setOpen(false);
      toast.success("Product Added Successfully");
      onSuccessCallBack();
    } catch (err) {
      toast.error("Something Wrong");
    } finally {
      setLoading(false);
    }
  };

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.keys(formData).filter(
    (key) => formData[key]
  ).length;

  const progress = totalFields
    ? Math.round((filledFields / totalFields) * 100)
    : 0;

  const updateProductData = async () => {
    try {
      setLoading(true);
      const payloadData: any = {
        productId: preData?.productId,
        productName: formData?.productName,
        pricePerUnit: Number(formData?.pricePerUnit),
        cgst: Number(formData?.cgst),
        sgst: Number(formData?.sgst),
        igst: Number(formData?.igst),
        productPrice: Number(formData?.productPrice),
      };

      await updateProduct(payloadData);
      setSuccess(true);
      setOpen(false);
      toast.success("Product Updated Successfully");
      onSuccessCallBack();
    } catch (err) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!success ? (
        <Dialog
          open={open && !success}
          TransitionComponent={Transition}
          transitionDuration={300}
          keepMounted
          sx={{
            classes: {
              root: {
                backDrop: {
                  backdropFilter: "blur(3px)",
                  backgroundColor: "rgba(0,0,30,0.4)",
                },
              },
            },
          }}
          PaperProps={{
            sx: { width: "70vw", maxWidth: "none", height: "100vh" }, // Tailwind on the modal paper
          }}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="flex flex-col h-[85vh] w-full   items-center   rounded-lg">
            <div className="w-[98%] flex flex-row items-center justify-end m-2">
              <div className="text-2xl">
                {preData?.productName?.length ? "Edit Product" : "Add Product"}
              </div>
              <div className="flex flex-row justify-end items-end  w-[39%]">
                <CircleX
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    getProductList({
                      pageNo: 1,
                      searchFor: "",
                      count: 10,
                    });
                    setOpen(false);
                    setPreData({});
                  }}
                />
              </div>
            </div>
            <div className="border-2 border-black rounded-md h-[85%] w-[90%] p-2 flex flex-col gap-y-4">
              <FormComponent
                title={
                  preData?.productName?.length ? "Edit Product" : "Add Product"
                }
                subtitle="Basic Product Details"
                icon={<BadgePlus className="w-7 h-8 animate-spin-slow" />}
              >
                <div className="w-[70%] mb-4">
                  <TextInput
                    type="text"
                    label="Product Name"
                    noOfLines={1}
                    value={formData.productName}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        productName: e.target.value,
                      }));
                    }}
                    icon={<Notebook className="w-5 h-5 text-black" />}
                    color="black"
                    backgroundColor="white"
                    width={"40%"}
                    height={"60px"}
                  />
                </div>
              </FormComponent>

              <FormComponent
                title="Tax Details"
                subtitle="Enter the Tax Percentages"
              >
                <div className="flex flex-row  gap-x-4 justify-evenly mb-4 ">
                  {" "}
                  <TextInput
                    type="number"
                    label="CGST %"
                    noOfLines={1}
                    value={formData?.cgst}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        cgst: e.target.value,
                      }));
                    }}
                    color="black"
                    backgroundColor="white"
                    width={"30%"}
                    height={"60px"}
                    icon={<BadgePercent className="w-5 h-5 text-black" />}
                  />
                  <TextInput
                    type="number"
                    label="SGST %"
                    noOfLines={1}
                    value={formData?.sgst}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        sgst: e.target.value,
                      }));
                    }}
                    color="black"
                    backgroundColor="white"
                    width={"30%"}
                    height={"60px"}
                    icon={<BadgePercent className="w-5 h-5 text-black" />}
                  />
                  <TextInput
                    type="number"
                    label="IGST %"
                    noOfLines={1}
                    value={formData?.igst}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        igst: e.target.value,
                      }));
                    }}
                    color="black"
                    backgroundColor="white"
                    width={"30%"}
                    height={"60px"}
                    icon={<BadgePercent className="w-5 h-5 text-black" />}
                  />
                </div>
              </FormComponent>
              <FormComponent
                title="Price Details"
                subtitle="Enter the Price Details"
              >
                <div className="flex flex-row gap-x-4 justify-around mb-4 ">
                  {" "}
                  <TextInput
                    type="number"
                    label="Price Per Unit"
                    noOfLines={1}
                    value={formData?.pricePerUnit}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        pricePerUnit: e.target.value,
                      }));
                    }}
                    color="black"
                    backgroundColor="white"
                    width={"30%"}
                    height={"60px"}
                    icon={<BadgeIndianRupee className="w-5 h-5 text-black" />}
                  />
                  <TextInput
                    type="number"
                    label="Total Price"
                    noOfLines={1}
                    value={formData?.productPrice}
                    handleOnChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        productPrice: e.target.value,
                      }));
                    }}
                    color="black"
                    backgroundColor="white"
                    width={"30%"}
                    height={"60px"}
                    icon={<BadgeIndianRupee className="w-5 h-5 text-black" />}
                  />
                </div>
              </FormComponent>

              <div className="flex flex-row justify-between items-center mt-2 ">
                <div className="flex flex-row gap-x-8 w-[50%]  items-center text-md">
                  <div className="w-[50%]">
                    {" "}
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        width: "100%",
                        height: "12px",
                        borderRadius: "10px",
                        borderColor: "black",
                        borderWidth: "1px",

                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1D4ED8",
                        },
                      }}
                      className="bg-gray-200"
                    />
                  </div>

                  <p className="text-lg">{` ${filledFields} out of ${totalFields} are filled`}</p>
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    preData?.productName?.length
                      ? updateProductData()
                      : addProduct();
                  }}
                  sx={{
                    backgroundColor: "#1D4ED8",
                    fontFamily: "Lexend",
                    borderRadius: "10px",
                    width: "25%",
                  }}
                  disabled={filledFields !== totalFields || disableButton}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    </>
                  ) : preData?.productName?.length ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        <Dialog
          open={success}
          onClose={() => setSuccess(false)}
          TransitionComponent={Transition}
          transitionDuration={300}
          keepMounted
          sx={{
            classes: {
              root: {
                backDrop: {
                  backdropFilter: "blur(3px)",
                  backgroundColor: "rgba(0,0,30,0.4)",
                },
              },
            },
          }}
          PaperProps={{
            sx: { width: "70vw", maxWidth: "none", height: "100vh" }, // Tailwind on the modal paper
          }}
          className="flex justify-center items-center"
        >
          <div className="flex flex-col h-[85vh] w-full    items-center  justify-center  rounded-lg">
            <div className="flex flex-col gap-y-8 justify-center border-2 border-black mt-8 rounded-[20px] items-center h-full w-[90%]">
              <Image
                src={SuccessImage}
                alt="Success"
                width={300}
                height={300}
                className="h-[60%] w-[40%] object-cover border-2 rounded-[100%]"
              />

              <div className="text-3xl">Product Added Successfully</div>
            </div>{" "}
          </div>
        </Dialog>
      )}
    </>
  );
}
