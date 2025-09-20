import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { authApiClient } from "../../services/apiServices";
import SingleClassCard from "./SingleClassCard";

const ClassesDashboard = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchClasses = async () => {
      try {
        const response = await authApiClient.get("classes/schedule/");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const classesWithDates = response.data.data.map(cls => ({
          ...cls,
          startDate: newDate(cls.fitness_class.start_datetime),
          endDate: newDate(cls.fitness_class.end_datetime)
        }));
        
        setAllClasses(classesWithDates);
        setFilteredClasses(classesWithDates);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Helper function to create date objects
  const newDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    date.setSeconds(0, 0); // Normalize seconds and milliseconds
    return date;
  };

  // Filter classes based on active tab
  const filterClasses = (tab) => {
    const now = newDate(new Date());
    const today = newDate(now);
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = newDate(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch(tab) {
      case 'today':
        return allClasses.filter(cls => {
          return cls.startDate >= today && cls.startDate < tomorrow;
        });
      case 'upcoming':
        return allClasses.filter(cls => cls.startDate >= now);
      case 'past':
        return allClasses.filter(cls => cls.startDate < now);
      case 'all':
      default:
        return [...allClasses];
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredClasses(filterClasses(tab));
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-200">My Classes</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-base-300 p-1 rounded-lg max-w-md">
          {['all', 'today', 'upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md flex-1 ${
                activeTab === tab
                  ? 'bg-base-100 text-brand shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {/* {tab === 'today' && filteredClasses.length > 0 && (
                <span className="ml-1 bg-brand text-white text-xs px-2 py-0.5 rounded-full">
                  {filteredClasses.length}
                </span>
              )} */}
            </button>
          ))}
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-gray-400">No classes found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((singleClass) => (
            <SingleClassCard key={singleClass.id} singleClass={singleClass} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassesDashboard;
