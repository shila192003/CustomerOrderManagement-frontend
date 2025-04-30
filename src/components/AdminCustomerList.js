import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function AdminCustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8084/customer/getAll')
        .then(response => {
          setCustomers(response.data);
          console.log('API response:', response.data);
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Customer List with Orders</h2>
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Customer ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td className="border px-4 py-2">{customer.id}</td>
                <td className="border px-4 py-2">{customer.name}</td>
                <td className="border px-4 py-2">
                  {customer.orders && customer.orders.length > 0 ? (
                    <table className="w-full table-auto border mt-2">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">Order ID</th>
                          <th className="border px-2 py-1">Order Number</th>
                          <th className="border px-2 py-1">Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.orders.map(order => (
                          <tr key={order.orderId}>
                            <td className="border px-2 py-1">{order.orderId}</td>
                            <td className="border px-2 py-1">{order.orderNumber}</td>
                            <td className="border px-2 py-1">{order.orderDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <span>No Orders</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
