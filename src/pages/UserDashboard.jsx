import React, { useState } from 'react';
import Stats from '../components/dashboard/Stats';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    membership: 'Premium',
    membershipExpiry: '2023-12-31',
  };

  const attendance = [
    { id: 1, date: '2023-05-15', class: 'Yoga', status: 'Present' },
    { id: 2, date: '2023-05-10', class: 'HIIT', status: 'Present' },
  ];

  const bookings = [
    { id: 1, class: 'Yoga', date: '2023-05-20', time: '09:00 AM', status: 'Confirmed' },
    { id: 2, class: 'Pilates', date: '2023-05-22', time: '06:00 PM', status: 'Pending' },
  ];


  return (
    <div className="min-h-screen bg-base-200">
          
          {/* Main Content */}
          <div className="flex-1">
            <Stats />
           </div>
    </div>
  );
};

export default UserDashboard;