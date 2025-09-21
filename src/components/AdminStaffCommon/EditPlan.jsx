import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { authApiClient } from '../../services/apiServices';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaSave, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import Loader from '../common/Loader';

const EditPlan = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const { state } = useLocation();
  
  if (!state?.plan) {
    // If no plan data in state, redirect back to plans list
    useEffect(() => {
      toast.error('No plan data provided');
      isAdmin ? navigate('/admin/plans') : navigate('/staff/plans');
    }, [isAdmin, navigate]);
    
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  const planData = state.plan;
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: planData.name || '',
      description: planData.description || '',
      duration_days: planData.duration_days || 30,
      price_cents: planData.price_cents || 0,
      is_active: planData.is_active ?? true
    }
  });

  const onSubmit = async (data) => {
    try {
      await authApiClient.put(`membership-plans/${id}/`, data);
      toast.success('Membership plan updated successfully');
      isAdmin ? navigate('/admin/plans') : navigate('/staff/plans');
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Failed to update membership plan');
    }
  };

  const handleBack = () => {
    isAdmin ? navigate('/admin/plans') : navigate('/staff/plans');
  };

  if (!planData && !id) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Plans
        </button>
        <h1 className="text-2xl font-bold text-gray-200">Edit Membership Plan</h1>
      </div>

      <div className="bg-base-300 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Plan Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Plan Name</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Plan name is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  placeholder="Enter plan name"
                />
              )}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
              </label>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Description</span>
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`textarea textarea-bordered h-24 w-full ${errors.description ? 'textarea-error' : ''}`}
                  placeholder="Enter plan description"
                />
              )}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.description.message}</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Duration (days)
                </span>
              </label>
              <Controller
                name="duration_days"
                control={control}
                rules={{ 
                  required: 'Duration is required',
                  min: { value: 1, message: 'Duration must be at least 1 day' }
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`input input-bordered w-full ${errors.duration_days ? 'input-error' : ''}`}
                  />
                )}
              />
              {errors.duration_days && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.duration_days.message}</span>
                </label>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaDollarSign className="mr-2" /> Price (cents)
                </span>
              </label>
              <Controller
                name="price_cents"
                control={control}
                rules={{ 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price cannot be negative' }
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="0"
                    className={`input input-bordered w-full ${errors.price_cents ? 'input-error' : ''}`}
                  />
                )}
              />
              {errors.price_cents && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.price_cents.message}</span>
                </label>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="form-control">
            <label className="cursor-pointer label justify-start">
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="toggle toggle-primary mr-2"
                  />
                )}
              />
              <span className="label-text text-gray-300">Active</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              <FaSave className="mr-2" />
              {isSubmitting ? 'Updating...' : 'Update Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlan;