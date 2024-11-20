import React, {useEffect, useState} from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiShoppingBag, FiInfo } from 'react-icons/fi';
import OrderList from "./UserOrderList";
import UserOrderList from "./UserOrderList";
import {useSelector} from "react-redux";
import useAxiosSupport from "../hooks/useAxiosSupport";
import default_image from '../assets/images/default-image.svg';


const UserProfile = () => {
    const id = useSelector(state => state.user.id);
    const [user, setUser] = useState({
        name: 'Trần Thị Bích Ngọc',
        email: 'bichngoc.tran@gmail.com',
        phone: '0912 345 678',
        address: '123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        birthdate: '15/08/1992',
        avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg'
    });
    const axiosSupport = useAxiosSupport();
    const fetchUser = async () =>{
       const res= await axiosSupport.getUserDetail(id);
       setUser(res)
    }

    useEffect(() => {
        fetchUser()
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-4">
                        <ProfileField icon={<FiUser />} label="Họ tên" value={user.name} isEditing={isEditing} />
                        <ProfileField icon={<FiMail />} label="Email" value={user.email} isEditing={isEditing} />
                        <ProfileField icon={<FiPhone />} label="Số điện thoại" value={user.phone} isEditing={isEditing} />
                        <ProfileField icon={<FiMapPin />} label="Địa chỉ" value={user.address} isEditing={isEditing} />
                        <ProfileField icon={<FiCalendar />} label="Ngày sinh" value={user.birthdate} isEditing={isEditing} />
                    </div>
                );
            case 'orders':
                return <UserOrderList />;
            case 'personal':
                return <p>Thông tin cá nhân khác sẽ được hiển thị ở đây.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <img src={user?.avatar?.path || default_image} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-center mb-6">{user.name}</h2>
                </div>
                <nav className="mt-6">
                    <NavItem icon={<FiUser />} label="Hồ sơ" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                    <NavItem icon={<FiShoppingBag />} label="Đơn hàng" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <NavItem icon={<FiInfo />} label="Thông tin cá nhân" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{activeTab === 'profile' ? 'Hồ sơ người dùng' : activeTab === 'orders' ? 'Đơn hàng' : 'Thông tin cá nhân'}</h2>
                            {activeTab === 'profile' && !isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
                                >
                                    <FiEdit2 className="inline mr-2" />
                                    Chỉnh sửa
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="p-6">
                        {renderContent()}

                        {isEditing && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileField = ({ icon, label, value, isEditing }) => (
    <div className="flex items-center">
        <div className="text-blue-500 mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-600">{label}</p>
            {isEditing ? (
                <input
                    type="text"
                    defaultValue={value}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
            ) : (
                <p className="font-medium">{value}</p>
            )}
        </div>
    </div>
);

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        className={`flex items-center w-full px-6 py-3 text-left ${
            active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={onClick}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

export default UserProfile;