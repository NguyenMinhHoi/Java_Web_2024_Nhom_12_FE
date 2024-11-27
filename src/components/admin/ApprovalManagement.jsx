import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function ApprovalManagement() {
    const [activeTab, setActiveTab] = useState('register');

    // Mock data for demonstration
    const approvals = {
        register: [
            { id: 1, name: 'New Store', type: 'Merchant Registration', date: '2023-05-01' },
            { id: 2, name: 'Shop XYZ', type: 'Merchant Registration', date: '2023-05-02' },
        ],
        update: [
            { id: 1, name: 'Acme Store', type: 'Information Update', date: '2023-05-03' },
            { id: 2, name: 'ABC Shop', type: 'Information Update', date: '2023-05-04' },
        ],
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Phê duyệt</h2>
            <div className="mb-4 flex space-x-4">
                <button
                    onClick={() => setActiveTab('register')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'register'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Đăng ký mới
                </button>
                <button
                    onClick={() => setActiveTab('update')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'update'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Cập nhật thông tin
                </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {approvals[activeTab].map((approval) => (
                            <tr key={approval.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{approval.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{approval.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{approval.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-green-600 hover:text-green-900 mr-4">
                                        <FiCheckCircle className="inline mr-1" /> Approve
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <FiXCircle className="inline mr-1" /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}