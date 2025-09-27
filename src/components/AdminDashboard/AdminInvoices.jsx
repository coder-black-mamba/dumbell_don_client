import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { authApiClient } from "../../services/apiServices";
import {FaPlus ,FaSearch} from 'react-icons/fa';
import Loader from '../common/Loader';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', or 'view'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [filteredInvoices, setFilteredInvoices] = useState([]);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await authApiClient.get("invoices/");
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, invoice = null) => {
    setModalType(type);
    setSelectedInvoice(invoice);
    
    if (type === 'edit' || type === 'view') {
      const metadata = invoice.metadata || {};
      reset({
        member: invoice.member,
        issue_date: invoice.issue_date,
        due_date: invoice.due_date,
        total_cents: invoice.total_cents / 100,
        currency: invoice.currency,
        status: invoice.status,
        notes: invoice.notes || '',
        payment_type: metadata.payment_type || '',
        reference_id: metadata.booking_id || metadata.subscription_id || '',
        metadata: JSON.stringify(metadata, null, 2)
      });
    } else {
      reset({
        member: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total_cents: '',
        currency: 'USD',
        status: 'DRAFT',
        notes: '',
        payment_type: '',
        reference_id: '',
        metadata: JSON.stringify({}, null, 2)
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
      // Create metadata object from form data
      const metadata = data.metadata ? JSON.parse(data.metadata) : {};
      
      // Add payment type and reference ID to metadata
      if (data.payment_type && data.reference_id) {
        metadata.payment_type = data.payment_type;
        metadata[`${data.payment_type}_id`] = data.reference_id;
      }

      const invoiceData = {
        ...data,
        total_cents: Math.round(parseFloat(data.total_cents) * 100),
        metadata: metadata
      };
      
      // Remove form-specific fields before sending to API
      delete invoiceData.payment_type;
      delete invoiceData.reference_id;

      if (modalType === 'create') {
        toast.loading("Creating Invoice...");
        await authApiClient.post('invoices/', invoiceData);
        toast.success('Invoice created successfully');
      } else if (modalType === 'edit') {
        toast.loading("Updating Invoice...");
        await authApiClient.put(`invoices/${selectedInvoice.id}/`, invoiceData);
        toast.success('Invoice updated successfully');
      }

      fetchInvoices();
      closeModal();
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error(`Failed to ${modalType} invoice`);
    } finally {
      toast.dismiss();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await authApiClient.delete(`invoices/${id}/`);
        toast.success('Invoice deleted successfully');
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
        toast.error('Failed to delete invoice');
      } finally {
        toast.dismiss();
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
      case 'DRAFT':
        return <span className={`${baseClasses} badge-info`}>DRAFT</span>;
      case 'CANCELLED':
        return <span className={`${baseClasses} badge-error`}>CANCELLED</span>;
      default:
        return <span className={`${baseClasses} badge-ghost`}>{status}</span>;
    }
  };

  const invoiceStatuses = ['DRAFT', 'PENDING', 'PAID', 'CANCELLED'];
  const currencies = ['USD', 'EUR', 'GBP', 'BDT'];

  if (loading && invoices.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => openModal('create')}
        >
          Create New Invoice
        </button>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Member</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover">
                <td>{invoice.number}</td>
                <td>{invoice.member}</td>
                <td>{formatDate(invoice.issue_date)}</td>
                <td>{formatDate(invoice.due_date)}</td>
                <td>{formatAmount(invoice.total_cents)} {invoice.currency}</td>
                <td>{getStatusBadge(invoice.status)}</td>
                <td>
                  <div>
                    {invoice.metadata?.payment_type || 'N/A'}
                    {invoice.metadata?.subscription && (
                      <div className="text-xs opacity-75">{invoice.metadata.subscription}</div>
                    )}
                    {invoice.metadata?.booking && (
                      <div className="text-xs opacity-75">Booking</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => openModal('view', invoice)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => openModal('edit', invoice)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => handleDelete(invoice.id)}
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
            {modalType === 'create' && 'Create New Invoice'}
            {modalType === 'edit' && 'Edit Invoice'}
            {modalType === 'view' && 'Invoice Details'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <span className="label-text">Issue Date</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.issue_date ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('issue_date', { required: 'Issue date is required' })}
                />
                {errors.issue_date && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.issue_date.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Due Date</span>
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${errors.due_date ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('due_date', { required: 'Due date is required' })}
                />
                {errors.due_date && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.due_date.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.total_cents ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('total_cents', { 
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' }
                  })}
                />
                {errors.total_cents && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.total_cents.message}</span>
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
                  {invoiceStatuses.map((status) => (
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
                  <span className="label-text">Payment Type</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.payment_type ? 'select-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('payment_type', { required: 'Payment type is required' })}
                >
                  <option value="">Select payment type</option>
                  <option value="booking">Booking</option>
                  <option value="subscription">Subscription</option>
                </select>
                {errors.payment_type && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.payment_type.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reference ID</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.reference_id ? 'input-error' : ''}`}
                  disabled={modalType === 'view'}
                  placeholder="Booking ID or Subscription ID"
                  {...register('reference_id', { required: 'Reference ID is required' })}
                />
                {errors.reference_id && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.reference_id.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  className={`textarea textarea-bordered h-24 ${errors.notes ? 'textarea-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('notes')}
                  placeholder="Additional notes about this invoice"
                ></textarea>
                {errors.notes && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.notes.message}</span>
                  </label>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Metadata</span>
                </label>
                <textarea
                  className={`textarea textarea-bordered h-32 font-mono text-xs ${errors.metadata ? 'textarea-error' : ''}`}
                  disabled={modalType === 'view'}
                  {...register('metadata', {
                    validate: (value) => {
                      try {
                        if (value) JSON.parse(value);
                        return true;
                      } catch (e) {
                        return 'Invalid JSON';
                      }
                    }
                  })}
                  placeholder='Enter metadata as JSON (e.g., {"payment_type": "subscription", "subscription_id": 1})'
                ></textarea>
                {errors.metadata && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.metadata.message}</span>
                  </label>
                )}
              </div>
            </div>

            {modalType === 'view' && selectedInvoice && (
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <h4 className="font-bold mb-2">Invoice Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Created At:</span> {formatDate(selectedInvoice.created_at)}
                  </div>
                  <div>
                    <span className="font-semibold">Invoice #:</span> {selectedInvoice.number}
                  </div>
                  <div>
                    <span className="font-semibold">Payment Type:</span> {selectedInvoice.metadata?.payment_type || 'N/A'}
                  </div>
                  {selectedInvoice.metadata?.subscription && (
                    <div>
                      <span className="font-semibold">Subscription:</span> {selectedInvoice.metadata.subscription}
                    </div>
                  )}
                  {selectedInvoice.metadata?.booking && (
                    <div className="md:col-span-2">
                      <span className="font-semibold">Booking:</span> {selectedInvoice.metadata.booking}
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

export default AdminInvoices;