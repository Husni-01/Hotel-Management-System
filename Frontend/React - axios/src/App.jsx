import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppLayout from './components/AppLayout.jsx';
// screens
import LoginPage from './pages/LoginPage.jsx';
import AdminHotelsPage from './pages/AdminHotelsPage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/login" element={<LoginPage />} />
        {/* admin - all hotels */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHotelsPage />
            </ProtectedRoute>
          }
        />
        {/* hotel details */}
        <Route
          path="/admin/hotels/:hotelId"
          element={
            <ProtectedRoute>
              <HotelDetailsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
