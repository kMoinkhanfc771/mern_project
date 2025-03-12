import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
