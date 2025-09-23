import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authApiClient } from '../../services/apiServices';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaDumbbell, FaPlus, FaArrowLeft } from 'react-icons/fa';
import Loader from '../common/Loader';

const AddBooking = () => {
  const [members, setMembers] = useState([]);
  const [fitnessClasses, setFitnessClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    member_id: '',
    class_id: ''
  });
  const navigate = useNavigate();

  // Fetch members and fitness classes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [membersRes, classesRes] = await Promise.all([
          authApiClient.get('/user-list/'),
          authApiClient.get('/fitness-classes/')
        ]);
        setMembers(membersRes.data.data.results);
        setFitnessClasses(classesRes.data.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load required data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.member_id || !formData.class_id) {
      toast.error('Please select both a member and a class');
      return;
    }

    try {
      setSubmitting(true);
      toast.loading('Creating booking...');
      const response = await authApiClient.post('/bookings/', {
        member_id: formData.member_id,
        fitness_class_id: formData.class_id,
        status: 'BOOKED'
      });
      
      toast.success('Booking created successfully!');
      navigate('/admin/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create booking';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
      toast.dismiss();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mr-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold">Add New Booking</h1>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Member Selection */}
              <div>
                <label htmlFor="member_id" className="block text-sm font-medium text-gray-300 mb-2">
                  <FaUser className="inline mr-2" /> Select Member
                </label>
                <select
                  id="member_id"
                  name="member_id"
                  value={formData.member_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.first_name} {member.last_name} ({member.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fitness Class Selection */}
              <div>
                <label htmlFor="class_id" className="block text-sm font-medium text-gray-300 mb-2">
                  <FaDumbbell className="inline mr-2" /> Select Fitness Class
                </label>
                <select
                  id="class_id"
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a class</option>
                  {fitnessClasses.map((fitnessClass) => {
                    // Format the class time for display
                    const classTime = new Date(fitnessClass.start_time);
                    const timeString = classTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });
                    const dateString = classTime.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    });
                    
                    return (
                      <option key={fitnessClass.id} value={fitnessClass.id}>
                        {fitnessClass.title} - {fitnessClass.instructor} ({dateString} at {timeString})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex items-center justify-center w-full px-6 py-3 rounded-lg font-medium ${
                    submitting
                      ? 'bg-blue-700 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  <FaPlus className="mr-2" />
                  {submitting ? 'Creating Booking...' : 'Create Booking'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooking;