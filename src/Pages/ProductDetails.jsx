import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductDetailsCard from "../components/ProductDetailsCard";
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct({
          title: response.data.title,
          brand: "DeFacto",
          price: response.data.price,
          rate: response.data.rating.rate,
          available: true,
          image: response.data.image,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        height: "60vh",
        p: 4 
      }}>
        Loading...
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        height: "60vh",
        p: 4 
      }}>
        Product not found
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: "#fff",
      minHeight: "calc(100vh - 64px)", 
      pb: 4,
      position: "relative"
    }}>
      {/* pack to home */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: "fixed",
          top: { xs: 70, md: 80 },
          left: 16,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: 1,
          '&:hover': {
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: 2
          }
        }}
      >
        <ArrowBackIcon fontSize="medium" />
      </IconButton>

      <ProductDetailsCard product={product} />
    </Box>
  );
};

export default ProductPage;