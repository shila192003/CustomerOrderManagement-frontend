import React, { useState } from 'react'
import { useFormState } from 'react-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './addcustomerorder.css';




export default function AddCustomerOrder() {
  const [customer, setCustomer] = useState({
    name: '',
    orders: [{ orderNumber: '', orderDate: '' }],
  });

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrderChange = (index, e) => {
    const newOrders = [...customer.orders];
    newOrders[index][e.target.name] = e.target.value;
    setCustomer({ ...customer, orders: newOrders });
  };

  const addOrderField = () => {
    setCustomer({
      ...customer,
      orders: [...customer.orders, { orderNumber: '', orderDate: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8084/customer/save',
        customer
      );
      alert('Customer added successfully!');
      console.log(response.data);
      setCustomer({ name: '', orders: [{ orderNumber: '', orderDate: '' }] });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Add Customer with Orders</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
              required
            />
          </div>

          <h3>Orders</h3>
          {customer.orders.map((order, index) => (
            <div className="order-block" key={index}>
              <div className="form-group">
                <label>Order Number:</label>
                <input
                  type="text"
                  name="orderNumber"
                  value={order.orderNumber}
                  onChange={(e) => handleOrderChange(index, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Order Date:</label>
                <input
                  type="date"
                  name="orderDate"
                  value={order.orderDate}
                  onChange={(e) => handleOrderChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addOrderField}>
            + Add Another Order
          </button>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
