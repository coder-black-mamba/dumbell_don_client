import React from 'react'
import { Route, Routes } from 'react-router'
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
import DashboardLayout from '../layouts/DashboardLayout'
import MyProfile from '../components/dashboard/MyProfile'
import Invoices from '../components/dashboard/Invoices'
import Stats from '../components/dashboard/Stats'
import Payments from '../components/dashboard/Payments'
import ClassesDashboard from '../components/dashboard/ClassesDashboard'
import Attendence from '../components/dashboard/Attendence'

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
    </Routes>
  )
}

export default AppRoutes