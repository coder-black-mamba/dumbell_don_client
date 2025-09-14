import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSync, FaMoneyBillWave, FaReceipt, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Mock data
const mockPayments = {
  count: 2,
  results: [
    {
      id: 1,
      invoice: 1,
      member: {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      amount_cents: 3000,
      currency: 'USD',
      status: 'PAID',
      reference: '330fb893-6856-4e33-b8a4-0367b52256de',
      metadata: {
        invoice: 'INV-20250813151857',
        payment_type: 'subscription',
        subscription: 'Monthly Membership Platinum',
        subscription_id: 1
      },
      paid_at: '2025-08-13T15:21:37.390103Z',
      created_at: '2025-08-13T15:21:37.595482Z'
    },
    {
      id: 2,
      invoice: 2,
      member: {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      amount_cents: 1500,
      currency: 'USD',
      status: 'PAID',
      reference: '21889840-abf5-4462-8c18-2c594b1dcd70',
      metadata: {
        booking: 'Morning Vinyasa Yoga',
        invoice: 'INV-20250813152229',
        booking_id: 1,
        payment_type: 'booking'
      },
      paid_at: '2025-08-13T15:23:46.496632Z',
      created_at: '2025-08-13T15:23:46.934969Z'
    }
  ]
};

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load payments
  useEffect(() => {
    const timer = setTimeout(() => {
      setPayments(mockPayments.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.metadata?.invoice || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle CRUD operations
  const handleView = (payment) => {
    setSelectedPayment(payment);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (payment) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      setPayments(payments.filter(p => p.id !== payment.id));
    }
  };

  const handleSave = (updatedPayment) => {
    if (isEditMode) {
      setPayments(payments.map(p => 
        p.id === updatedPayment.id ? { ...p, ...updatedPayment } : p
      ));
    } else {
      const newPayment = {
        ...updatedPayment,
        id: Math.max(0, ...payments.map(p => p.id)) + 1,
        created_at: new Date().toISOString(),
        reference: `ref-${Math.random().toString(36).substr(2, 9)}`
      };
      setPayments([newPayment, ...payments]);
    }
    setIsModalOpen(false);
  };

  // Calculate totals
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount_cents, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Payment Management</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => {
              setSelectedPayment(null);
              setIsEditMode(true);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Payment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaMoneyBillWave className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-800">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaReceipt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Payments</p>
              <p className="text-2xl font-semibold text-gray-800">
                {filteredPayments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.metadata?.invoice || `#${payment.id}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={payment.member.avatar} alt={payment.member.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.member.name}</div>
                          <div className="text-sm text-gray-500">{payment.member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {payment.metadata?.payment_type || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.metadata?.subscription || payment.metadata?.booking || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount_cents, payment.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === 'PAID' ? 'bg-green-100 text-green-800' :
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(payment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(payment)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(payment)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No payments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <PaymentModal 
          payment={selectedPayment}
          isEditMode={isEditMode}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPayment(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ payment, isEditMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    amount_cents: payment?.amount_cents || 0,
    currency: payment?.currency || 'USD',
    status: payment?.status || 'PAID',
    metadata: {
      payment_type: payment?.metadata?.payment_type || 'subscription',
      subscription: payment?.metadata?.subscription || '',
      booking: payment?.metadata?.booking || '',
      notes: payment?.metadata?.notes || '',
      ...payment?.metadata
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        metadata: { ...formData.metadata, [name]: value }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount_cents: Number(formData.amount_cents) * 100 // Convert to cents
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditMode ? (payment ? 'Edit Payment' : 'Add New Payment') : 'Payment Details'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="amount_cents"
                  value={formData.amount_cents / 100}
                  onChange={(e) => setFormData({
                    ...formData,
                    amount_cents: Number(e.target.value) * 100
                  })}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  disabled={!isEditMode}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    disabled={!isEditMode}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={!isEditMode}
              >
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="REFUNDED">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
              <select
                name="payment_type"
                value={formData.metadata.payment_type}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={!isEditMode}
              >
                <option value="subscription">Subscription</option>
                <option value="booking">Class Booking</option>
                <option value="product">Product</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.metadata.payment_type === 'subscription' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
                <input
                  type="text"
                  name="subscription"
                  value={formData.metadata.subscription || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={!isEditMode}
                />
              </div>
            )}

            {formData.metadata.payment_type === 'booking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking</label>
                <input
                  type="text"
                  name="booking"
                  value={formData.metadata.booking || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={!isEditMode}
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.metadata.notes || ''}
                onChange={handleChange}
                rows="3"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                disabled={!isEditMode}
              />
            </div>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            {isEditMode ? (
              <>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                >
                  Save Payment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPayments;