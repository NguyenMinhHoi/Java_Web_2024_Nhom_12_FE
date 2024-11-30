import React from 'react';
import {FiUsers, FiCheckSquare, FiBarChart2, FiTag} from 'react-icons/fi';
import {LogOut} from "lucide-react";

export default function AdminNavbar({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'accounts', name: 'Tài khoản', icon: FiUsers },
        { id: 'approvals', name: 'Phê duyệt', icon: FiCheckSquare },
        { id: 'revenue', name: 'Doanh thu', icon: FiBarChart2 },
        { id: 'vouchers', name: 'Mã giảm giá', icon: FiTag },
        { id: 'logout', name: "Đăng xuất", icon: LogOut },
    ];

    return (
        <nav className="bg-gray-800 w-64 min-h-screen px-4 py-6">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-white text-2xl font-semibold">HTQ eCommerce Admin Dashboard</h1>
            </div>
            <ul>
                {navItems.map((item) => (
                    <li key={item.id} className="mb-4">
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center w-full px-4 py-2 rounded transition-colors duration-200 ${
                                activeTab === item.id
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            <item.icon className="mr-3" />
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}