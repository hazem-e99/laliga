import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Rating, Box } from '@mui/material';

const reviews = [
  {
    name: 'Ahmed Khaled',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    review: 'The product is excellent and the quality is top-notch. Will definitely buy again!',
    rating: 5,
  },
  {
    name: 'Sara Mahmoud',
    avatar: 'https://randomuser.me/api/portraits/women/74.jpg',
    review: 'The service was fast, but the size was a bit small. Overall, a good experience.',
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
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-info bg-black mb-6 border-b-2 border-primary pb-2 shadow-sm capitalize">
        CustomerReviews</h2>

      {/* Reviews Grid */}
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid  xs={12} sm={6} md={4} key={index}>
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
    </Box>
  );
};

export default CustomerReviews;
