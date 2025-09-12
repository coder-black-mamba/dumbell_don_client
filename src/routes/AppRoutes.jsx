import React from 'react'
import { Route, Routes } from 'react-router'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ClassesPage from '../pages/ClassesPage'
import Trainers from '../pages/Trainers'
import Pricing from '../pages/Pricing'
import Contact from '../pages/Contact'

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
        </Route>
    </Routes>
  )
}

export default AppRoutes