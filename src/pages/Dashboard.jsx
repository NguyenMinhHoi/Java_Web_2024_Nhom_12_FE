import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ProductsDashBoard from './ProductsDashBoard';
import DashboardHome from '../components/DashboardHome'
import ProductDetailAdmin from "../components/ProductDetailAdmin";
import OrderDashboard from "./OrderDashboard";
import OrderDetail from "./OrderDetail";
import UserOrderList from "../components/UserProfile";

export default function Dashboard() {
    const currentUser = {
        name: 'Admin Name',
        email: 'admin@example.com'
    };

    const handleLogout = () => {
        // Xử lý đăng xuất ở đây
        console.log('Đăng xuất');
    };

    return (
        <Routes>
            <Route element={<DashboardLayout currentUser={currentUser} onLogout={handleLogout} />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<DashboardHome />} />
                <Route path="product" element={<ProductsDashBoard />} />
                <Route path="order" element={<OrderDashboard />} />
                <Route path="/merchant/products/details" element={<ProductDetailAdmin/>} />
                <Route path="/merchant/order/:id" element={<OrderDetail/>} />
                <Route path="/merchant/profile" element={<UserOrderList />}/>
            </Route>
        </Routes>
    );
}
