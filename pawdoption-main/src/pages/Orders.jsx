import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    // Fetch orders data from the API
    fetch("http://localhost:8000/api/get-orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <PageNav />
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Amount</th>
            <th>Quantity</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.products}</td>
              <td>{order.total_amount}</td>
              <td>{order.quantity}</td>
              <td>{order.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
