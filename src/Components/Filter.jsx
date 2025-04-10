import React from 'react';

const Filter = () => {
    return (
        <>
            <div className='pt-5 text-center'>
                <h1 className='text-3xl font-bold'>Shop By Category</h1>
            </div>
            <div className='grid grid-cols-6'>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/sneakers.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                        Sneakers
                    </div>
                </div>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/shorts.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                        Shorts
                    </div>
                </div>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/Tshirt.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                        T-shirt
                    </div>
                </div>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/pants.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                        Pants
                    </div>
                </div>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/accessories.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                    Accessories
                    </div>
                </div>
                <div className='text-center'>
                    <div className="avatar pt-8">
                        <div className="w-24 rounded-full">
                            <img src="./img/Sale.jpg" />
                        </div>
                    </div>
                    <div className='font-semibold'>
                        Sale
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Filter;
