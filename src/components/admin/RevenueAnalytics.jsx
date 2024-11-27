import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RevenueAnalytics() {
    const [timePeriod, setTimePeriod] = useState('thisMonth');

    const revenueData = {
        thisMonth: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 22000],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        },
        lastMonth: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [10000, 17000, 14000, 20000],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        },
        thisYear: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [50000, 55000, 60000, 58000, 62000, 65000, 70000, 68000, 72000, 75000, 80000, 85000],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        },
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue Analytics',
            },
        },
    };

    const summaryData = {
        totalRevenue: 68000,
        orderCount: 1250,
        averageOrderValue: 54.4,
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Phân tích doanh thu</h2>

            <div className="flex justify-end mb-4">
                <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="thisMonth">Tháng này</option>
                    <option value="lastMonth">Tháng trước</option>
                    <option value="thisYear">Năm nay</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <FiDollarSign className="text-green-500 text-3xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Tổng doanh thu</p>
                            <p className="text-xl font-semibold">{summaryData.totalRevenue.toLocaleString()} đ</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <FiShoppingCart className="text-blue-500 text-3xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Số đơn hàng</p>
                            <p className="text-xl font-semibold">{summaryData.orderCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <FiTrendingUp className="text-purple-500 text-3xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Giá trị đơn hàng trung bình</p>
                            <p className="text-xl font-semibold">{summaryData.averageOrderValue.toLocaleString()} đ</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <Bar options={options} data={revenueData[timePeriod]} />
            </div>
        </div>
    );
}