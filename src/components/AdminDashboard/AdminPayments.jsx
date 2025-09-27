import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast ,{Toaster} from 'react-hot-toast'
import {authApiClient} from "../../services/apiServices"
import Loader from '../common/Loader'


const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', or 'view'

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await authApiClient.get("payments/")
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, payment = null) => {
    setModalType(type);
    setSelectedPayment(payment);
    
    if (type === 'edit' || type === 'view') {
      reset({
        amount_cents: payment.amount_cents / 100,
        currency: payment.currency,
        status: payment.status,
        reference: payment.reference,
        member: payment.member,
        invoice: payment.invoice,
      });
    } else {
      reset({
        amount_cents: '',
        currency: 'USD',
        status: 'PENDING',
        reference: '',
        member: '',
        invoice: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const paymentData = {
        ...data,
        amount_cents: Math.round(parseFloat(data.amount_cents) * 100),
      };

      if (modalType === 'create') {
        toast.loading("Creating Payments....")
        await authApiClient.post('payments/',paymentData)
        toast.success('Payment created successfully');
      } else if (modalType === 'edit') {
        toast.loading("Updating Payments....")
        await authApiClient.put(`payments/${selectedPayment.id}/`, paymentData);
        toast.success('Payment updated successfully');
      }

      fetchPayments();
      closeModal();
    } catch (error) {
      console.error('Error saving payment:', error);
      toast.error(`Failed to ${modalType} payment`);
    }finally{
      toast.dismiss()
    } 
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await authApiClient.delete(`payments/${id}/`);
        toast.success('Payment deleted successfully');
        fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
        toast.error('Failed to delete payment');
      }finally{
      toast.dismiss()
    } 
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const baseClasses = "badge font-bold";
    switch (status) {
      case 'PAID':
        return <span className={`${baseClasses} badge-success`}>PAID</span>;
      case 'PENDING':
        return <span className={`${baseClasses} badge-warning`}>PENDING</span>;
      case 'FAILED':
        return <span className={`${baseClasses} badge-error`}>FAILED</span>;
      default:
        return <span className={`${baseClasses} badge-info`}>{status}</span>;
    }
  };

  const paymentStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED'];
  const currencies = ['USD', 'EUR', 'GBP', 'BDT'];

  if (loading && payments.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => openModal('create')}
        >
          Add New Payment
        </button>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Member ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Type</th>
              <th>Paid At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover">
                <td>{payment.metadata?.invoice || 'N/A'}</td>
                <td>{payment.member}</td>
                <td>{formatAmount(payment.amount_cents)}</td>
                <td>{getStatusBadge(payment.status)}</td>
                <td>
                  <div>
                    {payment.metadata?.payment_type || 'N/A'}
                    {payment.metadata?.subscription && (
                      <div className="text-xs opacity-75">{payment.metadata.subscription}</div>
                    )}
                  </div>
                </td>
                <td>{payment.paid_at ? formatDate(payment.paid_at) : 'N/A'}</td>
                <td>
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => openModal('view', payment)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => openModal('edit', payment)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => handleDelete(payment.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            {modalType === 'create' && 'Create New Payment'}
            {modalType === 'edit' && 'Edit Payment'}
            {modalType === 'view' && 'Payment Details'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.amount_cents ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('amount_cents', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                  })}
                />
                {errors.amount_cents && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.amount_cents.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.currency ? 'select-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('currency', { required: 'Currency is required' })}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.currency.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('status', { required: 'Status is required' })}
                >
                  {paymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.status.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reference</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.reference ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('reference', { required: 'Reference is required' })}
                />
                {errors.reference && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.reference.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Member ID</span>
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${errors.member ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('member', { required: 'Member ID is required' })}
                />
                {errors.member && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.member.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Invoice</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.invoice ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('invoice', { required: 'Invoice is required' })}
                />
                {errors.invoice && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.invoice.message}</span>
                  </label>
                )}
              </div>
            </div>

            {modalType === 'view' && selectedPayment && (
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <h4 className="font-bold mb-2">Payment Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Created At:</span> {formatDate(selectedPayment.created_at)}
                  </div>
                  {selectedPayment.paid_at && (
                    <div>
                      <span className="font-semibold">Paid At:</span> {formatDate(selectedPayment.paid_at)}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Payment Type:</span> {selectedPayment.metadata?.payment_type || 'N/A'}
                  </div>
                  {selectedPayment.metadata?.subscription && (
                    <div>
                      <span className="font-semibold">Subscription:</span> {selectedPayment.metadata.subscription}
                    </div>
                  )}
                  {selectedPayment.metadata?.booking && (
                    <div className="md:col-span-2">
                      <span className="font-semibold">Booking:</span> {selectedPayment.metadata.booking}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={closeModal}
              >
                {modalType === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalType !== 'view' && (
                <button type="submit" className="btn btn-primary">
                  {modalType === 'create' ? 'Create' : 'Save Changes'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;