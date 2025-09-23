import React, { useState } from 'react'
import { formatDateTime, formatTime } from '../../utils/datetime'
import { Toaster, toast } from 'react-hot-toast';
import { useViewTransitionState } from 'react-router';




const AttendenceDetail = ({selectedAttendance:parentSelectedAttendance, setIsModalOpen, toggleAttendanceStatus}) => {

    const [selectedAttendance, setSelectedAttendance] = useState(parentSelectedAttendance);


    const handleAttendenceChange = async () => {
        toggleAttendanceStatus(selectedAttendance.id);
        setSelectedAttendance(prev => ({ ...prev, present: !prev.present }));   
      };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Toaster />
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b">Attendance Details</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Member Information</h3>
          <div className="flex items-center space-x-4 mb-4">
            <img 
              className="h-16 w-16 rounded-full" 
              src={selectedAttendance.booking_data.member.avatar} 
              alt={selectedAttendance.booking_data.member.first_name} 
            />
            <div>
              <p className="text-lg font-medium text-gray-700">{selectedAttendance.booking_data.member.first_name}</p>
              <p className="text-gray-600">{selectedAttendance.booking_data.member.email}</p>
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Class Details</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-900">
              <span className="font-medium  text-gray-700 ">Class:</span>{' '}
              <span className="text-gray-600">
                {selectedAttendance.booking_data.fitness_class.title}
              </span>
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-medium text-gray-700">Instructor:</span>{' '}
              <span className="text-gray-600">
                {selectedAttendance.booking_data.fitness_class.instructor}
              </span>
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-medium text-gray-700">Scheduled Time:</span>{' '}
              <span className="text-gray-600">
                {formatTime(selectedAttendance.booking_data.fitness_class.start_datetime)}
              </span>   
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-medium text-gray-700">Duration:</span>{' '}
              <span className="text-gray-600">
                {selectedAttendance.booking_data.fitness_class.duration_minutes} minutes
              </span>
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Attendance Information</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-gray-700">Attendance ID:</span>{' '}
              <span className="text-gray-600">
                {selectedAttendance.id}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Marked At:</span>{' '}
              <span className="text-gray-600">
                {formatDateTime(selectedAttendance.marked_at)}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Marked By:</span>{' '}
              <span className="text-gray-600">
                {selectedAttendance.marked_by.name} ({selectedAttendance.marked_by.role})
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Status:</span>{' '}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                selectedAttendance.present 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedAttendance.present ? 'Present' : 'Absent'}
              </span>
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAttendenceChange}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedAttendance.present 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Mark as {selectedAttendance.present ? 'Absent' : 'Present'}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AttendenceDetail