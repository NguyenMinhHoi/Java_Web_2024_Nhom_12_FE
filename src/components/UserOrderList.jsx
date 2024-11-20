import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { useSelector } from "react-redux";
import useAxiosSupport from "../hooks/useAxiosSupport";

const UserOrderList = () => {
  const navigate = useNavigate();
  const id = useSelector(state => state.user.id);
  const axiosSupport = useAxiosSupport();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const getUserOrder = async () => {
    try {
      const res = await axiosSupport.getOrdersByUserId(id);
      setOrders(res.map(order =>{
          return   {
            id: order.orderCode,
            status: order.status,
            orderDate: new Date(order.orderDate).toISOString(),
            totalAmount: order.total,
            products: order.variants.map(product => ({
              name: product.name,
              image: product.image.path
            }))
          }
      }))
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getUserOrder();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statuses = ['PENDING', 'DOING', 'SHIPPING', 'DONE', 'CANCEL'];


  return (
      <div className="space-y-8">
        <div className="flex space-x-4 mb-6">
          {statuses.map(status => (
              <button
                  key={status}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedStatus === status
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{selectedStatus}</h2>
          <div className="space-y-4">
            {orders
                .filter(order => order?.status === selectedStatus)
                .map((order) => (
                    <div
                        key={order?.id}
                        className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleOrderClick(order?.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Đơn hàng #{order?.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FiCalendar className="mr-2" />
                        <span>{new Date(order?.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <FiDollarSign className="mr-2" />
                        <span>{order?.totalAmount.toLocaleString()} VND</span>
                      </div>
                      {order?.products && order?.products.length > 0 && (
                          <div className="flex items-center">
                            <img
                                src={order?.products[0].image || 'https://via.placeholder.com/50'}
                                alt={order?.products[0].name}
                                className="w-12 h-12 object-cover rounded-md mr-4"
                            />
                            <div>
                              <p className="font-medium">{order?.products[0].name}</p>
                              <p className="text-sm text-gray-500">
                                {order?.products.length > 1
                                    ? `và ${order?.products.length - 1} sản phẩm khác`
                                    : '1 sản phẩm'}
                              </p>
                            </div>
                          </div>
                      )}
                    </div>
                ))}
          </div>
        </div>
      </div>
  );
};

export default UserOrderList;