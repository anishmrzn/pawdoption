import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import Chart from "chart.js/auto";

function SalesRecords() {
  const [salesData, setSalesData] = useState([]);
  const token = localStorage.getItem("sellerToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/sales-record/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response.data.sales_data;
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (salesData.length > 0) {
      const months = salesData.map((record) => record.month);
      const totalSales = salesData.map((record) => record.total_sales);
      const ctx = document.getElementById("salesChart").getContext("2d");
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Total Sales",
              data: totalSales,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [salesData]);

  return (
    <Layout>
      <div className="container mx-auto p-4 text-center my-20">
        <h1 className="text-3xl font-semibold mb-4">Sales Records Overview</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <p className="text-lg font-semibold">
              This graph represents the monthly total sales over time.
            </p>
          </div>
          <div className="flex justify-center items-center w-[20rem] md:w-[40rem] lg:w-[50rem] mx-auto">
            <canvas id="salesChart"></canvas>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SalesRecords;
