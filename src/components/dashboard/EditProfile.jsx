import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaSave, FaTimes } from 'react-icons/fa';
import { authApiClient } from '../../services/apiServices';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const EditProfile = () => {
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await authApiClient.put(`auth/users/me/`, formData);
      await fetchUser(); // Refresh user data
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-300 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Edit Profile</h2>
          <div className="text-sm text-gray-400">
            Member since {new Date(user.join_date).toLocaleDateString()}
          </div>
        </div>

        {error && <ErrorMessage message={error} className="mb-4" />}
        {success && (
          <div className="bg-green-500/10 text-green-400 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center">
                  <FaUser className="mr-2" /> First Name
                </span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center">
                  <FaUser className="mr-2" /> Last Name
                </span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text flex items-center">
                  <FaEnvelope className="mr-2" /> Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">Contact admin to change email</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center">
                  <FaPhone className="mr-2" /> Phone Number
                </span>
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Address
                </span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-base-200">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn btn-ghost"
              disabled={loading}
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span> Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-base-300 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-center">
            <FaUser className="text-gray-400 mr-3 w-5" />
            <span className="text-gray-300">Role:</span>
            <span className="ml-2 capitalize">{user.role?.toLowerCase()}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-3 w-5" />
            <span className="text-gray-300">Last Active:</span>
            <span className="ml-2">
              {new Date(user.last_active).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;