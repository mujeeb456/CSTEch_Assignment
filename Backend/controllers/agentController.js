const Agent = require("../models/Agent");

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Agent already exists." });
    }

    const agent = new Agent({ name, email, mobile, password });
    await agent.save();

    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (error) {
    console.error("Add Agent error:", error);
    res.status(500).json({ message: "Server error while adding agent." });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.status(200).json(agents);
  } catch (error) {
    console.error("Fetch Agents error:", error);
    res.status(500).json({ message: "Server error while fetching agents." });
  }
};
exports.getAgentTasks = async (req, res) => {
  try {
    const { agentId } = req.params;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const tasks = await Task.find({ assignedTo: agentId })
      .select("-__v")
      .lean();

    res.status(200).json({
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
      tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Get Agent Tasks error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching agent tasks" });
  }
};
