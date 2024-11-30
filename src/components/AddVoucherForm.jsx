import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAxiosSupport from '../hooks/useAxiosSupport';

const AddVoucherForm = ({ setIsModalOpen, merchantId, onVoucherAdded }) => {
    const axiosSupport = useAxiosSupport();
    const [voucherTypes, setVoucherTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [voucherTypesResponse, categoriesResponse, productsResponse] = await Promise.all([
                    axiosSupport.get('/api/voucher-types'),
                    axiosSupport.get('/api/categories'),
                    axiosSupport.get('/api/products')
                ]);
                setVoucherTypes(voucherTypesResponse.data);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu ban đầu:', error);
                toast.error('Không thể tải dữ liệu ban đầu');
            }
        };
        fetchInitialData();
    }, []);

    const formik = useFormik({
        initialValues: {
            code: '',
            discount: '',
            validFrom: '',
            validTo: '',
            description: '',
            minPurchase: '',
            maxDiscount: '',
            usageLimit: '',
            voucherType: '',
            isActive: true,
            conditionType: '',
            categoryId: '',
            productId: '',
            minPrice: '',
        },
        validationSchema: Yup.object({
            code: Yup.string().required('Bắt buộc'),
            discount: Yup.number().required('Bắt buộc').positive('Phải là số dương'),
            validFrom: Yup.date().required('Bắt buộc'),
            validTo: Yup.date().required('Bắt buộc').min(Yup.ref('validFrom'), 'Ngày kết thúc phải sau ngày bắt đầu'),
            description: Yup.string().required('Bắt buộc'),
            minPurchase: Yup.number().required('Bắt buộc').min(0, 'Không được âm'),
            maxDiscount: Yup.number().required('Bắt buộc').min(0, 'Không được âm'),
            usageLimit: Yup.number().required('Bắt buộc').positive('Phải là số dương').integer('Phải là số nguyên'),
            voucherType: Yup.string().required('Bắt buộc'),
            conditionType: Yup.string().required('Bắt buộc'),
            categoryId: Yup.number().when('conditionType', {
                is: 'CATEGORY',
                then: Yup.number().required('Bắt buộc chọn danh mục')
            }),
            productId: Yup.number().when('conditionType', {
                is: 'PRODUCT',
                then: Yup.number().required('Bắt buộc chọn sản phẩm')
            }),
            minPrice: Yup.number().when('conditionType', {
                is: 'MIN_PRICE',
                then: Yup.number().required('Bắt buộc nhập giá tối thiểu').positive('Phải là số dương')
            })
        }),
        onSubmit: async (values) => {
            try {
                await axiosSupport.post('/api/vouchers', { ...values, merchantId });
                toast.success('Thêm voucher thành công');
                onVoucherAdded();
                setIsModalOpen(false);
            } catch (error) {
                console.error('Lỗi khi thêm voucher:', error);
                toast.error('Không thể thêm voucher');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Thêm Voucher Mới</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1 sm:col-span-2 md:col-span-1">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Mã Voucher</label>
                    <input
                        id="code"
                        name="code"
                        type="text"
                        {...formik.getFieldProps('code')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.code && formik.errors.code && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.code}</div>
                    )}
                </div>

                <div className="col-span-1 sm:col-span-2 md:col-span-1">
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">Giảm giá (%)</label>
                    <input
                        id="discount"
                        name="discount"
                        type="number"
                        {...formik.getFieldProps('discount')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.discount && formik.errors.discount && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.discount}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                    <input
                        id="validFrom"
                        name="validFrom"
                        type="datetime-local"
                        {...formik.getFieldProps('validFrom')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.validFrom && formik.errors.validFrom && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.validFrom}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="validTo" className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                    <input
                        id="validTo"
                        name="validTo"
                        type="datetime-local"
                        {...formik.getFieldProps('validTo')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.validTo && formik.errors.validTo && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.validTo}</div>
                    )}
                </div>

                <div className="col-span-1 sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                        id="description"
                        name="description"
                        {...formik.getFieldProps('description')}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="minPurchase" className="block text-sm font-medium text-gray-700 mb-1">Giá trị đơn hàng tối thiểu</label>
                    <input
                        id="minPurchase"
                        name="minPurchase"
                        type="number"
                        {...formik.getFieldProps('minPurchase')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.minPurchase && formik.errors.minPurchase && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.minPurchase}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="conditionType" className="block text-sm font-medium text-gray-700 mb-1">Loại điều kiện</label>
                    <select
                        id="conditionType"
                        name="conditionType"
                        {...formik.getFieldProps('conditionType')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn loại điều kiện</option>
                        <option value="CATEGORY">Danh mục</option>
                        <option value="PRODUCT">Sản phẩm</option>
                        <option value="MIN_PRICE">Giá tối thiểu</option>
                    </select>
                    {formik.touched.conditionType && formik.errors.conditionType && (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.conditionType}</div>
                    )}
                </div>

                {formik.values.conditionType === 'CATEGORY' && (
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Chọn danh mục</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            {...formik.getFieldProps('categoryId')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {formik.touched.categoryId && formik.errors.categoryId && (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.categoryId}</div>
                        )}
                    </div>
                )}

                {/* Add similar conditional rendering for PRODUCT and MIN_PRICE */}

            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Thêm Voucher
                </button>
            </div>
        </form>
    );
};

export default AddVoucherForm;