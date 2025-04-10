import React from "react";
import { Box } from "@mui/material";
import ProductDetailsCard from "../components/ProductDetailsCard";

const ProductPage = () => {
  const product = {
    title: "T-shirt",
    brand: "DeFacto",
    category: "men's Fashion",
    price: 300,
    rate: 4.8,
    available: true,
    image: "anomaly-WWesmHEgXDs-unsplash.jpg",
    description: "Material: Polyester Blend | Colour: Multicolour | Department: T-shirt",
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, backgroundColor: "#fff" }}>
      <ProductDetailsCard product={product} />
    </Box>
  );
};

export default ProductPage;