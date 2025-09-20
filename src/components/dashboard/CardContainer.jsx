import React, { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { FaClipboardCheck, FaCalendarAlt, FaDumbbell } from "react-icons/fa";
import {authApiClient} from "../../services/apiServices";

const CardContainer = () => {
    const [subscription, setSubscription] = useState([]);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {

        const fetchMembership = async () => {
            const response = await authApiClient.get("/subscriptions/");
            console.log(response.data.data.results)
            const subscriptionsData=response.data.data.results;
            const today = new Date();
            const selectedSubscription = subscriptionsData.find((subscription) => {
                const startDate = new Date(subscription.start_date);
                const endDate = new Date(subscription.end_date);
                return (
                    startDate <= today &&
                    endDate >= today &&
                    subscription.status === "ACTIVE"
                );
            });
            setSubscription(selectedSubscription || []);
            console.log(selectedSubscription)
            
            
        };
        fetchMembership();

        const fetchBookings = async () => {
            const response = await authApiClient.get("/bookings/");
            console.log(response.data.data.results) 
        };
        fetchBookings();
        
    }, []);
         console.log(subscription);
  return (
    <div>
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
          value={"userData.membership"}
          color="purple"
        />
      </div>
    </div>
  );
};

export default CardContainer;
