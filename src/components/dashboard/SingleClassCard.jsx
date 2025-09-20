import React from 'react'
import { FaCheckCircle, FaCalendarAlt, FaClock, FaUserAlt, FaMapMarkerAlt } from 'react-icons/fa';

  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${
      mins > 0 ? `${mins}m` : ""
    }`.trim();
  };


  
const SingleClassCard = ({ singleClass }) => {
  return (
    <div
              key={singleClass.id}
              className="bg-base-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            > 
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-100">
                    {singleClass.fitness_class.title}
                  </h2>
                  <span className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    {singleClass.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">
                  {singleClass.fitness_class.description}
                </p>

                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-brand mr-2" />
                    <span>
                      {formatDateTime(singleClass.fitness_class.start_datetime)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-brand mr-2" />
                    <span>
                      {formatDuration(singleClass.fitness_class.duration_minutes)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaUserAlt className="text-brand mr-2" />
                    <span>
                      Instructor:{" "}
                      {`${singleClass.fitness_class.instructor.first_name} ${singleClass.fitness_class.instructor.last_name}`}
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-400">
                    Booked on: {formatDateTime(singleClass.booked_at)}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-brand mr-2" />
                    <span>{singleClass.fitness_class.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between">
                  <button className="text-brand hover:text-brand-light font-medium">
                    View Details
                  </button>
                  <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm font-medium">
                    {singleClass.status === "BOOKED"
                      ? "View Booking"
                      : "Book Again"}
                  </button>
                </div>
              </div>
            </div>
  )
}

export default SingleClassCard