import React from "react";
import { Route } from "react-router";
import { StaffRoute } from "../components/common/ProtectedRoute";
import StaffDashboardLayout from "../layouts/StaffDashboardLayout";

import StaffDashboard from "../pages/StaffDashboard";
// ----- Admin & Staff Common Components -----
import AdminStaffAttendences from "../components/AdminStaffCommon/AdminStaffAttendences.jsx";
import AddAttendence from "../components/AdminStaffCommon/AddAttendence.jsx";
import AdminStaffClasses from "../components/AdminStaffCommon/AdminStaffClasses.jsx";
import AddClass from "../components/AdminStaffCommon/AddClass.jsx";
import EditClass from "../components/AdminStaffCommon/EditClass.jsx";
import AdminStaffMembershipPlans from "../components/AdminStaffCommon/AdminStaffMembershipPlans.jsx";
import AddPlan from "../components/AdminStaffCommon/AddPlan.jsx";
import EditPlan from "../components/AdminStaffCommon/EditPlan.jsx";
import AdminStaffMembers from "../components/AdminStaffCommon/AdminStaffMembers.jsx";
import MemberDetails from "../components/AdminStaffCommon/MemberDetails.jsx";
import AdminStaffBookings from "../components/AdminStaffCommon/AdminStaffBookings.jsx";
import SingleBookingView from "../components/AdminStaffCommon/SingleBookingView.jsx";
import AdminStaffFeedback from "../components/AdminStaffCommon/AdminStaffFeedback.jsx";
import MyProfile from "../components/dashboard/MyProfile";
import NotFound from "../components/common/NotFound";

const StaffRoutes = () => (
  <Route
    path="/staff/*"
    element={
      <StaffRoute>
        <StaffDashboardLayout />
      </StaffRoute>
    }
  >
    <Route index path="dashboard" element={<StaffDashboard />} />
    <Route path="attendance" element={<AdminStaffAttendences />} />
    <Route path="attendance/add" element={<AddAttendence />} />
    <Route path="classes" element={<AdminStaffClasses />} />
    <Route path="classes/add" element={<AddClass />} />
    <Route path="classes/edit/:id" element={<EditClass />} />
    <Route path="plans" element={<AdminStaffMembershipPlans />} />
    <Route path="plans/add" element={<AddPlan />} />
    <Route path="plans/edit/:id" element={<EditPlan />} />
    <Route path="profile" element={<MyProfile />} />
    <Route path="bookings" element={<AdminStaffBookings />} />
    <Route path="bookings/:id" element={<SingleBookingView />} />
    <Route path="members" element={<AdminStaffMembers />} />
    <Route path="members/:id" element={<MemberDetails />} />
    <Route path="feedback" element={<AdminStaffFeedback />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default StaffRoutes;
