import React, { useRef, useState } from 'react';
import {
  IconButton,
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
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

      <Box sx={{ ml: isMobile ? 0 : isFilterOpen ? 35 : 0, transition: 'margin 0.3s ease' }}>
        <AppSlider />
        <BestSellerProduct />
        <TrendingNow />

        <div ref={refs['Sneakers']}>
          <Sneakers 
            priceFilter={priceFilter} 
            ratingFilter={ratingFilter} 
            searchTerm={searchTerm} 
          />
        </div>
        <div ref={refs['Shorts']}>
          <Shorts 
            priceFilter={priceFilter} 
            ratingFilter={ratingFilter} 
            searchTerm={searchTerm} 
          />
        </div>
        <div ref={refs['Tshirts']}>
          <Tshirts 
            priceFilter={priceFilter} 
            ratingFilter={ratingFilter} 
            searchTerm={searchTerm} 
          />
        </div>
        <div ref={refs['Pants']}>
          <Pants 
            priceFilter={priceFilter} 
            ratingFilter={ratingFilter} 
            searchTerm={searchTerm} 
          />
        </div>
        <div ref={refs['Accessories']}>
          <Accessories 
            priceFilter={priceFilter} 
            ratingFilter={ratingFilter} 
            searchTerm={searchTerm} 
          />
        </div>
      </Box>
    </>
  );
};

export default Home;
