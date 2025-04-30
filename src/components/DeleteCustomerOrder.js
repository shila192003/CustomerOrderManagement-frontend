

import React, { useEffect, useState } from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function DeleteCustomerOrder() {
    const [customers, setCustomers] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch customer data from the backend
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:8084/customer/getAll') // Adjust this URL if needed
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                setMessage('Failed to fetch customers');
            });
    };

    // Handle delete customer by ID
    const handleDelete = () => {
        if (!selectedId) {
            setMessage('Please select a customer ID');
            return;
        }

        axios.delete(`http://localhost:8084/customer/deleteCustomer/${selectedId}`)
            .then(() => {
                setMessage(`Customer with ID ${selectedId} deleted successfully`);
                // Remove deleted customer from the list
                setCustomers(customers.filter((customer) => customer.id !== parseInt(selectedId)));
                setSelectedId(''); // Reset the selected ID

                // Redirect to Dashboard
                navigate('/admin-dashboard'); // This will take you to the '/dashboard' route
            })
            .catch(() => {
                setMessage(`Failed to delete customer with ID ${selectedId}`);
            });
    };

    return (
        <div className="container mt-5">
            <h2>Delete Customer</h2>
            {message && <p className="alert alert-info">{message}</p>}

            <div className="form-group">
                <label htmlFor="customerId">Select Customer ID</label>
                <select
                    id="customerId"
                    className="form-control"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                >
                    <option value="">-- Select a customer --</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.id} - {customer.name} {/* You can display more details here */}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleDelete} className="btn btn-danger mt-3">
                Delete Customer
            </button>
        </div>
    );
}
