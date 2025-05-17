const express = require("express");
const router = express.Router();
const { addAgent, getAllAgents } = require("../controllers/agentController");
const authMiddleware = require("../middleware/authMiddleware");
const agentController = require("../controllers/agentController");
router.post("/", authMiddleware, addAgent);
router.get("/", authMiddleware, getAllAgents);
router.get("/:agentId/tasks", agentController.getAgentTasks);

module.exports = router;
