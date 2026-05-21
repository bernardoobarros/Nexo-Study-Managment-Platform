const express = require("express");
const { createDatabase, createRepository, databasePath } = require("./db");

function createApp() {
  const db = createDatabase();
  const repository = createRepository(db);
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      databasePath,
    });
  });

  app.get("/api/assignments", (_req, res) => {
    res.json({
      assignments: repository.listAssignments(),
    });
  });

  app.get("/api/assignments/:id", (req, res) => {
    const assignment = repository.getAssignmentById(req.params.id);

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found." });
      return;
    }

    res.json({ assignment });
  });

  app.post("/api/assignments/:id/summarize", (req, res) => {
    const assignment = repository.getAssignmentById(req.params.id);

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found." });
      return;
    }

    res.status(501).json({
      error: "LLM summarization is not wired yet.",
      assignmentId: assignment.id,
    });
  });

  app.post("/api/assignments/:id/plan", (req, res) => {
    const assignment = repository.getAssignmentById(req.params.id);

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found." });
      return;
    }

    res.status(501).json({
      error: "Planner generation is not wired yet.",
      assignmentId: assignment.id,
    });
  });

  app.post("/api/assignments/:id/chat", (req, res) => {
    const assignment = repository.getAssignmentById(req.params.id);

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found." });
      return;
    }

    res.status(501).json({
      error: "Grounded chat is not wired yet.",
      assignmentId: assignment.id,
    });
  });

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3001);
  const app = createApp();

  app.listen(port, () => {
    console.log(`Nexo prototype API listening on http://localhost:${port}`);
  });
}

module.exports = { createApp };
