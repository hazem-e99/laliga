import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import ProductDetailsCard from "../components/ProductDetailsCard";
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct({
          title: productResponse.data.title,
          brand: "DeFacto",
          price: productResponse.data.price,
          available: true,
          image: productResponse.data.image,
          description: productResponse.data.description,
        });

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

    // Check if user already submitted a review
    const hasExistingReview = reviews.some(review => review.name === userName);
    if (hasExistingReview) {
      setError('You have already submitted your feedback for this product');
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
      <Typography>Loading...</Typography>
    </Box>;
  }

  if (!product) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Typography>Product not found</Typography>
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
        {/* Larger Feedback Title */}
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold', 
          mb: 4,
          fontSize: '1.5rem',
          textAlign: 'left'
        }}>
          CUSTOMER FEEDBACK
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Reviews List - Above Form */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} key={review.id}>
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

        {/* Review Form - Below Reviews */}
        <Paper elevation={3} sx={{ 
          p: 3,
          mb: 4,
          width: '100%'
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            SHARE YOUR THOUGHTS
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
              SUBMIT REVIEW
            </Button>
          </Box>
        </Paper>

        {reviews.length === 0 && !error && (
          <Typography color="text.secondary" sx={{ 
            textAlign: 'center', 
            py: 4,
            fontStyle: 'italic'
          }}>
            No reviews yet. Be the first to share your experience!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;