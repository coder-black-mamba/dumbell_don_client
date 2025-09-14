import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

// Mock data
const mockPlans = {
  count: 3,
  results: [
    {
      id: 1,
      name: 'Monthly Membership Platinum',
      description: 'Flexible month-to-month access without commitment',
      duration_days: 30,
      price_cents: 3000,
      is_active: true,
      created_at: '2025-08-13T15:04:57.587705Z',
      created_by: 2
    },
    {
      id: 2,
      name: '3-Month Membership',
      description: 'Discounted rate for a 3-month commitment. Paid upfront; includes unlimited gym and classes access',
      duration_days: 90,
      price_cents: 8100,
      is_active: true,
      created_at: '2025-08-13T15:07:12.984537Z',
      created_by: 2
    },
    {
      id: 3,
      name: '7 Day Trial',
      description: 'Wanna Try LEts have 7 day plan',
      duration_days: 7,
      price_cents: 500,
      is_active: true,
      created_at: '2025-08-13T15:07:55.672907Z',
      created_by: 2
    }
  ]
};

const AdminMembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_days: 30,
    price_cents: 0,
    is_active: true,
  });

  // Load plans
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlans(mockPlans.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === currentPlan.id ? { ...formData, id: currentPlan.id } : plan
      ));
    } else {
      // Add new plan
      const newPlan = {
        id: Math.max(...plans.map(p => p.id), 0) + 1,
        ...formData,
        created_at: new Date().toISOString(),
        created_by: 2 // Mock user ID
      };
      setPlans([newPlan, ...plans]);
    }
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      duration_days: 30,
      price_cents: 0,
      is_active: true,
    });
    setCurrentPlan(null);
  };

  // Handle edit plan
  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      duration_days: plan.duration_days,
      price_cents: plan.price_cents,
      is_active: plan.is_active,
    });
    setIsModalOpen(true);
  };

  // Handle delete plan
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this membership plan?')) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  // Toggle plan status
  const togglePlanStatus = (id) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, is_active: !plan.is_active } : plan
    ));
  };

  // Filter plans based on search term
  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format price in dollars
  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Membership Plans</h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search plans..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentPlan(null);
              setFormData({
                name: '',
                description: '',
                duration_days: 30,
                price_cents: 0,
                is_active: true,
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Plan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPrice(plan.price_cents)}
                    <span className="text-sm font-normal text-gray-500"> / {plan.duration_days} days</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(plan.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    <FaEdit className="inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => togglePlanStatus(plan.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      plan.is_active 
                        ? 'bg-red-100 hover:bg-red-200 text-red-800' 
                        : 'bg-green-100 hover:bg-green-200 text-green-800'
                    }`}
                  >
                    {plan.is_active ? (
                      <><FaTimes className="inline mr-1" /> Deactivate</>
                    ) : (
                      <><FaCheck className="inline mr-1" /> Activate</>
                    )}
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="w-full text-red-600 hover:text-red-800 text-sm font-medium py-2"
                  >
                    <FaTrash className="inline mr-1" /> Delete Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No membership plans found. Create your first plan to get started.
          </div>
        )}
      </div>

      {/* Add/Edit Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {currentPlan ? 'Edit Membership Plan' : 'Add New Membership Plan'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                    <input
                      type="number"
                      name="duration_days"
                      min="1"
                      value={formData.duration_days}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="price_cents"
                        min="0"
                        step="0.01"
                        value={(formData.price_cents / 100).toFixed(2)}
                        onChange={(e) => {
                          const value = Math.round(parseFloat(e.target.value) * 100) || 0;
                          setFormData(prev => ({ ...prev, price_cents: value }));
                        }}
                        className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
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
                    Active Plan
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
                  {currentPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembershipPlans;