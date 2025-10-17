import React from "react";
import { Route } from "react-router";
import { MemberRoute } from "../components/common/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import UserDashboard from "../pages/UserDashboard";
import MyProfile from "../components/dashboard/MyProfile";
import Invoices from "../components/dashboard/Invoices";
import Stats from "../components/dashboard/Stats";
import Payments from "../components/dashboard/Payments";
import ClassesDashboard from "../components/dashboard/ClassesDashboard";
import Attendence from "../components/dashboard/Attendence";
import NotFound from "../components/common/NotFound";

const MemberRoutes = () => (
  <Route
    path="/user/*"
    element={
      <MemberRoute>
        <DashboardLayout />
      </MemberRoute>
    }
  >
    <Route index path="dashboard" element={<UserDashboard />} />
    <Route path="profile" element={<MyProfile />} />
    <Route path="invoices" element={<Invoices />} />
    <Route path="stats" element={<Stats />} />
    <Route path="payments" element={<Payments />} />
    <Route path="classes" element={<ClassesDashboard />} />
    <Route path="attendence" element={<Attendence />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default MemberRoutes;
