import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateCustomerOrders() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8084/customer/getAll')
            .then((res) => setCustomers(res.data))
            .catch(() => setMessage('Failed to fetch customers'));
    }, []);

    const handleSelect = (e) => {
        const id = e.target.value;
        const customer = customers.find(c => c.id === parseInt(id));
        setSelectedCustomer({ ...customer });
    };

    const handleNameChange = (e) => {
        setSelectedCustomer({ ...selectedCustomer, name: e.target.value });
    };

    const handleOrderChange = (index, field, value) => {
        const updatedOrders = [...selectedCustomer.orders];
        updatedOrders[index][field] = value;
        setSelectedCustomer({ ...selectedCustomer, orders: updatedOrders });
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:8084/customer/updateCustomer/${selectedCustomer.id}`, selectedCustomer)
            .then(() => {
                setMessage('Customer updated successfully');
                setTimeout(() => navigate('/admin-dashboard'), 1000);
            })
            .catch(() => setMessage('Failed to update customer'));
    };

    return (
        <div className="container mt-5 ">
            <h3>Update Customer Info</h3>
            {message && <p>{message}</p>}

            <select onChange={handleSelect} defaultValue="">
                <option value="">-- Select Customer --</option>
                {customers.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.id} - {c.name}
                    </option>
                ))}
            </select>

            {selectedCustomer && (
                <>
                    <div>
                        <input
                            type="text"
                            value={selectedCustomer.name}
                            onChange={handleNameChange}
                            placeholder="Customer Name"
                        />
                    </div>

                    {selectedCustomer.orders.map((order, i) => (
                        <div key={i}>
                            <input
                                type="text"
                                value={order.orderNumber}
                                onChange={e => handleOrderChange(i, 'orderNumber', e.target.value)}
                                placeholder="Order Number"
                            />
                            <input
                                type="date"
                                value={order.orderDate}
                                onChange={e => handleOrderChange(i, 'orderDate', e.target.value)}
                            />

                            
                        </div>
                    ))}

                    <button className="btn btn-success mt-3" onClick={handleUpdate}>Update Customer</button>
                </>
            )}
        </div>
    );
}
