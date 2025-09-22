import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router'
import { AdminRoute, MemberRoute, StaffRoute , AuthenticatedRoute } from '../components/common/ProtectedRoute'
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
import AdminStaffMembershipPlans from '../components/AdminStaffCommon/AdminStaffMembershipPlans'
import AdminBookings from '../components/AdminDashboard/AdminBookings'
import AdminAttendences from '../components/AdminDashboard/AdminAttendences'
import AdminPayments from '../components/AdminDashboard/AdminPayments'
import AdminInvoices from '../components/AdminDashboard/AdminInvoices'
import AdminFeedback from '../components/AdminDashboard/AdminFeedback'
import Report from '../components/AdminDashboard/Report'
import StaffBookings from '../components/StaffDashboard/StaffBookings'
import StaffUsers from '../components/StaffDashboard/StaffUsers'
import StaffFeedback from '../components/StaffDashboard/StaffFeedback'
import Unauthorized from '../components/common/Unauthorized'
import NotFound from '../components/common/NotFound'
import Dashboard from '../pages/Dashboard'
import LogOut from '../pages/LogOut'
import Reviews from '../pages/Reviews'
import RsetPasswordConfirm from '../pages/RsetPasswordConfirm'
import SentEmailSuccess from '../pages/SentEmailSuccess'
import ActivateAccount from '../pages/ActivateAccount'
import SingleClassPage from '../pages/SingleClassPage'
import RegistrationSuccessfull from '../pages/RegistrationSuccessfull'
import InitiateBookingPayment from '../pages/InitiateBookingPayment'
import InitiateSubscriptionPayment from '../pages/InitiateSubscriptionPayment'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentCancel from '../pages/PaymentCancel'
import PaymentFail from '../pages/PaymentFail'
import DownloadRecipt from '../pages/DownloadRecipt'
import ConfirmSubscription from '../pages/ConfirmSubscription'
import DownloadInvoice from '../pages/DownloadInvoice'
import MemberDetails from '../components/StaffDashboard/MemberDetails'
import EditClass from '../components/AdminStaffCommon/EditClass'
import AdminStaffClasses from '../components/AdminStaffCommon/AdminStaffClasses'
import AddClass from '../components/AdminStaffCommon/AddClass'
import AddPlan from '../components/AdminStaffCommon/AddPlan'
import EditPlan from '../components/AdminStaffCommon/EditPlan'


function AppRoutes() {
  return (
    <Routes>
        <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:id" element={<SingleClassPage />} />
            <Route path="/registration-successfull" element={
              <AuthenticatedRoute>
                <RegistrationSuccessfull />
              </AuthenticatedRoute>
            } />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/subscriptions" element={<Pricing />} />
            <Route path="/subscriptions/:id" element={
              <AuthenticatedRoute>
                <ConfirmSubscription />
              </AuthenticatedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/sent-email-success" element={<SentEmailSuccess />} />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/confirm/:uid/:token" element={<RsetPasswordConfirm />} />
            <Route path="/activation-email-successfull" element={<ActivationEmailSuccessfull />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/payment/initiate/booking" element={
              <AuthenticatedRoute>
                <InitiateBookingPayment />
              </AuthenticatedRoute>
            } />
            <Route path="/payment/initiate/subscription" element={
              <AuthenticatedRoute>
                <InitiateSubscriptionPayment />
              </AuthenticatedRoute>
            } />
            <Route path="/payment/success/:id" element={
                 <PaymentSuccess />
             } />
            <Route path="/payment/cancel" element={
                 <PaymentCancel />
             } />
            <Route path="/payment/fail" element={
                 <PaymentFail />
             } />
            <Route path="/download-receipt" element={
                 <DownloadRecipt />
             } />
            <Route path="/download-invoice" element={
                 <DownloadInvoice />
             } />
            <Route path="*" element={<NotFound />} />
        </Route>
        {/* dashboard routes */}
        <Route path='/user/*' element={
          <MemberRoute>
            <DashboardLayout />
          </MemberRoute>
        }>
          <Route index path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="stats" element={<Stats />} />
          <Route path="payments" element={<Payments />} />
          <Route path="classes" element={<ClassesDashboard />} />
          <Route path="attendence" element={<Attendence />} />
          <Route path="*" element={<NotFound />} />
        </Route>

       

        {/* Staff routes */}
        <Route path="/staff/*" element={
          <StaffRoute>
            <StaffDashboardLayout />
          </StaffRoute>
        }>
          <Route index path="dashboard" element={<StaffDashboard />} />
          <Route path="attendance" element={<AdminAttendences />} />
          <Route path="classes" element={<AdminStaffClasses/>} />
          <Route path="classes/add" element={<AddClass/>} />
          <Route path="classes/edit/:id" element={<EditClass/>} />
          <Route path="plans" element={<AdminStaffMembershipPlans />} />
          <Route path="plans/add" element={<AddPlan/>} />
          <Route path="plans/edit/:id" element={<EditPlan/>} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="bookings" element={<StaffBookings />} />
          <Route path="members" element={<StaffUsers />} />
          <Route path="member/:id" element={<MemberDetails/>} />
          <Route path="feedback" element={<StaffFeedback />} />
          <Route path="*" element={<NotFound />} />
        </Route>


         {/* Admin routes */}
         <Route path="/admin/*" element={
          <AdminRoute>
            <AdminDashboardLayout />
          </AdminRoute>
        }>
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="plans" element={<AdminStaffMembershipPlans />} />
          <Route path="plans/add" element={<AddPlan/>} />
          <Route path="plans/edit/:id" element={<EditPlan/>} />
          <Route path="classes" element={<AdminStaffClasses />} />
          <Route path="classes/add" element={<AddClass/>} />
          <Route path="classes/edit/:id" element={<EditClass/>} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="attendance" element={<AdminAttendences />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="reports" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Route>

    </Routes>
  )
}

export default AppRoutes