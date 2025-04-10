import React from "react";
import { Box } from "@mui/material";
import ProductDetailsCard from "../components/ProductDetailsCard";

const ProductPage = () => {
  const product = {
    title: "Woman Shawl",
    brand: "DeFacto",
    category: "Women's Fashion",
    price: 149,
    rate: 4.8,
    available: true,
    image: "anomaly-WWesmHEgXDs-unsplash.jpg",
    description: "Material: Polyester Blend | Colour: Multicolour | Department: Women",
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4, backgroundColor: "#fff" }}>
      <ProductDetailsCard product={product} />
    </Box>
  );
};

export default ProductPage;
