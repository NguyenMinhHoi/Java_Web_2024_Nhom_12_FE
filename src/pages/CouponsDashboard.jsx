import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSupport from "../hooks/useAxiosSupport";
import { useSelector } from "react-redux";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddVoucherForm from "../components/AddVoucherForm";

export const generateFakeCoupons = (count) => {
    const coupons = [];
    for (let i = 0; i < count; i++) {
        const startDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
        const endDate = new Date(startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);

        coupons.push({
            id: i + 1,
            code: `COUPON${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
            discount: Math.floor(Math.random() * 50) + 5, // 5% to 55% discount
            validFrom: startDate.toISOString(),
            validTo: endDate.toISOString(),
            description: `Giảm giá ${Math.floor(Math.random() * 50) + 5}% cho đơn hàng`,
            minPurchase: Math.floor(Math.random() * 1000000) + 100000, // 100,000 to 1,100,000 VND
            maxDiscount: Math.floor(Math.random() * 500000) + 50000, // 50,000 to 550,000 VND
            usageLimit: Math.floor(Math.random() * 100) + 1,
            usageCount: Math.floor(Math.random() * 50),
            isActive: Math.random() > 0.2, // 80% chance of being active
        });
    }
    return coupons;
};
export default function CouponsDashboard() {
    const axiosSupport = useAxiosSupport();
    const merchantId = useSelector(state => state.merchant.id || {});
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetchCoupons();
    }, [axiosSupport, merchantId]);

    const fetchCoupons = async () => {
        try {
            const res = generateFakeCoupons(10);
            setCoupons(res);
            setTotalPages(Math.ceil(res.length / itemsPerPage));
        } catch (error) {
            console.error("Error fetching coupons:", error);
            toast.error("Failed to load coupons");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEditCoupon = (coupon) => {
        // Implement edit functionality
        console.log("Editing coupon:", coupon);
    };

    const handleDeleteCoupon = (couponId) => {
        // Implement delete functionality
        console.log("Deleting coupon with ID:", couponId);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCoupons = coupons.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-md">
            <div className="flex-1 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý Coupon</h1>

                <div className="mb-4 lg:mb-6 flex justify-center items-center p-1">
                    <div className="relative flex items-center w-4/5">
                        <input
                            type="text"
                            placeholder="Tìm kiếm coupon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-4 text-gray-700 placeholder-gray-500"
                        />
                        <FiSearch size={20}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"/>
                    </div>
                    <button onClick={() => setIsModalOpen(true)}
                            className="flex justify-center items-start bg-white py-3 px-3 rounded-md text-black border border-gray-300 ml-4 w-1/5">
                        <FiPlus/>
                    </button>
                </div>

                <div className="bg-white rounded-md shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid From</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentCoupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{coupon.discount}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(coupon.validFrom).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(coupon.validTo).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEditCoupon(coupon)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <FiEdit />
                                        </button>
                                        <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-600 hover:text-red-900">
                                            <FiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-600 space-y-2 sm:space-y-0">
                    <span className="text-sm">Trang {currentPage} trên {totalPages}</span>
                    <div className="flex items-center space-x-2 text-sm">
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen}>
                    <AddVoucherForm
                        setIsModalOpen={setIsModalOpen}
                        merchantId={merchantId}
                        onCouponAdded={fetchCoupons}
                    />
                </Modal>

                <ToastContainer/>
            </div>
        </div>
    );
}

