import React, { useRef, useState } from 'react';
import {
  IconButton,
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const scrollToCategory = (category) => {
    refs[category]?.current?.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) setIsFilterOpen(false);
  };

  const handleFilterChange = (filter) => {
    setPriceFilter(filter.priceRange);
    setRatingFilter(filter.rating);
    setSearchTerm(filter.searchTerm);
    console.log('Filter Changed', filter);
  };

  return (
    <>
      {/* زر الفلتر */}
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: 20,
          transform: 'translateY(-50%)',
          zIndex: 1300,
        }}
      >
        <IconButton onClick={toggleFilter} color="primary">
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Drawer بتاع الفلتر */}
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={toggleFilter}
        variant={isMobile ? 'temporary' : 'persistent'}
      >
        <Filter
          onCategoryClick={scrollToCategory}
          onFilterChange={handleFilterChange}
        />
      </Drawer>

      {/* الاسلايدر في مكانه بره الكونتينر */}
      <Box mb={4}>
        <AppSlider />
      </Box>

      {/* المحتوى الرئيسي */}
      <Box
        sx={{
          ml: isMobile ? 0 : isFilterOpen ? 35 : 0,
          transition: 'margin 0.3s ease',
          pt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box mb={4}>
            <BestSellerProduct />
          </Box>

          <Box mb={4}>
            <TrendingNow />
          </Box>

          <Box mb={4} ref={refs['Sneakers']}>
            <Sneakers
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
            />
          </Box>

          <Box mb={4} ref={refs['Shorts']}>
            <Shorts
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
            />
          </Box>

          <Box mb={4} ref={refs['Tshirts']}>
            <Tshirts
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
            />
          </Box>

          <Box mb={4} ref={refs['Pants']}>
            <Pants
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
            />
          </Box>

          <Box mb={4} ref={refs['Accessories']}>
            <Accessories
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
              searchTerm={searchTerm}
            />
          </Box>
        </Container>
      </Box>
      <CustomerReviews/>
    </>
  );
};

export default Home;
