import React from 'react'

  const DashboardCard = ({ icon, title, value, color = 'blue' }) => (
    <div className="bg-base-300 p-4 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-2 rounded-full bg-white`}>
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );


export default DashboardCard