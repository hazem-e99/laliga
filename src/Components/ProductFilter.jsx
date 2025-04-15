// Components/Filter.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
const ProductFilter = ({ onCategoryClick, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const categories = [
    { id: 'Sneakers', name: 'Sneakers' },
    { id: 'Shorts', name: 'Shorts' },
    { id: 'Tshirts', name: 'T-shirts' },
    { id: 'Pants', name: 'Pants' },
    { id: 'Accessories', name: 'Accessories' }
  ];

  const priceRanges = [
    { id: '0-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: '200+', name: 'Over $200' }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategoryClick(categoryId);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
    onFilterChange({ priceRange: e.target.value, rating: selectedRating, searchTerm });
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    onFilterChange({ priceRange: selectedPrice, rating: e.target.value, searchTerm });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ priceRange: selectedPrice, rating: selectedRating, searchTerm: e.target.value });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: isMobile ? '100%' : 300,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
      {t('filter_products')}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
        {t('categories')}
        </Typography>
        <List dense>
          {categories.map((category) => (
            <ListItemButton
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              selected={selectedCategory === category.id}
              sx={{
                borderRadius: 2,
                mb: 1,
                fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
                bgcolor: selectedCategory === category.id ? 'primary.light' : 'transparent',
                color: selectedCategory === category.id ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              {category.name}
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
        {t('search_by_product_name')}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          label="Search"
        />
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
        {t('price_range')}
        </Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Price</InputLabel>
          <Select
            value={selectedPrice}
            onChange={handlePriceChange}
            label="Price"
          >
            <MenuItem value="">All Prices</MenuItem>
            {priceRanges.map((range) => (
              <MenuItem key={range.id} value={range.id}>
                {range.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
        {t('rating')}
        </Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>  {t('rating')}</InputLabel>
          <Select
            value={selectedRating}
            onChange={handleRatingChange}
            label="Rating"
          >
            <MenuItem value="">{t('all_ratings')}</MenuItem>
            <MenuItem value="4">{t('4_and_above')}</MenuItem>
            <MenuItem value="4.5">{t('4_5_and_above')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default ProductFilter;
