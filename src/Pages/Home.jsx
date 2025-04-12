import React, { useRef } from 'react';
import AppSlider from '../Components/AppSlider';
import Filter from '../Components/Filter';
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

    const scrollToCategory = (category) => {
        refs[category]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <AppSlider />
            <Filter onCategoryClick={scrollToCategory} />
            <BestSellerProduct />

            {/* Destination section */}
            <div ref={refs['Sneakers']}>
                <Sneakers />
            </div>
            <div ref={refs['Shorts']}>
                <Shorts />
            </div>
            <div ref={refs['Tshirts']}>
                <Tshirts />
            </div>
            <div ref={refs['Pants']}>
                <Pants />
            </div>
            <div ref={refs['Accessories']}>
                <Accessories />
            </div>
        </>
    );
};

export default Home;
