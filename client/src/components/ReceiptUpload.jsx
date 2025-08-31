import React, { useState } from "react";
import API from "../api/api";

const ReceiptUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      // If backend expects JSON path, replace accordingly
      await API.post("/receipts", { filePath: file.name }); 
      alert("Receipt uploaded!");
      setFile(null);
      onUpload(); // Refresh transactions or receipts
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Upload Receipt</h3>
      <form onSubmit={handleUpload} className="flex flex-col gap-2">
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading} className="bg-blue-500 text-white p-2 rounded">
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ReceiptUpload;
