import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import useAxiosSupport from '../../hooks/useAxiosSupport';
import {AddCouponForm} from "../../pages/CouponsDashboard";
import AddVoucherForm from "../AddVoucherForm";

function VoucherAdminDashboard() {
    const axiosSupport = useAxiosSupport();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        fetchVouchers();
    }, [axiosSupport]);

    const fetchVouchers = async () => {
        try {
            // Replace this with actual API call when available
            const res = generateFakeVouchers(10);
            setVouchers(res);
            setTotalPages(Math.ceil(res.length / itemsPerPage));
        } catch (error) {
            console.error("Error fetching vouchers:", error);
            toast.error("Failed to load vouchers");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleEditVoucher = (voucher) => {
        // Implement edit functionality
        console.log("Editing voucher:", voucher);
    };

    const handleDeleteVoucher = (voucherId) => {
        // Implement delete functionality
        console.log("Deleting voucher with ID:", voucherId);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVouchers = vouchers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="p-6 bg-gray-50 min-h-screen rounded-md">
                <div className="flex-1 lg:p-6 space-y-4 lg:space-y-6 overflow-x-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quản lý Voucher</h1>
                    <div className="mb-4 lg:mb-6 flex justify-center items-center p-1">
                        <div className="relative flex items-center w-4/5">
                            <input
                                type="text"
                                placeholder="Tìm kiếm voucher..."
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã
                                    Voucher
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giảm
                                    giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày
                                    bắt đầu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày
                                    kết thúc
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô
                                    tả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mua
                                    tối thiểu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giảm
                                    tối đa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới
                                    hạn sử dụng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại
                                    voucher
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng
                                    thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điều
                                    kiện
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao
                                    tác
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentVouchers.map(voucher => (
                                <tr key={voucher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.discount}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(voucher.validFrom).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(voucher.validTo).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.minPurchase}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.maxDiscount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.usageLimit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.voucherType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.isActive ? 'Hoạt động' : 'Không hoạt động'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.conditionType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEditVoucher(voucher)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <FiEdit/>
                                        </button>
                                        <button onClick={() => handleDeleteVoucher(voucher.id)}
                                                className="text-red-600 hover:text-red-900">
                                            <FiTrash/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row justify-between items-center mt-4 text-gray-600 space-y-2 sm:space-y-0">
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
                </div>
            </div>

            <Modal isOpen={isModalOpen}>
                <AddVoucherForm
                    setIsModalOpen={setIsModalOpen}
                    onVoucherAdded={fetchVouchers}
                />
            </Modal>
        </>
    );
}

// Helper function to generate fake vouchers (remove this when using real API)
function generateFakeVouchers(count) {
    return Array.from({length: count}, (_, i) => ({
        id: i + 1,
        code: `VOUCHER${i + 1}`,
        discount: Math.floor(Math.random() * 50) + 10,
        validFrom: new Date(2023, 0, 1).toISOString(),
        validTo: new Date(2023, 11, 31).toISOString(),
        merchantName: `Merchant ${i + 1}`
    }));
}

export default VoucherAdminDashboard;