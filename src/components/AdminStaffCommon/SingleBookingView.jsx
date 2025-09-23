import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

// import { deleteBooking, updateBookingStatus } from '../../services/bookingService';

import { formatDate, formatTime, formatDateTime } from "../../utils/datetime";
import { authApiClient } from "../../services/apiServices";

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "BOOKED":
      return "bg-blue-100 text-blue-800";
    case "ATTENDED":
      return "bg-green-100 text-green-800";
    case "NO_SHOW":
      return "bg-red-100 text-red-800";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SingleBookingView = ({ onClose, onUpdate }) => {
  const navigate = useNavigate();
  const { booking } = useLocation().state;
  const { isAdmin, user } = useAuth();

  const handleEdit = () => {
    if (isAdmin) {
      navigate(`/admin/bookings/edit/${booking.id}/`, { state: { booking } });
    } else {
      navigate("/unauthorized");
    }
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting booking...");
      const response = await authApiClient.delete(`/bookings/${booking.id}/`);
      toast.success("Booking deleted successfully");
      navigate("/admin/bookings");
    } catch (error) {
      toast.error("Failed to delete booking");
    } finally {
      toast.dismiss();
    }
  };



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
        <Toaster/>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Booking Details
                </h1>
                <p className="mt-1 text-sm text-gray-400">ID: {booking.id}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </button>
                {isAdmin && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-5 bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-gray-200">
                <h3 className="text-lg font-medium text-white mb-3">
                  Member Information
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={
                      booking.member.profile_picture_url ||
                      "https://i.pravatar.cc/300"
                    }
                    alt={
                      booking.member.first_name + " " + booking.member.last_name
                    }
                  />
                  <div>
                    <p className="text-lg font-medium text-white">
                      {booking.member.first_name +
                        " " +
                        booking.member.last_name}
                    </p>
                    <p className="text-gray-300">{booking.member.email}</p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">
                  Class Details
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">Class:</span>{" "}
                    {booking.fitness_class.title}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">
                      Instructor:
                    </span>{" "}
                    # {booking.fitness_class.instructor}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">Date:</span>{" "}
                    {formatDate(booking.fitness_class.start_datetime)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">Time:</span>{" "}
                    {formatTime(booking.fitness_class.start_datetime)} -{" "}
                    {new Date(
                      new Date(booking.fitness_class.start_datetime).getTime() +
                        booking.fitness_class.duration_minutes * 60000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">Duration:</span>{" "}
                    {booking.fitness_class.duration_minutes} minutes
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Booking Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">
                      Booking ID:
                    </span>{" "}
                    {booking.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">
                      Booked On:
                    </span>{" "}
                    {formatDateTime(booking.booked_at)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-400">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Update Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "BOOKED"
                          ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                          : "bg-gray-700 text-blue-400 border border-blue-800 hover:bg-blue-900/20"
                      }`}
                    >
                      Booked
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "ATTENDED"
                          ? "bg-green-900/30 text-green-300 border border-green-700"
                          : "bg-gray-700 text-green-400 border border-green-800 hover:bg-green-900/20"
                      }`}
                    >
                      Attended
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "NO_SHOW"
                          ? "bg-red-900/30 text-red-300 border border-red-700"
                          : "bg-gray-700 text-red-400 border border-red-800 hover:bg-red-900/20"
                      }`}
                    >
                      No Show
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "CANCELLED"
                          ? "bg-gray-700 text-gray-200 border border-gray-600"
                          : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      Cancel
                    </button>
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

export default SingleBookingView;
