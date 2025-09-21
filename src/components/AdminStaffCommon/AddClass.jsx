import React from 'react';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { FaArrowLeft, FaSave, FaCalendarAlt, FaClock, FaUsers, FaDollarSign, FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';
import { authApiClient } from '../../services/apiServices';
import { toast ,Toaster } from 'react-hot-toast';


const AddClass = () => {
  const { isAdmin, isStaff ,user } = useAuth();
  const navigate = useNavigate();
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      capacity: 20,
      price_cents: 0,
      duration_minutes: 60,
      start_datetime: '',
      end_datetime: '',
      location: '',
      is_active: true,
      instructor: user.id
    }
  });

  const onSubmit = async (data) => {
    console.log('Form submitted:', data);
    try {
      toast.loading('Adding class...');
      const response = await authApiClient.post('fitness-classes/', data);
      console.log(response.data);
      toast.success('Class added successfully');

      if(isAdmin){
        navigate('/admin/classes');
      }else{
        navigate('/staff/classes');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      toast.error('Error adding class');
    }finally{
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (isAdmin) {
      navigate('/admin/classes');
    } else if (isStaff) {
      navigate('/staff/classes');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="inline-block mr-2" />
          Back to Classes
        </button>
        <h1 className="text-2xl font-bold text-gray-300">Add New Class</h1>
      </div>

      <div className="bg-base-300 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Class Title <span className="text-red-500">*</span>
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Class title is required' }}
                render={({ field }) => (
                  <div className="relative">
                    <input
                      {...field}
                      type="text"
                      id="title"
                      className={`w-full pl-10 px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserAlt className="text-gray-400" />
                    </div>
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <div className="relative">
                    <textarea
                      {...field}
                      id="description"
                      rows={3}
                      className={`w-full pl-10 px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <div className="absolute top-3 left-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Instructor */}
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
                Instructor <span className="text-red-500">*</span>
              </label>
              <Controller
                name="instructor"
                control={control}
                rules={{ required: 'Instructor is required' }}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserAlt className="text-gray-400" />
                    </div>
                    <input
                      {...field}
                      disabled
                      type="text"
                      id="instructor"
                      className={`w-full pl-10 px-4 py-2 border rounded-lg bg-gray-600`}
                    /> 
                  </div>
                )}
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Location is required' }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="text"
                        id="location"
                        className={`w-full pl-10 px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Start Date & Time */}
            <div>
              <label htmlFor="start_datetime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time <span className="text-red-500">*</span>
              </label>
              <Controller
                name="start_datetime"
                control={control}
                rules={{ required: 'Start date and time is required' }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="datetime-local"
                        id="start_datetime"
                        className={`w-full pl-10 px-4 py-2 border ${errors.start_datetime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.start_datetime && (
                      <p className="mt-1 text-sm text-red-600">{errors.start_datetime.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* End Date & Time */}
            <div>
              <label htmlFor="end_datetime" className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time <span className="text-red-500">*</span>
              </label>
              <Controller
                name="end_datetime"
                control={control}
                rules={{ required: 'End date and time is required' }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="datetime-local"
                        id="end_datetime"
                        className={`w-full pl-10 px-4 py-2 border ${errors.end_datetime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.end_datetime && (
                      <p className="mt-1 text-sm text-red-600">{errors.end_datetime.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <Controller
                name="duration_minutes"
                control={control}
                rules={{ 
                  required: 'Duration is required',
                  min: { value: 1, message: 'Duration must be at least 1 minute' }
                }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="number"
                        id="duration_minutes"
                        min="1"
                        className={`w-full pl-10 px-4 py-2 border ${errors.duration_minutes ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.duration_minutes && (
                      <p className="mt-1 text-sm text-red-600">{errors.duration_minutes.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity <span className="text-red-500">*</span>
              </label>
              <Controller
                name="capacity"
                control={control}
                rules={{ 
                  required: 'Capacity is required',
                  min: { value: 1, message: 'Capacity must be at least 1' }
                }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUsers className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="number"
                        id="capacity"
                        min="1"
                        className={`w-full pl-10 px-4 py-2 border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.capacity && (
                      <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price_cents" className="block text-sm font-medium text-gray-700 mb-1">
                Price (in cents) <span className="text-red-500">*</span>
              </label>
              <Controller
                name="price_cents"
                control={control}
                rules={{ 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price cannot be negative' }
                }}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaDollarSign className="text-gray-400" />
                      </div>
                      <input
                        {...field}
                        type="number"
                        id="price_cents"
                        min="0"
                        step="1"
                        className={`w-full pl-10 px-4 py-2 border ${errors.price_cents ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.price_cents && (
                      <p className="mt-1 text-sm text-red-600">{errors.price_cents.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center">
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        {...field}
                        id="is_active"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                      Active Class
                    </label>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaSave className="mr-2 -ml-1" />
              Save Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;