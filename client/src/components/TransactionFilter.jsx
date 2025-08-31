import React, { useState } from "react";

const TransactionFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onFilter({ startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 items-end">
      <div className="flex flex-col">
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-1 rounded" />
      </div>
      <div className="flex flex-col">
        <label>End Date</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-1 rounded" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Filter</button>
    </form>
  );
};

export default TransactionFilter;
