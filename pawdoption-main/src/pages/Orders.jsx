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
        <table className="w-3/4 mx-auto bg-white  shadow-2xl">
          <thead>
            <tr className="bg-[#c9a687]">
              <th className="py-3 px-6 text-center border-r border-gray-300 rounded-tl-md">
                Product Name
              </th>
              <th className="py-3 px-6 text-center border-r border-gray-300">
                Price
              </th>
              <th className="py-3 px-6 text-center border-r border-gray-300">
                Delivery Status
              </th>
              <th className="py-3 px-6 text-center rounded-tr-md">
                Date Bought
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td className="py-4 px-6 border-r text-center border-gray-300 rounded-bl-md">
                    {order.products.map((product) => (
                      <div key={product.productName}>{product.productName}</div>
                    ))}
                  </td>
                  <td className="py-4 px-6 border-r text-center border-gray-300">
                    {order.products.map((product) => (
                      <div key={product.productName}>
                        $ {product.discounted}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 border-r text-center border-gray-300">
                    {order.delivery_status}
                  </td>
                  <td className="py-4 px-6 text-center rounded-br-md">
                    {order.created}
                  </td>
                </tr>
                {index !== orders.length - 1 && (
                  <tr className="border-t border-gray-300"></tr>
                )}
              </React.Fragment>
            ))}

            <tr className="bg-[#c9a687]">
              <td
                colSpan="3"
                className="py-3 px-6 text-right font-bold border-r border-gray-300 rounded-bl-md"
              >
                Total Price:
              </td>
              <td className="py-3 px-6 text-center font-bold rounded-br-md">
                $ {totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
