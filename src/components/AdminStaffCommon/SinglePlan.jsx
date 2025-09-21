import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const SinglePlan = ({ plan }) => { 

    const navigate = useNavigate();
    const {isAdmin} = useAuth()


  const handleEdit = (plan) => {
    isAdmin?navigate(`/admin/plans/edit/${plan.id}`, {state: {plan}}):navigate(`/staff/plans/edit/${plan.id}`, {state: {plan}});
  };

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };
  return (
    <div
      key={plan.id}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              plan.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {plan.is_active ? "Active" : "Inactive"}
          </span>
        </div>
        <p className="text-gray-600 flex-grow">{plan.description}</p>
        
        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(plan.price_cents)}
            <span className="text-sm font-normal text-gray-500">
              / {plan.duration_days} days
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Created: {new Date(plan.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleEdit(plan)}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <FaEdit className="mr-2" /> Edit Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlan;
