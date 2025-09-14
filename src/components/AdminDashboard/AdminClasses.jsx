import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheck, FaTimes, FaCalendarAlt, FaClock, FaUserAlt, FaDumbbell } from 'react-icons/fa';

// Mock data
const mockClasses = {
  count: 3,
  results: [
    {
      id: 1,
      name: 'Yoga Flow',
      description: 'A dynamic yoga class focusing on fluid movements and breath work',
      instructor: 'Sarah Johnson',
      schedule: '2025-09-15T09:00:00Z',
      duration_minutes: 60,
      max_capacity: 20,
      current_enrollment: 15,
      is_active: true,
      created_at: '2025-08-13T15:04:57.587705Z',
      updated_at: '2025-08-13T15:04:57.587726Z',
      created_by: 2
    },
    {
      id: 2,
      name: 'HIIT Training',
      description: 'High-intensity interval training for maximum calorie burn',
      instructor: 'Mike Chen',
      schedule: '2025-09-15T17:30:00Z',
      duration_minutes: 45,
      max_capacity: 15,
      current_enrollment: 12,
      is_active: true,
      created_at: '2025-08-13T15:07:12.984537Z',
      updated_at: '2025-08-13T15:07:12.984557Z',
      created_by: 2
    },
    {
      id: 3,
      name: 'Zumba Party',
      description: 'Dance-based fitness class with Latin and international music',
      instructor: 'Maria Garcia',
      schedule: '2025-09-16T18:00:00Z',
      duration_minutes: 60,
      max_capacity: 25,
      current_enrollment: 20,
      is_active: true,
      created_at: '2025-08-13T15:07:55.672907Z',
      updated_at: '2025-08-13T15:07:55.672926Z',
      created_by: 2
    }
  ]
};

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: '',
    schedule: '',
    duration_minutes: 60,
    max_capacity: 15,
    is_active: true,
  });

  // Load classes
  useEffect(() => {
    const timer = setTimeout(() => {
      setClasses(mockClasses.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentClass) {
      // Update existing class
      setClasses(classes.map(cls => 
        cls.id === currentClass.id ? { ...formData, id: currentClass.id } : cls
      ));
    } else {
      // Add new class
      const newClass = {
        id: Math.max(...classes.map(c => c.id), 0) + 1,
        ...formData,
        current_enrollment: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 2 // Mock user ID
      };
      setClasses([newClass, ...classes]);
    }
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      instructor: '',
      schedule: '',
      duration_minutes: 60,
      max_capacity: 15,
      is_active: true,
    });
    setCurrentClass(null);
  };

  // Handle edit class
  const handleEdit = (cls) => {
    setCurrentClass(cls);
    setFormData({
      name: cls.name,
      description: cls.description,
      instructor: cls.instructor,
      schedule: cls.schedule.split('Z')[0], // Remove timezone for datetime-local input
      duration_minutes: cls.duration_minutes,
      max_capacity: cls.max_capacity,
      is_active: cls.is_active,
    });
    setIsModalOpen(true);
  };

  // Handle delete class
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== id));
    }
  };

  // Toggle class status
  const toggleClassStatus = (id) => {
    setClasses(classes.map(cls => 
      cls.id === id ? { ...cls, is_active: !cls.is_active } : cls
    ));
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  // Calculate available spots
  const getAvailableSpots = (cls) => {
    return cls.max_capacity - cls.current_enrollment;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Class Schedule</h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search classes..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentClass(null);
              setFormData({
                name: '',
                description: '',
                instructor: '',
                schedule: '',
                duration_minutes: 60,
                max_capacity: 15,
                is_active: true,
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Class
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <div key={cls.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {cls.is_active ? 'Active' : 'Inactive'}
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
                        <span>{getAvailableSpots(cls)}/{cls.max_capacity} spots available</span>
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
                  <button
                    onClick={() => toggleClassStatus(cls.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center ${
                      cls.is_active 
                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' 
                        : 'bg-green-100 hover:bg-green-200 text-green-800'
                    }`}
                  >
                    {cls.is_active ? (
                      <><FaTimes className="mr-2" /> Deactivate</>
                    ) : (
                      <><FaCheck className="mr-2" /> Activate</>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No classes found. Create your first class to get started.
          </div>
        )}
      </div>

      {/* Add/Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {currentClass ? 'Edit Class' : 'Add New Class'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration_minutes"
                    min="15"
                    step="15"
                    value={formData.duration_minutes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    name="max_capacity"
                    min="1"
                    value={formData.max_capacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active Class
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {currentClass ? 'Update Class' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;