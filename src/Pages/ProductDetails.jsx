import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from '../sports_products.json';

import { 
  Box, 
  IconButton, 
  TextField, 
  Button, 
  Avatar, 
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductDetailsCard from "../Components/ProductDetailsCard";
import { useTranslation } from 'react-i18next';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation(); 
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const localProduct = productsData.products.find(p => p.id === parseInt(id));

        if (localProduct) {
          setProduct({
            id: localProduct.id, 
            title: localProduct.title,
            brand: localProduct.brand || "Brand", 
            price: localProduct.price,
            rate: localProduct.rating?.rate || 4,
            available: localProduct.available ?? true,
            image: localProduct.image,
            description: localProduct.description,
            category: localProduct.category,
          });
        } else {
          setProduct(null);
        }

        const savedReviews = JSON.parse(localStorage.getItem(`product_${id}_reviews`)) || [];
        setReviews(savedReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!newReview.trim()) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? `${user.firstName} ${user.lastName}` : 'Anonymous';

    const hasExistingReview = reviews.some(review => review.name === userName);
    if (hasExistingReview) {
      setError(t("no_reviews"));
      return;
    }

    const review = {
      id: Date.now(),
      name: userName,
      comment: newReview,
      date: new Date().toLocaleDateString('en-US')
    };

    const updatedReviews = [review, ...reviews].slice(0, 4);
    setReviews(updatedReviews);
    localStorage.setItem(`product_${id}_reviews`, JSON.stringify(updatedReviews));
    setNewReview('');
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Typography>{t("loading")}</Typography>
    </Box>;
  }

  if (!product) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Typography> {t("product_not_found")}</Typography>
    </Box>;
  }

  return (
    <Box sx={{ 
      backgroundColor: "#fff",
      minHeight: "calc(100vh - 64px)",
      pb: 4,
      position: "relative"
    }}>
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

      {/* Reviews Section */}
      <Box sx={{ 
        maxWidth: 1200, 
        margin: '40px auto 0',
        px: { xs: 2, md: 4 },
      }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold', 
          mb: 4,
          fontSize: '1.5rem',
          textAlign: 'left'
        }}>
          {t("customer_feedback")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {reviews.map((review) => (
            <Grid  xs={12} sm={6} key={review.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                borderRadius: 2
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main',
                      mr: 2,
                      width: 40,
                      height: 40
                    }}>
                      {review.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">{review.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ 
                    mt: 1,
                    lineHeight: 1.6
                  }}>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ 
          p: 3,
          mb: 4,
          width: '100%'
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {t("share_your_thoughts")}
          </Typography>
          <Box component="form" onSubmit={handleReviewSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              label="Write your product experience here"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={!newReview.trim()}
              sx={{ width: '100%' }}
            >
            {t("submit_review")}
            </Button>
          </Box>
        </Paper>

        {reviews.length === 0 && !error && (
          <Typography color="text.secondary" sx={{ 
            textAlign: 'center', 
            py: 4,
            fontStyle: 'italic'
          }}>
             {t("no_reviews")}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;