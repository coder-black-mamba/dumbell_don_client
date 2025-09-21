import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaEye } from 'react-icons/fa';
import MemberDetailsModal from './MemberDetails';

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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    role: 'MEMBER',
  });

  // Load users
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers.results);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // View user details
  const handleViewDetails = (user) => {
    setCurrentUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  // Filter only MEMBER role users and apply search
  const filteredUsers = users
    .filter(user => user.role === 'MEMBER')
    .filter(user => 
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200 mb-4 md:mb-0">Member Directory</h1>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
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
                          <div className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone_number}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 hover:text-blue-900"
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

      {/* View User Details Modal */}
      {isModalOpen && currentUser && (
        <MemberDetailsModal currentUser={currentUser} setIsModalOpen={setIsModalOpen}/>
      )}
    </div>
  );
};

export default StaffUsers;