import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaEye ,FaEdit,FaTrash} from 'react-icons/fa';
import Loader from '../common/Loader';
import { useNavigate,Link } from 'react-router';
import { authApiClient } from '../../services/apiServices';
import { useAuth } from '../../hooks/useAuth';

// Mock data
const mockUsers = {
  count: 4,
  results: [
    {
      id: 3,
      email: 'rhwhitteker@gmail.com',
      first_name: 'rh',
      last_name: 'whitteker',
      address: 'Bunga',
      phone_number: '+8801313131313',
      role: 'MEMBER',
      profile_picture_url: null,
      join_date: '2025-08-13T10:38:52.660105Z',
    },
    {
      id: 2,
      email: 'sde.sayed24@gmail.com',
      first_name: 'abu',
      last_name: 'sayed',
      address: 'Pundar Par',
      phone_number: '+8801313131313',
      role: 'STAFF',
      profile_picture_url: null,
      join_date: '2025-08-13T10:38:00.701838Z',
    },
    {
      id: 1,
      email: 'admin@gmail.com',
      first_name: 'admin',
      last_name: 'admin',
      address: 'Janina',
      phone_number: '+8801717963289',
      role: 'ADMIN',
      profile_picture_url: null,
      join_date: '2025-08-13T10:37:07.694308Z',
    },
    {
      id: 6,
      email: 'sayed.eeeee.386@gmail.com',
      first_name: 'abu',
      last_name: 'sayed',
      address: 'testing email 2 . you know my app sucks at production',
      phone_number: '+8801717966767',
      role: 'MEMBER',
      profile_picture_url: null,
      join_date: '2025-08-13T11:25:29.288211Z',
    }
  ]
};

const StaffUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const {isAdmin, user} = useAuth();

 
  // Load users
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await authApiClient.get('user-list/');
        const data = response.data;
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);
 

  // View user details  
  const handleViewDetails = (user) => {
    
    isAdmin ? navigate(`/admin/members/${user.id}`, { state: { member:user } }) : navigate(`/staff/members/${user.id}`, { state: { member:user } });
  };

  // Filter only MEMBER role users and apply search
  // const filteredUsers = users
  //   ?.results
  //   ?.filter(user => user.role === 'MEMBER')
  //   .filter(user => 
  //     `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length > 0) {
      const filtered = users?.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phone_number?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'STAFF': return 'bg-blue-100 text-blue-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
       <Loader/>
      </div>
    );
  }
   return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <h1 className="text-2xl font-bold text-gray-200">Member Directory</h1>
        <div className="w-full md:w-auto flex-1 md:flex-none md:ml-4">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="ml-2">
              <button
                onClick={() => navigate('/admin/members/add')}
                className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add New Member
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-300 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-base-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-base-300 divide-y divide-gray-200">
              {filteredUsers?.length > 0 ? (
                filteredUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-base-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.profile_picture_url ? (
                            <img className="h-10 w-10 rounded-full" src={user.profile_picture_url} alt="" />
                          ) : (
                            <FaUser className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-200">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">{user.phone_number}</div>
                      <div className="text-sm text-gray-500">{user.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.join_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 btn hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye className="inline mr-1" /> View
                      </button>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffUsers;