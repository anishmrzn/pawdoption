import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

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
  }, [token]);

  const totalPrice = orders.reduce(
    (acc, order) =>
      acc +
      order.products.reduce(
        (productAcc, product) => productAcc + product.discounted,
        0
      ),
    0
  );

  return (
    <div className="container mx-auto p-8">
      <PageNav />
      <h2 className="text-3xl font-semibold mb-10 mt-10 text-center">
        My Orders
      </h2>
      <div className="overflow-x-auto mb-20">
        <table className="w-full bg-white shadow-lg table-auto">
          <thead className="bg-[#c9a687] text-white">
            <tr>
              <th className="py-3 px-6 text-left border-r">Product Name</th>
              <th className="py-3 px-6 text-left border-r">Price</th>
              <th className="py-3 px-6 text-left border-r">Delivery Status</th>
              <th className="py-3 px-6 text-left">Date Bought</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order.orderId}>
                <tr className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-4 px-6 border-r">
                    {order.products.map((product, productIndex) => (
                      <div key={product.productName}>
                        {productIndex !== 0 && <div className="mt-2"></div>}
                        {product.productName}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 border-r text-left">
                    {order.products.map((product, productIndex) => (
                      <div key={product.productName}>
                        {productIndex !== 0 && <div className="mt-2"></div>}${" "}
                        {product.discounted}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 border-r">
                    {order.delivery_status}
                  </td>
                  <td className="py-4 px-6">{order.created}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
          <tfoot className="bg-[#c9a687] text-white">
            <tr>
              <td
                colSpan="3"
                className="py-3 px-6 text-right font-bold border-r"
              >
                Total Price:
              </td>
              <td className="py-3 px-6 text-left font-bold">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
