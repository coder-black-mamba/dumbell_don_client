import React from 'react'
import { Route, Routes } from 'react-router'
import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../pages/HomePage'

function AppRoutes() {
  return (
    <Routes>
        <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes