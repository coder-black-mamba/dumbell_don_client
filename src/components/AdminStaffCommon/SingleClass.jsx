import React from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUserAlt,
  FaDumbbell,
} from "react-icons/fa";
import { formatDate, formatTime, formatDateTime } from "../../utils/datetime";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const SingleClass = ({ cls }) => {
  const { isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  const getAvailableSpots = (cls) => {
    return cls.max_capacity - cls.current_enrollment;
  };

  const handleEdit = (cls) => {
    const id = cls.id;
    if (isAdmin) {
      navigate(`/admin/class/edit/${id}`);
    } else if (isStaff) {
      navigate(`/staff/class/edit/${id}`);
    } else {
      navigate("/unauthorized");
    }
  };

  return (
    <div
      key={cls.id}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  cls.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {cls.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mt-1 text-gray-600">{cls.description}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center text-gray-700">
                <FaUserAlt className="text-blue-500 mr-2" />
                <span>{cls.instructor}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <span>{formatDateTime(cls.schedule)}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaClock className="text-blue-500 mr-2" />
                <span>{cls.duration_minutes} minutes</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaDumbbell className="text-blue-500 mr-2" />
                <span>
                  {getAvailableSpots(cls)}/{cls.max_capacity} spots available
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => handleEdit(cls)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
