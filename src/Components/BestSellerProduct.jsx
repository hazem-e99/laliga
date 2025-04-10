
import React from 'react';
import ProductList from './ProductList';
import SportsProducts from './ProductList';

const BestSellerProduct = () => {
    return (
        <>
            <div className='pt-5 text-center'>
                <h1 className='text-3xl font-bold'>BestSeller</h1>
            </div>
           <SportsProducts></SportsProducts>
           <ProductList></ProductList>
        </>
    );
}

export default BestSellerProduct;
