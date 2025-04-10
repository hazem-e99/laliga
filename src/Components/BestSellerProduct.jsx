import React from 'react';
import ProductList from '../Components/ProductList'
const BestSellerProduct = () => {
    return (
        <>
            <div className='pt-5 text-center'>
                <h1 className='text-3xl font-bold'>BestSeller</h1>
            </div>
            <ProductList></ProductList>
        </>
    );
}

export default BestSellerProduct;
