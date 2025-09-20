import React from "react";
import { FaClipboardCheck, FaCalendarAlt, FaDumbbell } from "react-icons/fa";
import CardContainer from "./CardContainer";

const Stats = () => {
  const bookings = [
    {
      id: 1,
      class: "Yoga",
      date: "2023-05-20",
      time: "09:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      class: "Pilates",
      date: "2023-05-22",
      time: "06:00 PM",
      status: "Pending",
    },
  ];
  return (
    <div>
      <div className="space-y-6">
        <CardContainer />

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
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
