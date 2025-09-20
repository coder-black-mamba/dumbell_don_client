import React, { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { FaClipboardCheck, FaCalendarAlt, FaDumbbell } from "react-icons/fa";


const CardContainer = ({ subscription, bookings }) => {
  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            icon={<FaClipboardCheck className="text-blue-600" />}
            title="Total Classes"
            value={bookings.length}
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
            value={subscription?.plan_title || "No Membership"}
            color="purple"
          />
      </div>
    </div>
  );
};

export default React.memo(CardContainer);
