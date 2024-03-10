import React, { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetch("http://localhost:8000/api/get-orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      });
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
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white shadow-lg table-auto">
              <thead className="bg-[#c9a687] text-white">
                <tr>
                  <th className="py-3 px-6 text-left border-r">Product</th>
                  <th className="py-3 px-6 text-left border-r">Name</th>
                  <th className="py-3 px-6 text-left border-r">Price</th>
                  <th className="py-3 px-6  border-r text-center">
                    Delivery Status
                  </th>
                  <th className="py-3 px-6">Date Bought</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <React.Fragment key={order.orderId}>
                    <tr
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-4 px-6 border-r flex flex-col items-center justify-center">
                        {order.products.map((product, productIndex) => (
                          <div key={product.productName}>
                            {productIndex !== 0 && <div className="mt-2"></div>}
                            <img
                              src={product.productImgUrl}
                              alt="orderimg"
                              className="h-[3rem]"
                            />
                          </div>
                        ))}
                      </td>
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
                            {productIndex !== 0 && <div className="mt-2"></div>}
                            Rs {product.discounted.toFixed(2)}{" "}
                          </div>
                        ))}
                      </td>
                      {order.delivery_status === "pending" ? (
                        <td className=" border-r flex items-center  justify-center mt-3 ">
                          <div className="text-center bg-gray-400 rounded-full w-[10rem] py-1 text-white font-bold">
                            {order.delivery_status}
                          </div>
                        </td>
                      ) : (
                        <td className="flex items-center  justify-center mt-3 border-r">
                          <div className="text-center bg-green-600 rounded-full w-[10rem] py-1 text-white font-bold">
                            {order.delivery_status}
                          </div>
                        </td>
                      )}
                      <td className="py-4 px-6">{order.created}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot className="bg-[#c9a687] text-white">
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-6 text-right font-bold border-r"
                  >
                    Total Price:
                  </td>
                  <td className="py-3 px-6 text-left font-bold">
                    Rs {totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Orders;
