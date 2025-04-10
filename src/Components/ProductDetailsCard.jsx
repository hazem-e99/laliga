import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
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
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", maxWidth: "500px", borderRadius: "12px" }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {product.category}
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

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <IconButton color={liked ? "error" : "default"} onClick={handleLike}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button variant="contained" color="primary" startIcon={<span>🛒</span>}>
            ADD TO CART
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsCard;