import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ClassesPage from '../pages/ClassesPage'
import Trainers from '../pages/Trainers'
import Pricing from '../pages/Pricing'
import Contact from '../pages/Contact'
import LogInPage from '../pages/LogInPage'
import SignUpPage from '../pages/SignUpPage'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import StaffDashboard from '../pages/StaffDashboard'
import DashboardLayout from '../layouts/DashboardLayout'
import MyProfile from '../components/dashboard/MyProfile'
import Invoices from '../components/dashboard/Invoices'
import Stats from '../components/dashboard/Stats'
import Payments from '../components/dashboard/Payments'
import ClassesDashboard from '../components/dashboard/ClassesDashboard'
import Attendence from '../components/dashboard/Attendence'
import ResetPassword from '../pages/ResetPassword'
import ActivationEmailSuccessfull from '../pages/ActivationEmailSuccessfull'
import EmailVerified from '../pages/EmailVerified'
import AdminDashboardLayout from '../layouts/AdminDashboardLayout'
import StaffDashboardLayout from '../layouts/StaffDashboardLayout'
import AdminUsers from '../components/AdminDashboard/AdminUsers'
import AdminMembershipPlans from '../components/AdminDashboard/AdminMembershipPlans'
import AdminClasses from '../components/AdminDashboard/AdminClasses'
import AdminBookings from '../components/AdminDashboard/AdminBookings'
import AdminAttendences from '../components/AdminDashboard/AdminAttendences'
import AdminPayments from '../components/AdminDashboard/AdminPayments'
import AdminInvoices from '../components/AdminDashboard/AdminInvoices'
import AdminFeedback from '../components/AdminDashboard/AdminFeedback'
import Report from '../components/AdminDashboard/Report'

function AppRoutes() {
  return (
    <Routes>
        <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/activation-email-successfull" element={<ActivationEmailSuccessfull />} />
            <Route path="/email-verified" element={<EmailVerified />} />
        </Route>
        {/* dashboard routes */}
        <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="stats" element={<Stats />} />
            <Route path="payments" element={<Payments />} />
            <Route path="classes" element={<ClassesDashboard />} />
            <Route path="attendence" element={<Attendence />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="memberships" element={<AdminMembershipPlans />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="attendance" element={<AdminAttendences />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="reports" element={<Report />} />
            {/* Add admin specific sub-routes here */}
        </Route>

        {/* Staff routes */}
        <Route path="/staff/*" element={<StaffDashboardLayout />}>
            <Route index element={<StaffDashboard />} />
            {/* Add staff specific sub-routes here */}
        </Route>
    </Routes>
  )
}

export default AppRoutes