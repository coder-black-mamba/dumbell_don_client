import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaStar, 
  FaRegStar, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaFilter,
  FaUser,
  FaDumbbell,
  FaCheck,
  FaTimes,
  FaEye,
  FaCalendarAlt
} from 'react-icons/fa';

// Mock data for demonstration
const mockFeedback = {
  count: 1,
  results: [
    {
      id: 1,
      rating: 10,
      comment: "Great class! The instructor was very knowledgeable and the workout was intense but fun.",
      created_at: "2025-08-21T23:45:17.946269Z",
      updated_at: "2025-08-21T23:45:17.946289Z",
      member: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      fitness_class: {
        id: 2,
        name: "Morning HIIT",
        instructor: "Sarah Johnson"
      }
    },
    {
      id: 2,
      rating: 8,
      comment: "Good session, but the room was a bit too warm.",
      created_at: "2025-08-20T15:30:00.000000Z",
      updated_at: "2025-08-20T15:30:00.000000Z",
      member: {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      fitness_class: {
        id: 1,
        name: "Yoga Flow",
        instructor: "Michael Chen"
      }
    },
    {
      id: 3,
      rating: 9,
      comment: "Excellent workout! Will definitely come again.",
      created_at: "2025-08-19T18:15:00.000000Z",
      updated_at: "2025-08-19T18:15:00.000000Z",
      member: {
        id: 3,
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      fitness_class: {
        id: 2,
        name: "Morning HIIT",
        instructor: "Sarah Johnson"
      }
    }
  ]
};

// Mock classes and members for form
const mockClasses = [
  { id: 1, name: 'Yoga Flow', instructor: 'Michael Chen' },
  { id: 2, name: 'Morning HIIT', instructor: 'Sarah Johnson' },
  { id: 3, name: 'Power Lifting', instructor: 'David Wilson' }
];

const mockMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alex Johnson', email: 'alex@example.com' }
];

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    member: '',
    fitness_class: ''
  });

  // Load feedback
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedbackList(mockFeedback.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter feedback
  const filteredFeedback = feedbackList.filter(feedback => {
    const matchesSearch = 
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.fitness_class.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter);
    const matchesClass = classFilter === 'all' || feedback.fitness_class.id.toString() === classFilter;
    
    return matchesSearch && matchesRating && matchesClass;
  });

  // Handle CRUD operations
  const handleView = (feedback) => {
    setCurrentFeedback(feedback);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (feedback) => {
    setCurrentFeedback(feedback);
    setFormData({
      rating: feedback.rating,
      comment: feedback.comment,
      member: feedback.member.id.toString(),
      fitness_class: feedback.fitness_class.id.toString()
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (feedback) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbackList(feedbackList.filter(item => item.id !== feedback.id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Update existing feedback
      const updatedFeedback = {
        ...currentFeedback,
        ...formData,
        member: mockMembers.find(m => m.id === parseInt(formData.member)),
        fitness_class: mockClasses.find(c => c.id === parseInt(formData.fitness_class)),
        updated_at: new Date().toISOString()
      };
      
      setFeedbackList(feedbackList.map(item => 
        item.id === currentFeedback.id ? updatedFeedback : item
      ));
    } else {
      // Create new feedback
      const newFeedback = {
        id: Math.max(0, ...feedbackList.map(f => f.id)) + 1,
        rating: formData.rating,
        comment: formData.comment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        member: mockMembers.find(m => m.id === parseInt(formData.member)),
        fitness_class: mockClasses.find(c => c.id === parseInt(formData.fitness_class))
      };
      
      setFeedbackList([newFeedback, ...feedbackList]);
    }
    
    // Reset form and close modal
    setFormData({
      rating: 5,
      comment: '',
      member: '',
      fitness_class: ''
    });
    setIsModalOpen(false);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Member Feedback</h1>
        <div className="flex space-x-3 w-full md:w-auto">
          <button
            onClick={() => {
              setCurrentFeedback(null);
              setFormData({
                rating: 5,
                comment: '',
                member: '',
                fitness_class: ''
              });
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Feedback
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search feedback..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>
                    {rating}/10
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDumbbell className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="all">All Classes</option>
                {mockClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredFeedback.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredFeedback.map(feedback => (
              <div key={feedback.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-12 w-12 rounded-full" 
                        src={feedback.member.avatar} 
                        alt={feedback.member.name} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {feedback.member.name}
                        </p>
                        <span className="text-xs text-gray-500">•</span>
                        <p className="text-xs text-gray-500">
                          {formatDate(feedback.created_at)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {feedback.comment}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {renderStars(feedback.rating)}
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {feedback.rating}/10
                          </span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaDumbbell className="mr-1" />
                          {feedback.fitness_class.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <button
                      onClick={() => handleView(feedback)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="View"
                    >
                      <FaEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                      title="Edit"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(feedback)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No feedback found matching your criteria.
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? 'Edit Feedback' : 'Add New Feedback'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <select
                      name="member"
                      value={formData.member}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      required
                      disabled={isEditMode && currentFeedback}
                    >
                      <option value="">Select a member</option>
                      {mockMembers.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.email})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDumbbell className="text-gray-400" />
                    </div>
                    <select
                      name="fitness_class"
                      value={formData.fitness_class}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      required
                    >
                      <option value="">Select a class</option>
                      {mockClasses.map(cls => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} with {cls.instructor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      name="rating"
                      min="1"
                      max="10"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      required
                    />
                    <span className="text-sm font-medium text-gray-900 w-8 text-center">
                      {formData.rating}/10
                    </span>
                  </div>
                  <div className="flex mt-1">
                    {renderStars(formData.rating)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your feedback..."
                    required
                  ></textarea>
                </div>

                {isEditMode && currentFeedback && (
                  <div className="text-xs text-gray-500">
                    <p>Created: {formatDate(currentFeedback.created_at)}</p>
                    <p>Last updated: {formatDate(currentFeedback.updated_at)}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditMode ? 'Update Feedback' : 'Add Feedback'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;