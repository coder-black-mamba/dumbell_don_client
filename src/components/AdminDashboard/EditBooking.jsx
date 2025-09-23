import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authApiClient } from '../../services/apiServices';
import toast, { Toaster } from "react-hot-toast";
import { formatDate, formatTime } from '../../utils/datetime';

const statusOptions = [
  { value: 'BOOKED', label: 'Booked' },
  { value: 'ATTENDED', label: 'Attended' },
  { value: 'NO_SHOW', label: 'No Show' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'BOOKED':
      return 'bg-blue-900/30 text-blue-300 border border-blue-700';
    case 'ATTENDED':
      return 'bg-green-900/30 text-green-300 border border-green-700';
    case 'CANCELLED':
      return 'bg-gray-700/50 text-gray-300 border border-gray-600';
    case 'NO_SHOW':
      return 'bg-red-900/30 text-red-300 border border-red-700';
    default:
      return 'bg-gray-700/50 text-gray-300 border border-gray-600';
  }
};

const EditBooking = () => {
  const { booking: initialBooking } = useLocation().state;
  const [booking, setBooking] = useState(initialBooking);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      toast.loading('Updating booking status...');
      const response = await authApiClient.patch(
        `/bookings/${booking.id}/`,
        { status: newStatus }
      );
      setBooking(prev => ({ ...prev, status: newStatus }));
      toast.success('Booking status updated successfully');
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setIsUpdating(false);
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
        <Toaster />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Update Booking Status</h1>
                <p className="mt-1 text-sm text-gray-400">ID: {booking.id}</p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Member Information</h3>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-12 w-12 rounded-full ring-2 ring-gray-600"
                      src={booking.member.profile_picture_url || 'https://i.pravatar.cc/300'}
                      alt={booking.member.first_name + ' ' + booking.member.last_name}
                    />
                    <div>
                      <p className="font-medium text-white">
                        {booking.member.first_name} {booking.member.last_name}
                      </p>
                      <p className="text-sm text-gray-300">{booking.member.email}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">Class Details</h3>
                <div className="bg-gray-700/50 p-4 rounded-lg space-y-2">
                  <p className="text-white">
                    <span className="text-gray-400">Class:</span> {booking.fitness_class.title}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Instructor:</span> {booking.fitness_class.instructor}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Date:</span> {formatDate(booking.fitness_class.start_datetime)}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Time:</span> {formatTime(booking.fitness_class.start_datetime)} -{' '}
                    {new Date(new Date(booking.fitness_class.start_datetime).getTime() + 
                      booking.fitness_class.duration_minutes * 60000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Update Status</h3>
                <div className="bg-gray-700/50 p-6 rounded-lg space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">Current Status</p>
                    <div className="inline-block">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300 mb-2">Change Status To</p>
                    <div className="grid grid-cols-2 gap-3">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleStatusChange(option.value)}
                          disabled={isUpdating || booking.status === option.value}
                          className={`px-4 py-2 rounded-lg text-center transition-colors ${
                            booking.status === option.value
                              ? 'cursor-not-allowed opacity-50 ' + getStatusBadgeClass(option.value)
                              : 'hover:bg-gray-600 border border-gray-600 hover:border-transparent'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-600">
                    <p className="text-sm text-gray-400">
                      <span className="font-medium">Booked On:</span>{' '}
                      {new Date(booking.booked_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;