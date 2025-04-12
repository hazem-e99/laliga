import React from 'react';

const AppSlider = () => {
    return (
        <>
            <div className="carousel w-full ">
                <div id="slide1" className="carousel-item relative w-full h-80">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/630f9449e9d3ae151b3599d3/1662513818701-GQABAAV7SUNE1000GRI6/mens-capsule-wardrobe.jpg"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full h-80">
                    <img
                        src="https://i.etsystatic.com/26262462/r/il/9e44c7/4461937773/il_fullxfull.4461937773_le31.jpg"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full h-80">
                    <img
                        src="https://modo3.com/thumbs/fit630x300/240204/1561923697/%D9%83%D9%8A%D9%81%D9%8A%D8%A9_%D8%A7%D9%84%D8%AA%D8%AE%D9%84%D8%B5_%D9%85%D9%86_%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AF_%D8%AA%D8%AD%D8%AA_%D8%A7%D9%84%D8%A5%D8%A8%D8%B7.jpg"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full h-80">
                    <img
                        src="https://www.fashiongonerogue.com/wp-content/uploads/2024/06/Different-Accessories.jpg"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppSlider;
// import React from 'react';

// const AppSlider = () => {
//     return (
//         <div className="grid md:grid-cols-3 gap-2 h-[600px] px-4 py-4">
//             {/* الصورة الرئيسية على اليسار */}
//             <div className="col-span-2 relative">
//                 <img
//                     src="https://images.squarespace-cdn.com/content/v1/630f9449e9d3ae151b3599d3/1662513818701-GQABAAV7SUNE1000GRI6/mens-capsule-wardrobe.jpg"
//                     alt="Main Shopping Visual"
//                     className="w-full h-full object-cover rounded-xl"
//                 />
//                 <div className="absolute top-6 left-6 bg-white/70 p-4 rounded-lg max-w-md">
//                     <h2 className="text-white font-bold text-xl drop-shadow-md">
//                         FreshCart brings the supermarket to you, redefining the way you shop for groceries.
//                     </h2>
//                     <button className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-cyan-600 transition">
//                         Get Started
//                     </button>
//                 </div>
//             </div>

//             {/* عمود الصور الجانبي */}
//             <div className="flex flex-col gap-2">
//                 <img
//                     src="https://www.fashiongonerogue.com/wp-content/uploads/2024/06/Different-Accessories.jpg"
//                     alt="Cosmetics"
//                     className="w-full h-1/2 object-cover rounded-xl"
//                 />
//                 <img
//                     src="https://i.etsystatic.com/26262462/r/il/9e44c7/4461937773/il_fullxfull.4461937773_le31.jpg"
//                     alt="Black Friday"
//                     className="w-full h-1/2 object-cover rounded-xl"
//                 />
//             </div>
//         </div>
//     );
// };

// export default AppSlider;
