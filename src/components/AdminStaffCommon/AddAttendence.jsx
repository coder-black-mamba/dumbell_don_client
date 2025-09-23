import React, { useState, useEffect } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import { authApiClient } from '../../services/apiServices';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../common/Loader';

const AddAttendence = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [bookings, setBookings] = useState([]);
  const [filterdBookings, setFilterdBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attendance, setAttendance] = useState({});

  // Fetch all classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await authApiClient.get('fitness-classes/');
        const bookingsResponse = await authApiClient.get(`bookings/`);
        setBookings(bookingsResponse.data);
        setClasses(response.data || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        toast.error('Failed to load classes');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Fetch bookings when a class is selected
  useEffect(() => {
    const fetchBookings = async () => {
        if (!selectedClass) return;
        try {
            // setLoading(true);
            setAttendance({});
            toast.loading('Loading bookings...');
            const selectedResponse = bookings.filter((booking) => booking.fitness_class.id == selectedClass);
            setFilterdBookings(selectedResponse);
            console.log(selectedResponse)


            toast.success('Bookings loaded successfully!');
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load class bookings');
            setBookings([]);
        } finally {
            toast.dismiss();
        }
    };

    fetchBookings();
  }, [selectedClass]);

  const handleAttendanceChange = (bookingId, isPresent) => {
    setAttendance(prev => ({
      ...prev,
      [bookingId]: isPresent
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(attendance).length === 0) {
      toast.warning('No attendance to submit');
      return;
    }

    setSubmitting(true);
    const requests = Object.entries(attendance).map(([bookingId, isPresent]) =>
      authApiClient.post('attendances/', {
        present: isPresent,
        booking_id: bookingId
      })
    );

    try {
      await Promise.all(requests);
      toast.success('Attendance marked successfully!');
      // Reset form
      setSelectedClass('');
      setBookings([]);
      setFilterdBookings([]);
      setAttendance({});
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast.error('Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  if(loading){
    return (
        <div className="flex justify-center items-center py-4">
            <Loader/>
        </div>
    )
  }

  console.log(attendance)


  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
      
      <div className="bg-base-200 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <select
            id="classSelect"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            disabled={loading || submitting}
          >
            <option value="">-- Select a class --</option>
            {classes?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.title} - {new Date(cls.start_datetime).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {loading && selectedClass && (
          <div className="flex justify-center items-center py-4">
            <FaSpinner className="animate-spin text-blue-500 text-2xl" />
            <span className="ml-2">Loading bookings...</span>
          </div>
        )}

        {!loading && selectedClass && filterdBookings.length > 0 && (
          <form onSubmit={handleSubmit}>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-base-300">
                <thead>
                  <tr className="bg-base-200">
                    <th className="py-2 px-4 text-left">Member</th>
                    <th className="py-2 px-4 text-center">Present</th>
                  </tr>
                </thead>
                <tbody>
                  {filterdBookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {booking.member?.profile_picture_url && (
                            <img
                              src={booking.member.profile_picture_url}
                              alt={booking.member.name}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                          )}
                          <div>
                            <div className="font-medium">{booking.member?.first_name + ' ' + booking.member?.last_name || 'Unknown Member'}</div>
                            <div className="text-sm text-gray-200">{booking.member?.email}</div>
                            <p className='text-sm text-gray-700 bg-gray-300 p-1 my-1 rounded'>ID: {booking.member?.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={attendance[booking.id] || false}
                            onChange={(e) => handleAttendanceChange(booking.id, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            disabled={submitting}
                          />
                          <span className="ml-2">
                            {attendance[booking.id] ? 'Present' : 'Absent'}
                          </span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting || Object.keys(attendance).length === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  submitting || Object.keys(attendance).length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Mark Attendance
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {!loading && selectedClass && bookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No confirmed bookings found for this class.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAttendence;