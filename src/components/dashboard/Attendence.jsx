import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes, FaCalendarAlt, FaUserTie, FaEnvelope } from 'react-icons/fa';

const Attendence = () => {
  const [attendance, setAttendance] = useState({
    loading: true,
    data: [],
    error: null
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchAttendance = async () => {
      try {
        // In a real app, you would fetch this from your API
        const mockData = [
          {
            "present": true,
            "booking_data": {
              "member": 1,
              "class_data": {
                "title": "Morning Yoga",
                "description": "Gentle morning yoga session",
                "instructor": {
                  "first_name": "Sarah",
                  "last_name": "Johnson",
                  "email": "sarah@example.com"
                }
              }
            },
            "marked_by": 2,
            "marked_at": "2025-09-12T12:02:18.977Z"
          },
          {
            "present": false,
            "booking_data": {
              "member": 2,
              "class_data": {
                "title": "Power Spin",
                "description": "High-intensity cycling",
                "instructor": {
                  "first_name": "Mike",
                  "last_name": "Chen",
                  "email": "mike@example.com"
                }
              }
            },
            "marked_by": 2,
            "marked_at": "2025-09-12T10:30:00.000Z"
          }
        ];

        setAttendance({
          loading: false,
          data: mockData,
          error: null
        });
      } catch (error) {
        setAttendance({
          ...attendance,
          loading: false,
          error: "Failed to load attendance data"
        });
      }
    };

    fetchAttendance();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  if (attendance.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (attendance.error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{attendance.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-200">Attendance Records</h1>
      </div>

      <div className="bg-base-300 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-base-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marked By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-base-300 divide-y divide-gray-200">
              {attendance.data.map((record, index) => (
                <tr key={index} className="hover:bg-base-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.present 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.present ? (
                        <FaUserCheck className="inline mr-1" />
                      ) : (
                        <FaUserTimes className="inline mr-1" />
                      )}
                      {record.present ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">
                      {record.booking_data.class_data.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.booking_data.class_data.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-base-200 flex items-center justify-center">
                        <FaUserTie className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-200">
                          {record.booking_data.class_data.instructor.first_name} {record.booking_data.class_data.instructor.last_name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FaEnvelope className="mr-1" size={12} />
                          {record.booking_data.class_data.instructor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin #{record.marked_by}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      {formatDate(record.marked_at)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {attendance.data.length === 0 && (
          <div className="text-center py-12 bg-base-300">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by taking attendance for a class.</p>
          </div>
        )}

        <div className="bg-base-300 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{attendance.data.length}</span> of{' '}
                <span className="font-medium">{attendance.data.length}</span> results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;