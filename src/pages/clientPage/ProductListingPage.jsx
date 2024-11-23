import React, { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import {FaStar} from "react-icons/fa";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    storeAddress: '',
    priceRange: { min: 0, max: 10000000 },
    discount: false,
    category: '',
    rating: 1
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fake product data
  useEffect(() => {
    const fakeProducts = [
      { id: 1, name: 'Smartphone X1', price: 15000000, discount: 10, category: 'Electronics', storeAddress: 'Hà Nội', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Laptop Pro', price: 25000000, discount: 0, category: 'Electronics', storeAddress: 'Hồ Chí Minh', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Smartwatch Y2', price: 5000000, discount: 15, category: 'Accessories', storeAddress: 'Đà Nẵng', image: 'https://via.placeholder.com/150' },
      // Add more fake products as needed
    ];
    setProducts(fakeProducts);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
  };

  const resetFilters = () => {
    const resetFilters = () => {
      setFilters({
        storeAddress: '',
        priceRange: { min: 0, max: 10000000 },
        discount: false,
        category: '',
        rating: 1 // Reset rating to 1
      });
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mega Filter - Left Side */}
        <div className={`md:w-1/4 bg-white p-4 rounded-lg shadow ${showFilters ? 'block' : 'hidden md:block'}`}>
          <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Địa chỉ cửa hàng</label>
              <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={filters.storeAddress}
                  onChange={(e) => handleFilterChange('storeAddress', e.target.value)}
                  placeholder="Nhập địa chỉ"
              />
            </div>
            <div>
              <label className="block mb-2">Khoảng giá</label>
              <div className="flex gap-2">
                <input
                    type="number"
                    className="w-1/2 p-2 border rounded"
                    value={filters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', {...filters.priceRange, min: e.target.value})}
                    placeholder="Tối thiểu"
                />
                <input
                    type="number"
                    className="w-1/2 p-2 border rounded"
                    value={filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', {...filters.priceRange, max: e.target.value})}
                    placeholder="Tối đa"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={filters.discount}
                    onChange={(e) => handleFilterChange('discount', e.target.checked)}
                    className="mr-2"
                />
                Chỉ hiện sản phẩm giảm giá
              </label>
            </div>
            <div>
              <label className="block mb-2">Phân loại</label>
              <select
                  className="w-full p-2 border rounded"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="Electronics">Điện tử</option>
                <option value="Accessories">Phụ kiện</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            {/* New Rating Filter */}
            <div>
              <label className="block mb-2">Đánh giá tối thiểu</label>
              <div className="flex items-center">
                <span className="ml-2 flex items-center">
                  {[...Array(5)].map((_, index) => (
                      <FaStar
                          key={index}
                          className={`text-2xl ${index < (filters.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                          onClick={() => handleFilterChange('rating', index + 1)}
                      />
                  ))}
                </span>
                <span className="ml-2 text-lg">{filters.rating || 1}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                  onClick={applyFilters}
                  className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Áp dụng
              </button>
              <button
                  onClick={resetFilters}
                  className="w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </div>
        {/* Product Cards - Right Side */}
        <div className="md:w-3/4">
          <div className="mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded"
            >
              {showFilters ? <FiX className="mr-2" /> : <FiFilter className="mr-2" />}
              {showFilters ? 'Đóng bộ lọc' : 'Mở bộ lọc'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.price.toLocaleString()} VND</p>
                  {product.discount > 0 && (
                    <p className="text-red-500 mb-2">Giảm {product.discount}%</p>
                  )}
                  <p className="text-sm text-gray-500">{product.storeAddress}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;