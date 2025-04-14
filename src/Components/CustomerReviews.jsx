import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Rating } from '@mui/material';

const reviews = [
  {
    name: 'Ahmed Khaled',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f8f0b2f1b3da?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    review: 'The product is excellent and the quality is top-notch. Will definitely buy again!',
    rating: 5,
  },
  {
    name: 'Sara Mahmoud',
    avatar: 'https://via.placeholder.com/150',
    review: 'Delivery was fast, but the size was a bit small. Overall, a good experience.',
    rating: 4,
  },
  {
    name: 'Mohamed Ali',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    review: 'I love sports, and this product helped me train better. Thanks a lot!',
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <Grid container spacing={4} justifyContent="center" padding={4}>
      {reviews.map((review, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 4 }}>
            <CardHeader
              avatar={<Avatar src={review.avatar} alt={review.name} />}
              title={<Typography variant="h6">{review.name}</Typography>}
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {review.review}
              </Typography>
              <Rating value={review.rating} readOnly />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomerReviews;

