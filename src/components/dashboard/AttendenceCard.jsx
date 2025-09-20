import React from 'react';
import { 
  FaUserCheck, 
  FaUserTimes, 
  FaCalendarAlt, 
  FaUserTie, 
  FaEnvelope,
  FaChalkboardTeacher,
  FaInfoCircle
} from 'react-icons/fa';

const AttendenceCard = ({ attendance ,key}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div key={key} ke className="bg-base-300 rounded-xl border border-base-200 overflow-hidden hover:border-brand/30 transition-all duration-200">
      {/* Header */}
      <div className="p-4 border-b border-base-200/50 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {attendance.booking_data.class_data.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {attendance.booking_data.class_data.description}
          </p>
        </div>
        <span 
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            attendance.present 
              ? 'bg-green-500/10 text-green-400' 
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {attendance.present ? (
            <FaUserCheck className="mr-1.5 h-3.5 w-3.5" />
          ) : (
            <FaUserTimes className="mr-1.5 h-3.5 w-3.5" />
          )}
          {attendance.present ? 'Present' : 'Absent'}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Instructor Info */}
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-base-200 flex items-center justify-center mt-0.5">
            <FaChalkboardTeacher className="h-5 w-5 text-brand" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-200">Instructor</h4>
            <p className="text-sm text-gray-300">
              {`${attendance.booking_data.class_data.instructor.first_name} ${attendance.booking_data.class_data.instructor.last_name}`}
            </p>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <FaEnvelope className="mr-1.5 h-3 w-3" />
              <span className="truncate">
                {attendance.booking_data.class_data.instructor.email}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-400">
              <FaInfoCircle className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
              <span>Marked By</span>
            </div>
            <div className="text-sm font-medium text-gray-200">
              Admin #{attendance.marked_by}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-xs text-gray-400">
              <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
              <span>Date & Time</span>
            </div>
            <div className="text-sm font-medium text-gray-200">
              {formatDate(attendance.marked_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendenceCard