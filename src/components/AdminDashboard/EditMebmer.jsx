import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaTimes, FaUserShield, FaUserTie, FaUserAlt } from 'react-icons/fa';
import { authApiClient } from '../../services/apiServices';
import Loader from '../common/Loader';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    role: 'MEMBER',
    profile_picture: '',
  });
  const [errors, setErrors] = useState({});

  // Available roles with icons
  const roles = [
    { value: 'ADMIN', label: 'Admin', icon: <FaUserShield className="mr-2" /> },
    { value: 'STAFF', label: 'Staff', icon: <FaUserTie className="mr-2" /> },
    { value: 'MEMBER', label: 'Member', icon: <FaUserAlt className="mr-2" /> },
  ];

  // Get member data from location state or fetch from API
  useEffect(() => {
    const initializeForm = async () => {
      try {
        setLoading(true);
        let memberData = location.state?.member;
        
        if (!memberData) {
          const response = await authApiClient.get(`/api/users/${id}/`);
          memberData = response.data;
        }

        setFormData({
          email: memberData.email,
          first_name: memberData.first_name,
          last_name: memberData.last_name,
          address: memberData.address || '',
          phone_number: memberData.phone_number || '',
          role: memberData.role || 'MEMBER',
          profile_picture: memberData.profile_picture_url || '',
        });
      } catch (error) {
        console.error('Error loading member data:', error);
        toast.error('Failed to load member data');
        navigate(-1); // Go back if there's an error
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, [id, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (formData.phone_number && !/^\+?[0-9\s-]+$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Invalid phone number format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      // Only send the fields that can be updated
      const updateData = {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: formData.address,
        phone_number: formData.phone_number,
        role: formData.role,
      };

      await authApiClient.put(`/api/users/${id}/`, updateData);
      toast.success('Member updated successfully');
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error('Error updating member:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update member';
      toast.error(errorMessage);
      
      // Handle validation errors from the server
      if (error.response?.data) {
        setErrors(prev => ({
          ...prev,
          ...error.response.data
        }));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Member</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-700 text-white pl-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`bg-gray-700 text-white pl-10 w-full rounded-md border ${errors.first_name ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="First name"
                  />
                </div>
                {errors.first_name && <p className="mt-1 text-sm text-red-400">{errors.first_name}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`bg-gray-700 text-white pl-10 w-full rounded-md border ${errors.last_name ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Last name"
                  />
                </div>
                {errors.last_name && <p className="mt-1 text-sm text-red-400">{errors.last_name}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={`bg-gray-700 text-white pl-10 w-full rounded-md border ${errors.phone_number ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+8801234567890"
                />
              </div>
              {errors.phone_number && <p className="mt-1 text-sm text-red-400">{errors.phone_number}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  className={`bg-gray-700 text-white pl-10 w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter address"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-gray-700 text-white w-full rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-400">{errors.role}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-600 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                disabled={saving}
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                disabled={saving}
              >
                <FaSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;