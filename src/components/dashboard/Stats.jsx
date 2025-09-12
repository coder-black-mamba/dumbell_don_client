import React from 'react'
import DashboardCard from './DashboardCard'
import { FaClipboardCheck, FaCalendarAlt, FaDumbbell } from 'react-icons/fa';

const Stats = () => {
    const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        membership: 'Premium',
        membershipExpiry: '2023-12-31',
      };
    const bookings = [
        { id: 1, class: 'Yoga', date: '2023-05-20', time: '09:00 AM', status: 'Confirmed' },
        { id: 2, class: 'Pilates', date: '2023-05-22', time: '06:00 PM', status: 'Pending' },
      ];
  return (
    <div><div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard 
        icon={<FaClipboardCheck className="text-blue-600" />}
        title="Total Classes"
        value="12"
        color="blue"
      />
      <DashboardCard 
        icon={<FaCalendarAlt className="text-green-600" />}
        title="Upcoming Bookings"
        value={bookings.length}
        color="green"
      />
      <DashboardCard 
        icon={<FaDumbbell className="text-purple-600" />}
        title="Active Membership"
        value={userData.membership}
        color="purple"
      />
    </div>

    <div className="bg-base-300 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Upcoming Bookings</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-2">Class</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Time</th>
              <th className="pb-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="py-3">{booking.class}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div></div>
  )
}

export default Stats