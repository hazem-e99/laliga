import React, { useRef, useState } from 'react';
import {
  IconButton,
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
  Container,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import AppSlider from '../Components/AppSlider';
import Filter from '../Components/ProductFilter';
import BestSellerProduct from '../Components/BestSellerProduct';
import TrendingNow from '../Components/TrendingNow';
import Sneakers from '../Components/Sneakers';
import Shorts from '../Components/Shorts';
import Tshirts from '../Components/Tshirts';
import Pants from '../Components/Pants';
import Accessories from '../Components/Accessories';
import CustomerReviews from '../Components/CustomerReviews';

const Home = () => {
  const refs = {
    Sneakers: useRef(null),
    Shorts: useRef(null),
    Tshirts: useRef(null),
    Pants: useRef(null),
    Accessories: useRef(null),
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [categoryFilter, setCategoryFilter] = useState('');

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const scrollToCategory = (category) => {
    refs[category]?.current?.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) setIsFilterOpen(false);
  };

  const handleFilterChange = (filter) => {
    setCategoryFilter(filter.category);
    setPriceFilter(filter.priceRange);
    setRatingFilter(filter.rating);
    setSearchTerm(filter.searchTerm);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1300,
        }}
      >
        <Tooltip title="Open Filters">
          <IconButton
            onClick={toggleFilter}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              width: 50,
              height: 50,
              borderRadius: '50%',
              boxShadow: 4,
            }}
          >
            <TuneIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={toggleFilter}
        variant={isMobile ? 'temporary' : 'persistent'}
        sx={{ '& .MuiDrawer-paper': { width: 280 } }}
      >
        <Filter
          onCategoryClick={scrollToCategory}
          onFilterChange={handleFilterChange}
        />
      </Drawer>

      {/* Slider Section */}
      <Box mb={6}>
        <AppSlider />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          ml: isMobile ? 0 : isFilterOpen ? 35 : 0,
          transition: 'margin 0.3s ease',
          pt: 4,
          backgroundColor: '#fafafa',
        }}
      >
        <Box
          sx={{
            maxWidth: '1280px',
            margin: '0 auto',
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box mb={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <BestSellerProduct />
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box mb={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <TrendingNow />
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box mb={6} ref={refs['Sneakers']}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <Sneakers
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </Box>

          <Box mb={6} ref={refs['Shorts']}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <Shorts
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </Box>

          <Box mb={6} ref={refs['Tshirts']}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <Tshirts
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </Box>

          <Box mb={6} ref={refs['Pants']}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <Pants
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </Box>

          <Box mb={6} ref={refs['Accessories']}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <Accessories
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
            />
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box mb={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
            </Typography>
            <CustomerReviews />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;