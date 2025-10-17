import React from "react";
import { Route } from "react-router";
import { AdminRoute } from "../components/common/ProtectedRoute";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

import AdminDashboard from "../pages/AdminDashboard";
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
import AddMember from "../components/AdminDashboard/AddMember.jsx";
import EditMember from "../components/AdminDashboard/EditMember.jsx";
import AddBooking from "../components/AdminDashboard/AddBooking.jsx";
import EditBooking from "../components/AdminDashboard/EditBooking.jsx";
import AdminPayments from "../components/AdminDashboard/AdminPayments.jsx";
import AdminInvoices from "../components/AdminDashboard/AdminInvoices.jsx";
import Report from "../components/AdminDashboard/Report.jsx";
import NotFound from "../components/common/NotFound";

const AdminRoutes = () => (
  <>
  <Route
    path="/admin/*"
    element={
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    }
  >
    <Route index path="dashboard" element={<AdminDashboard />} />
    <Route path="members" element={<AdminStaffMembers />} />
    <Route path="members/add" element={<AddMember />} />
    <Route path="members/:id" element={<MemberDetails />} />
    <Route path="members/edit/:id" element={<EditMember />} />
    <Route path="plans" element={<AdminStaffMembershipPlans />} />
    <Route path="plans/add" element={<AddPlan />} />
    <Route path="plans/edit/:id" element={<EditPlan />} />
    <Route path="classes" element={<AdminStaffClasses />} />
    <Route path="classes/add" element={<AddClass />} />
    <Route path="classes/edit/:id" element={<EditClass />} />
    <Route path="bookings" element={<AdminStaffBookings />} />
    <Route path="bookings/add" element={<AddBooking />} />
    <Route path="bookings/edit/:id" element={<EditBooking />} />
    <Route path="bookings/:id" element={<SingleBookingView />} />
    <Route path="attendance" element={<AdminStaffAttendences />} />
    <Route path="attendance/add" element={<AddAttendence />} />
    <Route path="payments" element={<AdminPayments />} />
    <Route path="invoices" element={<AdminInvoices />} />
    <Route path="feedback" element={<AdminStaffFeedback />} />
    <Route path="reports" element={<Report />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</>
);

export default AdminRoutes;
