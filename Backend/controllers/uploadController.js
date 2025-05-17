const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Task = require("../models/Task");
const Agent = require("../models/Agent");

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;
    const fileExt = path.extname(file.name).toLowerCase();

    if (![".csv", ".xlsx", ".xls"].includes(fileExt)) {
      return res.status(400).json({
        message: "Invalid file type. Only CSV, XLSX, and XLS files are allowed",
      });
    }

    if (fileExt !== ".csv") {
      return res.status(400).json({
        message: "Excel file support coming soon. Please upload a CSV file.",
      });
    }

    const results = [];
    const fileData = file.data.toString();

    await new Promise((resolve, reject) => {
      require("stream")
        .Readable.from(fileData)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", resolve)
        .on("error", reject);
    });

    const isValid = results.every(
      (row) => row.FirstName && row.Phone && row.Notes !== undefined
    );

    if (!isValid || results.length === 0) {
      return res.status(400).json({
        message: "Invalid CSV format. Required fields: FirstName, Phone, Notes",
      });
    }

    const agents = await Agent.find().select("_id");
    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents available" });
    }

    const tasksPerAgent = Math.floor(results.length / agents.length);
    let remainingTasks = results.length % agents.length;
    let currentAgentIndex = 0;
    let tasksAssigned = 0;

    const tasksToCreate = [];

    for (const item of results) {
      const agentId = agents[currentAgentIndex]._id;

      tasksToCreate.push({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
        assignedTo: agentId,
      });

      tasksAssigned++;

      if (tasksAssigned >= tasksPerAgent + (remainingTasks > 0 ? 1 : 0)) {
        if (remainingTasks > 0) remainingTasks--;
        currentAgentIndex = (currentAgentIndex + 1) % agents.length;
        tasksAssigned = 0;
      }
    }

    await Task.insertMany(tasksToCreate);

    const distributionSummary = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "agents",
          localField: "_id",
          foreignField: "_id",
          as: "agent",
        },
      },
      {
        $unwind: "$agent",
      },
      {
        $project: {
          agentId: "$_id",
          agentName: "$agent.name",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      message: "File uploaded and tasks distributed successfully",
      totalTasks: results.length,
      distribution: distributionSummary,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
};
