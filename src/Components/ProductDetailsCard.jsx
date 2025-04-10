import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const ProductDetailsCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        maxWidth: 1200,
        margin: "0 auto",
        padding: { xs: "20px 16px", md: "40px 24px" },
        height: "100%",
        boxSizing: "border-box"
      }}
    >
     
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        justifyContent: "center",
        maxWidth: { xs: "300px", md: "400px" },
        height: "auto"
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ 
            width: "100%", 
            height: "auto",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "12px" 
          }}
        />
      </Box>

      {/* product Details */}
      <Box sx={{ 
        flex: 1,
        padding: { xs: "0", md: "0 16px" },
        height: "100%",
        overflow: "hidden"
      }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {product.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {product.brand} |{" "}
          <span style={{ color: product.available ? "green" : "red" }}>
            {product.available ? "Available" : "Out of Stock"}
          </span>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
          <StarIcon sx={{ color: "#FFD700" }} />
          <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>{product.rate}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>

        <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
          EGP {product.price}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <IconButton color={liked ? "error" : "default"} onClick={handleLike}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              padding: "8px 20px",
              fontSize: "0.9rem"
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsCard;