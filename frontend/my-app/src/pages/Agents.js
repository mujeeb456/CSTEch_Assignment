import React, { useEffect, useState } from "react";
import "./Agent.css";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const fetchAgents = async () => {
    const res = await fetch("http://localhost:3000/api/agents", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setAgents(data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Agent created successfully!");
      setForm({ name: "", email: "", mobile: "", password: "" });
      fetchAgents();
    } else {
      setMessage(data.message || "Error creating agent.");
    }
  };

  return (
    <div className="agents-container">
      <div className="agents-card">
        <h2 className="agents-title">Agents</h2>

        <form onSubmit={handleSubmit} className="agents-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile (+91...)"
            value={form.mobile}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <button type="submit" className="agents-button">
            Add Agent
          </button>
        </form>

        {message && <p className="agents-message">{message}</p>}

        <div className="table-wrapper">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Agents;
