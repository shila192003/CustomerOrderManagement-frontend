import React from 'react'


import './dashboard.css'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AdminCustomerList from './AdminCustomerList';


export default function AdminDashBoard() {
    return (
        <div className="flex">
          <Navbar />
          <Sidebar />
          <div className=" content flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4">Customer Order Management</h1>
            <AdminCustomerList />
          </div>
        </div>
      );
}
