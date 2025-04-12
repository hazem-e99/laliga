import React from 'react';
import SportsProducts from './ProductList';

const TrendingNow = () => {
    return (
        <>
            <div className='pt-5 text-center'>
                <h1 className='text-3xl font-bold'>Trending Now</h1>
            </div>
            <SportsProducts/>
        </>
    );
}

export default TrendingNow;
