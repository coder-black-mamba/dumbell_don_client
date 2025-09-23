import React, { useState, useEffect } from "react";
import { FaClipboardCheck, FaCalendarAlt, FaDumbbell } from "react-icons/fa";
import CardContainer from "./CardContainer";
import { authApiClient } from "../../services/apiServices";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth";

// Format date as 'MMM DD, YYYY' (e.g., 'Sep 20, 2023')
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Format time as 'h:mm A' (e.g., '2:30 PM')
const formatTime = (dateTimeString) => {
  if (!dateTimeString) return "N/A";
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  return new Date(dateTimeString).toLocaleTimeString("en-US", options);
};

const Stats = () => {
  const [bookings, setBookings] = useState([]);
  const [error, seterror] = useState(null);
  const [bookingLoader, setBookingLoader] = useState(true);
  const { user ,fetchMembership} = useAuth();
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    setBookingLoader(true);

    try {
      const fetchBookings = async () => {
        const response = await authApiClient.get("classes/bookings/");
        const bookingsData = response.data.data;
        const today = new Date();
        const filteredBookings = bookingsData.filter((booking) => {
          const bookingDate = new Date(booking.class_data.start_datetime);
          return bookingDate >= today;
        });

        setBookings(filteredBookings);
        setBookingLoader(false);
        const subscriptionData = await fetchMembership();
        setSubscription(subscriptionData);
      };
      fetchBookings();
    } catch (error) {
      console.log(error);
      seterror(error);
      setBookingLoader(false);
    }
  }, []);

  if (bookingLoader) {
    return (
      <div className="flex justify-center items-center min-h-[200px] ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message || "An error occurred"} />;
  }

  return (
    <div>
      <div className="space-y-6">
        <CardContainer subscription={subscription} bookings={bookings} />

        <div className="bg-base-300 p-6 rounded-lg shadow mx-auto">
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
                {bookings.length === 0 && bookingLoader && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center">
                      <div className="flex justify-center items-center w-[80%] mx-auto">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                )}

                {bookings.length === 0 && !bookingLoader && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center">
                      <h3 className="text-lg">No Upcoming Bookings</h3>
                    </td>
                  </tr>
                )}

                {bookings.length > 0 &&
                  bookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-3">{booking.class_data.title}</td>
                      <td>{formatDate(booking.class_data.start_datetime)}</td>
                      <td>{formatTime(booking.class_data.start_datetime)}</td>
                      {/* <td>{booking.time}</td> */}
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

export default React.memo(Stats);
