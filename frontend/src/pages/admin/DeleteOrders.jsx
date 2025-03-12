import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteOrders = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Delete Orders</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b transition-all hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">#12345</td>
              <td className="px-6 py-4 text-gray-600">John Doe</td>
              <td className="px-6 py-4">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">Cancelled</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-red-500 hover:text-red-700 transition-all p-2 rounded-md hover:bg-red-100">
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteOrders;
