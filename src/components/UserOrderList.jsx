import React, { useState } from 'react';
import { FiCalendar, FiDollarSign, FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const UserOrderList = ({ orders, handleOrderSelect }) => {
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <FiClock className="text-yellow-500" />;
      case 'DOING': return <FiPackage className="text-blue-500" />;
      case 'SHIPPING': return <FiTruck className="text-purple-500" />;
      case 'DONE': return <FiCheckCircle className="text-green-500" />;
      case 'CANCEL': return <FiXCircle className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'DOING': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'SHIPPING': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'DONE': return 'bg-green-100 text-green-800 border-green-300';
      case 'CANCEL': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const statuses = ['PENDING', 'DOING', 'SHIPPING', 'DONE', 'CANCEL'];

  return (
    <div className="md:space-y-8">
      <div className="md:mb-6">
        {/* Desktop view */}
        <div className="hidden md:flex space-x-4">
          {statuses.map(status => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center ${
                selectedStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {getStatusIcon(status)}
              <span className="ml-2">{status}</span>
            </button>
          ))}
        </div>

        {/* Mobile view */}
        <select
          className="md:hidden w-full px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 md:p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {getStatusIcon(selectedStatus)}
          <span className="ml-2">{selectedStatus} Orders</span>
        </h2>
        <div className="space-y-4">
          {Array.from(orders)
            .filter(order => order?.status === selectedStatus)
            .map((order) => (
              <div
                key={order?.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-solid"
                onClick={() => handleOrderSelect(order)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Order #{order?.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)} border`}>
                    {getStatusIcon(order?.status)}
                    <span className="ml-1">{order?.status}</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="mr-2" />
                    <span>{new Date(order?.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiDollarSign className="mr-2" />
                    <span>{order?.totalAmount.toLocaleString()} VND</span>
                  </div>
                </div>
                {order?.products && order?.products.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4">
                    {order.products.slice(0, 3).map((product, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                        <img
                          src={product.image || 'https://via.placeholder.com/50'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                        <span className="text-sm font-medium text-gray-600">+{order.products.length - 3}</span>
                      </div>
                    )}
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