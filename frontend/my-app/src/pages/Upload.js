import React, { useState } from "react";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [distribution, setDistribution] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload/csv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Uploaded! Total tasks: ${data.totalTasks}`);
        setDistribution(data.distribution || []);
      } else {
        setMessage(data.message || "Upload failed.");
        setDistribution([]);
      }
    } catch {
      setMessage("Something went wrong.");
      setDistribution([]);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload CSV</h2>
        <form onSubmit={handleUpload} className="upload-form">
          <label htmlFor="fileInput" className="custom-file-input">
            {file ? file.name : "Choose a CSV or Excel file"}
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden-file-input"
          />
          <button type="submit" className="upload-button">
            Upload
          </button>
        </form>
        {message && <p className="upload-message">{message}</p>}

        {distribution.length > 0 && (
          <div className="distribution-container">
            <h3 className="distribution-title">Task Distribution</h3>
            <ul className="distribution-list">
              {distribution.map((agent, idx) => (
                <li key={idx} className="distribution-item">
                  <strong>{agent.agentName}</strong>: {agent.count} tasks
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
