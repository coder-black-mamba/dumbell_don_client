import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const { user , subscription} = useAuth();
    const [editing , setEditing] = useState(false);
    const navigate = useNavigate();


    const handleEditClick=()=>{
      setEditing((editing)=>!editing);
    }



    return (
    <div className="bg-base-300 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">My Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <FaUser className="text-2xl text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user?.first_name} {user?.last_name}</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Membership Details</h4>
          <div className="bg-base-200 p-4 rounded-md">
            <p><span className="text-gray-600">Plan:</span> {subscription?.plan_title || 'Not Subscribed'}</p>
            <p><span className="text-gray-600">Expires:</span> {subscription?.end_date || 'Not Subscribed'}</p>
          </div>
        </div>
        
        <button onClick={handleEditClick} className="mt-4 px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90">
          Edit Profile
        </button>
      </div>

      {editing && (
        <EditProfile/>
      )}
    </div>
  );
};

export default MyProfile