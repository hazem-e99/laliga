import React from 'react';
import AppSlider from '../Components/AppSlider';
import ProductList from '../Components/ProductList';
import Filter from '../Components/Filter';
import BestSellerProduct from '../Components/BestSellerProduct';
const Home = () => {
    return (
        <>
            <AppSlider/>
            <Filter/>
            {/* <ProductList></ProductList> */}
            <BestSellerProduct/>
        </>
    );
}

export default Home;
