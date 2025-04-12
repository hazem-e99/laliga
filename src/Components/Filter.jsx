const Filter = ({ onCategoryClick }) => {
    const categories = [
        { name: 'Sneakers', img: './img/sneakers.jpg' },
        { name: 'Shorts', img: './img/shorts.jpg' },
        { name: 'Tshirts', img: './img/Tshirt.jpg' },
        { name: 'Pants', img: './img/pants.jpg' },
        { name: 'Accessories', img: './img/accessories.jpg' }
    ];

    return (
        <>
            <div className='pt-5 text-center'>
                <h1 className='text-3xl font-bold'>Shop By Category</h1>
            </div>
            <div className='grid grid-cols-6'>
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className='text-center cursor-pointer'
                        onClick={() => onCategoryClick(category.name)}
                    >
                        <div className="avatar pt-8">
                            <div className="w-24 rounded-full">
                                <img src={category.img} alt={category.name} />
                            </div>
                        </div>
                        <div className='font-semibold'>
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}


export default Filter;