import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import useAxiosSupport from "../hooks/useAxiosSupport";
import UserOrderList from "../components/UserOrderList";
import OrderUserDetail from "../components/OrderUserDetail";

const UserOrderPage = () => {
    const id = useSelector(state => state.user.id);
    const axiosSupport = useAxiosSupport();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getUserOrders = async () => {
        try {
            const res = await axiosSupport.getOrdersByUserId(id);
            setOrders(res.map(order => ({
                id: order.orderCode,
                status: order.status,
                orderDate: new Date(order.orderDate).toISOString(),
                totalAmount: order.total,
                products: order.variants.map(variant => ({
                    name: variant.product.name,
                    image: variant.image.path,
                    quantity: variant.quantity
                }))
            })));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        getUserOrders();
    }, []);

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    }

    const handleBackToList = () => {
        setSelectedOrder(null);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>
            {selectedOrder ? (
                <OrderUserDetail
                    order={selectedOrder}
                    onBackClick={handleBackToList}
                />
            ) : (
                <UserOrderList
                    orders={orders}
                    handleOrderSelect={handleOrderSelect}
                />
            )}
        </div>
    );
};

export default UserOrderPage;