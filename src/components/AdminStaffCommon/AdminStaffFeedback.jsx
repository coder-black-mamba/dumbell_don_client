import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaStar, FaSearch } from 'react-icons/fa';
import { authApiClient } from '../../services/apiServices';
import Loader from '../common/Loader';
import { useAuth } from '../../hooks/useAuth';

const AdminStaffFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchFeedbacks();
  }, []);



  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await authApiClient.get('feedbacks/');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast.error('Failed to load feedbacks');
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingFeedback) {
        toast.loading('Updating feedback...');
        await authApiClient.put(`feedbacks/${editingFeedback.id}/`, data);
        toast.success('Feedback updated successfully');
      } else {
        toast.loading('Adding feedback...');
        await authApiClient.post('feedbacks/', data);
        toast.success('Feedback added successfully');
      }
      setIsModalOpen(false);
      reset();
      fetchFeedbacks();
    } catch (error) {
      console.error('Error saving feedback:', error);
      toast.error(`Failed to ${editingFeedback ? 'update' : 'add'} feedback`);
    }finally {
      toast.dismiss();
    }
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
    reset({
      rating: feedback.rating,
      comment: feedback.comment,
      fitness_class: feedback.fitness_class
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setFeedbackToDelete(id);
  };

  const confirmDelete = async () => {
    if (!feedbackToDelete) return;
    
    try {
      toast.loading('Deleting feedback...');
      await authApiClient.delete(`feedbacks/${feedbackToDelete}/`);
      toast.success('Feedback deleted successfully');
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback');
    } finally {
      setFeedbackToDelete(null);
      toast.dismiss();
    }
  };

  const cancelDelete = () => {
    setFeedbackToDelete(null);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.member?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-400'} inline`} 
      />
    ));
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Feedback Management</h2>
        {isAdmin && (
          <button 
            onClick={() => {
              setEditingFeedback(null);
              reset();
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            Add Feedback
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by email or comment..."
            className="input input-bordered w-full max-w-xs pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="alert alert-info">No feedback found</div>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">
                      {feedback.member?.first_name} {feedback.member?.last_name}
                      <span className="text-sm font-normal text-gray-400 ml-2">
                        ({feedback.member?.email})
                      </span>
                    </h3>
                    <div className="my-2">
                      {renderStars(feedback.rating)}
                      <span className="ml-2 text-sm text-gray-400">
                        ({feedback.rating}/5)
                      </span>
                    </div>
                    <p className="mt-2">{feedback.comment}</p>
                    <div className="text-sm text-gray-400 mt-2">
                      Class ID: {feedback.fitness_class} • 
                      {new Date(feedback.created_at).toLocaleString()}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(feedback)}
                        className="btn btn-ghost btn-sm"
                      >
                        <FaEdit className="text-blue-500" />
                      </button>
                      <button 
                        onClick={() => handleDelete(feedback.id)}
                        className="btn btn-ghost btn-sm hover:bg-red-50"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
        )))}
        </div>

      {/* Add/Edit Modal */}
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editingFeedback ? 'Edit Feedback' : 'Add New Feedback'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register('rating', { required: 'Rating is required' })}
                defaultValue=""
              >
                <option value="" disabled>Select rating</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {Array(num).fill('★').join('')} ({num} star{num > 1 ? 's' : ''})
                  </option>
                ))}
              </select>
              {errors.rating && (
                <span className="text-red-500 text-sm">{errors.rating.message}</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Enter your feedback"
                {...register('comment', { required: 'Comment is required' })}
              ></textarea>
              {errors.comment && (
                <span className="text-red-500 text-sm">{errors.comment.message}</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Fitness Class ID</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter fitness class ID"
                {...register('fitness_class', { 
                  required: 'Fitness class is required',
                  valueAsNumber: true
                })}
              />
              {errors.fitness_class && (
                <span className="text-red-500 text-sm">{errors.fitness_class.message}</span>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingFeedback ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`modal ${feedbackToDelete ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this feedback? This action cannot be undone.</p>
          <div className="modal-action">
            <button onClick={cancelDelete} className="btn btn-ghost">
              Cancel
            </button>
            <button onClick={confirmDelete} className="btn btn-error text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStaffFeedback;