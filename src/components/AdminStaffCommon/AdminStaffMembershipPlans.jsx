import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import SinglePlan from './SinglePlan';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { authApiClient } from '../../services/apiServices';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../common/Loader';



const AdminStaffMembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([])
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null)


  const navigate = useNavigate();
  const {isAdmin} = useAuth();

  // Load plans
  useEffect(() => {
    const fetchPlans=async ()=>{
      try {
        setLoading(true)
        const response = await authApiClient.get("membership-plans/");
        setPlans(response.data)
        setFilteredPlans(response.data)
        setLoading(false)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    fetchPlans()
  }, []);



  // handle add plan
  const handleAddPlan = () => {
    isAdmin?navigate("/admin/plans/add"):navigate("/staff/plans/add");
  };






  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length > 0) {
      const filtered = plans?.filter((plan) =>
        `${plan.name}`.toLowerCase().includes(value.toLowerCase()) ||
        plan.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(plans);
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <ErrorMessage message={"Something Went Wrong Please Try Again"}/>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200 mb-4 md:mb-0">Membership Plans</h1>
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
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={handleAddPlan}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Plan
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <SinglePlan key={plan.id} plan={plan} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No membership plans found. Create your first plan to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStaffMembershipPlans;