import React, { useState, useEffect } from "react";
import API from "../api/api";
import ReceiptUpload from "./ReceiptUpload";
import TransactionFilter from "./TransactionFilter";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTransactions(res.data);
      setFilteredTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = ({ startDate, endDate }) => {
    const filtered = transactions.filter(t => {
      const tDate = new Date(t.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || tDate >= start) && (!end || tDate <= end);
    });
    setFilteredTransactions(filtered);
  };

  // Summary by category
  const summary = filteredTransactions.reduce((acc, t) => {
    const name = t.Category?.name || "Unknown";
    if (!acc[name]) acc[name] = 0;
    acc[name] += parseFloat(t.amount);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(summary),
    datasets: [
      {
        label: "Expense / Income",
        data: Object.values(summary),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Upload Receipts */}
      <ReceiptUpload onUpload={fetchTransactions} />

      {/* Filter */}
      <TransactionFilter onFilter={handleFilter} />

      {/* Transactions List */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Transactions</h3>
        {filteredTransactions.map(t => (
          <div key={t.id} className="border p-2 my-2 rounded">
            <p><strong>{t.Category?.name || "Unknown"}</strong>: {t.type} ₹{t.amount}</p>
            <p>{t.description}</p>
            <p>Date: {new Date(t.date).toLocaleDateString()}</p>
            {t.Receipt?.filePath && <p>Receipt: {t.Receipt.filePath}</p>}
          </div>
        ))}
      </div>

      {/* Category Summary Chart */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Summary by Category</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Transactions;
