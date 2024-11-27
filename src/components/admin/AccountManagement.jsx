import React, { useState } from 'react';
import {FiUser, FiUsers, FiShoppingBag, FiToggleLeft, FiEdit, FiPlus, FiSearch} from 'react-icons/fi';
import EditAccountModal from "../EditAccountModal";

export default function AccountManagement() {
    const [activeAccountType, setActiveAccountType] = useState('user');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);

    const accountTypes = [
        { id: 'user', name: 'Tài khoản người dùng', icon: FiUser },
        { id: 'merchant', name: 'Tài khoản người bán', icon: FiShoppingBag },
        { id: 'admin', name: 'Tài khoản quản lí', icon: FiUsers },
    ];

    // Mock data for demonstration
    const [accounts, setAccounts] = useState({
        user: [
            { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: true },
        ],
        merchant: [
            { id: 1, name: 'Acme Store', email: 'acme@example.com', active: true },
            { id: 2, name: 'XYZ Shop', email: 'xyz@example.com', active: true },
        ],
        admin: [
            { id: 1, name: 'Admin User', email: 'admin@example.com', active: true },
        ],
    });

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = () => {
        if (selectedAccount) {
            setIsEditModalOpen(true);
        }
    };

    const handleSaveEdit = (editedAccount) => {
        setAccounts(prevAccounts => ({
            ...prevAccounts,
            [activeAccountType]: prevAccounts[activeAccountType].map(account =>
                account.id === editedAccount.id ? editedAccount : account
            )
        }));
        setSelectedAccount(editedAccount);
    };

    const handleDisable = () => {
        if (selectedAccount) {
            setAccounts(prevAccounts => ({
                ...prevAccounts,
                [activeAccountType]: prevAccounts[activeAccountType].map(account =>
                    account.id === selectedAccount.id ? {...account, active: !account.active} : account
                )
            }));
            setSelectedAccount(prev => ({...prev, active: !prev.active}));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Quản lý tài khoản</h2>
            <div className="mb-4 flex space-x-4">
                {accountTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setActiveAccountType(type.id)}
                        className={`flex items-center px-4 py-2 rounded ${
                            activeAccountType === type.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <type.icon className="mr-2"/>
                        {type.name}
                    </button>
                ))}
            </div>
            <div className="flex space-x-4">
                {/* Bảng tài khoản ở bên trái */}
                <div className="flex-grow">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tài khoản</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {accounts[activeAccountType]
                                    .filter(account =>
                                        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        account.email.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((account) => (
                                        <tr
                                            key={account.id}
                                            onClick={() => handleAccountClick(account)}
                                            className={`cursor-pointer ${selectedAccount?.id === account.id ? 'bg-blue-100' : ''}`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${account.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {account.active ? 'Hoạt động' : 'Vô hiệu hóa'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Toolbox ở bên phải */}
                <div className="w-64">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">Công cụ</h3>
                        <div className="space-y-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm tài khoản..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                                <FiPlus className="mr-2"/> Thêm
                            </button>
                            <button
                                className={`w-full ${selectedAccount ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'} text-white px-4 py-2 rounded-lg flex items-center justify-center`}
                                onClick={handleEdit}
                                disabled={!selectedAccount}
                            >
                                <FiEdit className="mr-2"/> Sửa
                            </button>
                            <button
                                className={`w-full ${
                                    selectedAccount
                                        ? selectedAccount.active
                                            ? 'bg-red-500 hover:bg-red-600'  
                                            : 'bg-green-500 hover:bg-green-600'  
                                        : 'bg-gray-300 cursor-not-allowed'
                                } text-white px-4 py-2 rounded-lg flex items-center justify-center`}
                                onClick={handleDisable}
                                disabled={!selectedAccount}
                            >
                                <FiToggleLeft className="mr-2"/>
                                {selectedAccount?.active ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <EditAccountModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                account={selectedAccount}
                onSave={handleSaveEdit}
            />
        </div>
    );
}