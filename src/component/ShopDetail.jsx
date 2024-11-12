import React, { useState, useEffect } from 'react';
import {FiStar, FiShoppingBag, FiMail, FiPhone, FiClock, FiMapPin} from 'react-icons/fi';
import AxiosSupport from '../services/axiosSupport';
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
const fakeShopData = {
    id: 1,
    name: "Cửa hàng điện tử ABC",
    rating: 4.5,
    reviewCount: 120,
    description: "Cửa hàng chuyên cung cấp các sản phẩm điện tử chất lượng cao với giá cả hợp lý.",
    images: [
        "https://example.com/shop-image1.jpg",
        "https://example.com/shop-image2.jpg",
        "https://example.com/shop-image3.jpg",
    ]
};

const fakeProducts = [
    { id: 1, name: "Điện thoại XYZ", price: 5000000, image: "https://example.com/phone.jpg" },
    { id: 2, name: "Laptop ABC", price: 15000000, image: "https://example.com/laptop.jpg" },
    { id: 3, name: "Tai nghe không dây", price: 2000000, image: "https://example.com/headphones.jpg" },
    { id: 4, name: "Máy ảnh DSLR", price: 20000000, image: "https://example.com/camera.jpg" },
    { id: 5, name: "Loa Bluetooth", price: 1500000, image: "https://example.com/speaker.jpg" },
];

const fakeReviews = [
    { id: 1, userName: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm rất tốt, giao hàng nhanh!" },
    { id: 2, userName: "Trần Thị B", rating: 4, comment: "Chất lượng sản phẩm tốt, giá cả hợp lý." },
    { id: 3, userName: "Lê Văn C", rating: 3, comment: "Sản phẩm tạm ổn, có thể cải thiện dịch vụ khách hàng." },
];

const ShopDetails = ({ shopId }) => {
    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activeTab, setActiveTab] = useState('products');
    const axiosInstance = new AxiosSupport();

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                // Simulating API calls with setTimeout
                setTimeout(() => {
                    setShop(fakeShopData);
                    setProducts(fakeProducts);
                    setReviews(fakeReviews);
                }, 1000);
            } catch (error) {
                console.error('Error fetching shop details:', error);
            }
        };

        fetchShopDetails();
    }, [shopId]);

    if (!shop) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <HomeHeader/>
            <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                        <img src={shop.coverImage} alt="Shop cover" className="w-full h-full object-cover"/>
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                            <h1 className="text-4xl font-bold text-white mb-2">{shop.name}</h1>
                            <div className="flex items-center text-white">
                                <FiStar className="text-yellow-400 mr-1"/>
                                <span>{shop.rating.toFixed(1)} ({shop.reviewCount} đánh giá)</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-700 mb-4">{shop.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <FiMail className="text-blue-500 mr-2"/>
                                <span>{shop.email}</span>
                            </div>
                            <div className="flex items-center">
                                <FiPhone className="text-blue-500 mr-2"/>
                                <span>{shop.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <FiMapPin className="text-blue-500 mr-2"/>
                                <span>{shop.address}</span>
                            </div>
                            <div className="flex items-center">
                                <FiClock className="text-blue-500 mr-2"/>
                                <span>{shop.openingHours}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'products' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('products')}
                            >
                                Sản phẩm
                            </button>
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Đánh giá
                            </button>
                        </nav>
                    </div>

                    {activeTab === 'products' && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id}
                                         className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                                        <img src={product.image} alt={product.name}
                                             className="w-full h-48 object-cover"/>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                            <p className="text-blue-600 font-bold">{product.price.toLocaleString('vi-VN')} đ</p>
                                            <button
                                                className="mt-3 flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                                                <FiShoppingBag className="mr-2"/>
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="p-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="mb-6 pb-6 border-b last:border-b-0">
                                    <div className="flex items-center mb-2">
                                        <img src={review.userAvatar} alt={review.userName}
                                             className="w-10 h-10 rounded-full mr-3"/>
                                        <div>
                                            <span className="font-semibold text-lg">{review.userName}</span>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar key={i}
                                                            className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mt-2">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <HomeFooter/>
        </>
    );
};

export default ShopDetails;
