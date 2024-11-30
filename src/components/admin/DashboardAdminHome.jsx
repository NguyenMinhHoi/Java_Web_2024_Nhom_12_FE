import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AccountManagement from './AccountManagement';
import ApprovalManagement from './ApprovalManagement';
import RevenueAnalytics from './RevenueAnalytics';
import {useNavigate} from "react-router-dom";
import VoucherAdminDashboard from "./VoucherAdminDashboard";

export default function DashboardAdminHome() {
    const [activeTab, setActiveTab] = useState('accounts');
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    {activeTab === 'accounts' && <AccountManagement />}
                    {activeTab === 'approvals' && <ApprovalManagement />}
                    {activeTab === 'revenue' && <RevenueAnalytics />}
                    {activeTab === 'vouchers' && <VoucherAdminDashboard/>}
                    {activeTab === 'logout' && navigate('/login')}
                </div>
            </main>
        </div>
    );
}