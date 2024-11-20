import React, {useState, useEffect, useMemo} from 'react';
import {FiSearch, FiFilter, FiRefreshCw, FiChevronLeft, FiChevronRight, FiCheck} from 'react-icons/fi';
import useAxiosSupport from '../hooks/useAxiosSupport';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setOrderPage} from "../redux/reducers/commonReducer";
import Modal from "../components/Modal";
import QuickApprovalInput from "../components/QuickApprovalInput";
const OrderDashboard = () => {
    const state = useSelector(state => state);
    console.log(state)
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1 );
    const [ordersPerPage] = useState(10);
    const axiosSupport = useAxiosSupport();
    const merchant = useSelector(state => state.merchant);
    const [maxPage, setMaxPage] = useState(1);
    const navigate = useNavigate();

    const [hasMore, setHasMore] = useState(true);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderCodes, setOrderCodes] = useState([]);

    const [searchCode, setSearchCode] = useState('');
    const [searchedCodes, setSearchedCodes] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCode && !searchedCodes.includes(searchCode)) {
            setSearchedCodes([...searchedCodes, searchCode]);
            setSearchCode('');
        }
    };

    const removeSearchedCode = (code) => {
        setSearchedCodes(searchedCodes.filter(c => c !== code));
    };



    const handleQuickApprove = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderCodes([]);
    };

    const submitQuickApprove = () => {
        const codes = orderCodes.split(',').map(code => code.trim());
        console.log("Order codes to approve:", codes);
        closeModal();
    };

    useEffect(() => {
            fetchOrders(currentPage);
    }, []);

    const fetchOrders = async (pageNumber) => {
        try {
            const response = await axiosSupport.getOrdersByShopId(merchant.id, pageNumber-1, ordersPerPage);
            const transformedOrders = response.map(order => ({
                id: parseInt(order.id),
                customerName: order.name || "Khách vãng lai",
                orderDate: order.orderDate,
                totalAmount: parseFloat(order.total),
                status: order.status
            }));

            setOrders(prevOrders => {
                const uniqueOrders = [...prevOrders, ...transformedOrders].reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                return uniqueOrders;
            });
            setMaxPage(Math.ceil(orders.length / ordersPerPage))

            if (transformedOrders.length < ordersPerPage) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setHasMore(false);
        }
    };

    const refreshOrders = () => {
        fetchOrders(currentPage);
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order =>
            (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toString().includes(searchTerm)) &&
            (statusFilter === 'ALL' || order.status === statusFilter)
        );
    }, [orders, searchTerm, statusFilter]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = useMemo(() => {
        return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    }, [currentPage, ordersPerPage, filteredOrders]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (pageNumber > maxPage) {
            setMaxPage(pageNumber);
            fetchOrders(pageNumber);
        }
    }

    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Quản lý đơn hàng</h1>
                    <p className="text-blue-100">Theo dõi và quản lý các đơn hàng của bạn</p>
                </div>

                <div className="p-6">
                    <div className="flex flex-col space-y-4 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="w-full sm:w-auto relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm đơn hàng..."
                                    className="border p-2 pl-10 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-center sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-4">
                                <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
                                    <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                    <select
                                        className="border p-2 pl-10 rounded-full w-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="ALL">Tất cả trạng thái</option>
                                        <option value="PENDING">Chờ xử lý</option>
                                        <option value="PROCESSING">Đang xử lý</option>
                                        <option value="SHIPPED">Đã gửi hàng</option>
                                        <option value="DELIVERED">Đã giao hàng</option>
                                        <option value="CANCELLED">Đã hủy</option>
                                    </select>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={refreshOrders}
                                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <FiRefreshCw className="w-5 h-5"/>
                                    </button>
                                    <button
                                        onClick={handleQuickApprove}
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                                    >
                                        <FiCheck className="w-5 h-5 mr-2"/>
                                        <span className="hidden sm:inline">Phê duyệt nhanh</span>
                                        <span className="sm:hidden">Duyệt nhanh</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Ngày đặt</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Tổng tiền</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer"
                                    onClick={() => navigate(`/dashboard/merchant/order/${order.id}`)}
                                >
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:text-blue-600">#{order.id}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hover:text-gray-900">{order?.customerName || ""}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell hover:text-gray-900">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell hover:text-gray-900">
                                        {order.totalAmount.toLocaleString()} VND
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                                'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                            } transition-colors duration-200 ease-in-out`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Trang trước
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Trang sau
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> tới <span
                                    className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> trên {' '}
                                    <span className="font-medium">{filteredOrders.length}</span> kết quả
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                     aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <FiChevronLeft className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                    {(() => {
                                        const pageNumbers = [];
                                        const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

                                        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                                            pageNumbers.push(
                                                <button
                                                    key={i}
                                                    onClick={() => paginate(i)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        currentPage === i
                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {i}
                                                </button>
                                            );
                                        }

                                        return pageNumbers;
                                    })()}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <FiChevronRight className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">Phê duyệt nhanh đơn hàng</h2>
                <QuickApprovalInput orderCodes={orderCodes} setOrderCodes={setOrderCodes} />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={submitQuickApprove}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        Phê duyệt
                    </button>
                    <button
                        onClick={closeModal}
                        className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                    >
                        Hủy
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderDashboard;