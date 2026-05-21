const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { seedData } = require("./seed-data");

const dataDirectory = path.join(__dirname, "data");
const databasePath = path.join(dataDirectory, "prototype.sqlite");

function ensureDatabaseDirectory() {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

function createDatabase() {
  ensureDatabaseDirectory();

  const db = new DatabaseSync(databasePath);
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL REFERENCES courses(id),
      title TEXT NOT NULL,
      status TEXT NOT NULL,
      due_at TEXT NOT NULL,
      effort_minutes INTEGER NOT NULL,
      priority_score INTEGER NOT NULL,
      summary TEXT NOT NULL,
      description TEXT NOT NULL,
      deliverable TEXT NOT NULL,
      recommended_next_step TEXT NOT NULL,
      requirements_json TEXT NOT NULL,
      quick_prompts_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS attachments (
      id TEXT PRIMARY KEY,
      assignment_id TEXT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      kind TEXT NOT NULL,
      meta TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS artifacts (
      id TEXT PRIMARY KEY,
      assignment_id TEXT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
      kind TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  seedDatabase(db);
  return db;
}

function seedDatabase(db) {
  const existing = db.prepare("SELECT COUNT(*) AS count FROM assignments").get();
  if ((existing?.count ?? 0) > 0) {
    return;
  }

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, name, code)
    VALUES (@id, @name, @code)
  `);

  const insertAssignment = db.prepare(`
    INSERT INTO assignments (
      id,
      course_id,
      title,
      status,
      due_at,
      effort_minutes,
      priority_score,
      summary,
      description,
      deliverable,
      recommended_next_step,
      requirements_json,
      quick_prompts_json
    )
    VALUES (
      @id,
      @courseId,
      @title,
      @status,
      @dueAt,
      @effortMinutes,
      @priorityScore,
      @summary,
      @description,
      @deliverable,
      @recommendedNextStep,
      @requirementsJson,
      @quickPromptsJson
    )
  `);

  const insertAttachment = db.prepare(`
    INSERT INTO attachments (id, assignment_id, name, kind, meta)
    VALUES (@id, @assignmentId, @name, @kind, @meta)
  `);

  const insertArtifact = db.prepare(`
    INSERT INTO artifacts (id, assignment_id, kind, title, content)
    VALUES (@id, @assignmentId, @kind, @title, @content)
  `);

  db.exec("BEGIN");

  try {
    for (const course of seedData.courses) {
      insertCourse.run(course);
    }

    for (const assignment of seedData.assignments) {
      insertAssignment.run({
        id: assignment.id,
        courseId: assignment.courseId,
        title: assignment.title,
        status: assignment.status,
        dueAt: assignment.dueAt,
        effortMinutes: assignment.effortMinutes,
        priorityScore: assignment.priorityScore,
        summary: assignment.summary,
        description: assignment.description,
        deliverable: assignment.deliverable,
        recommendedNextStep: assignment.recommendedNextStep,
        requirementsJson: JSON.stringify(assignment.requirements),
        quickPromptsJson: JSON.stringify(assignment.quickPrompts),
      });
    }

    for (const attachment of seedData.attachments) {
      insertAttachment.run(attachment);
    }

    for (const artifact of seedData.artifacts) {
      insertArtifact.run(artifact);
    }

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function formatDaysUntilDue(dueAt) {
  const dueDate = new Date(dueAt);
  const now = new Date();
  const dueDay = Date.UTC(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate());
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((dueDay - today) / 86400000);
}

function formatDueLabel(dueAt, daysUntilDue) {
  const options = { month: "short", day: "numeric" };
  const labelDate = new Intl.DateTimeFormat("en-US", options).format(new Date(dueAt));

  if (daysUntilDue < 0) return `Late - due ${labelDate}`;
  if (daysUntilDue === 0) return `Due today - ${labelDate}`;
  if (daysUntilDue === 1) return `Due tomorrow - ${labelDate}`;
  return `Due in ${daysUntilDue} days - ${labelDate}`;
}

function formatStatusLabel(status) {
  switch (status) {
    case "missing":
      return "Missing";
    case "completed":
      return "Completed";
    case "in_progress":
      return "In progress";
    default:
      return "Not started";
  }
}

function formatEffortLabel(minutes) {
  if (minutes < 60) return `${minutes} min estimated`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!remainder) return `${hours}h estimated`;
  return `${hours}h ${remainder}m estimated`;
}

function mapAssignmentRow(row, attachmentCount) {
  const daysUntilDue = formatDaysUntilDue(row.due_at);

  return {
    id: row.id,
    title: row.title,
    courseName: row.course_name,
    courseCode: row.course_code,
    status: row.status,
    statusLabel: formatStatusLabel(row.status),
    summary: row.summary,
    dueAt: row.due_at,
    dueLabel: formatDueLabel(row.due_at, daysUntilDue),
    daysUntilDue,
    effortMinutes: row.effort_minutes,
    effortLabel: formatEffortLabel(row.effort_minutes),
    priorityScore: row.priority_score,
    recommendedNextStep: row.recommended_next_step,
    attachmentCount,
  };
}

function createRepository(db) {
  const listAssignmentsStatement = db.prepare(`
    SELECT
      a.id,
      a.title,
      a.status,
      a.due_at,
      a.effort_minutes,
      a.priority_score,
      a.summary,
      a.recommended_next_step,
      c.name AS course_name,
      c.code AS course_code,
      (
        SELECT COUNT(*) FROM attachments att
        WHERE att.assignment_id = a.id
      ) AS attachment_count
    FROM assignments a
    JOIN courses c ON c.id = a.course_id
    ORDER BY a.priority_score DESC, a.due_at ASC
  `);

  const getAssignmentStatement = db.prepare(`
    SELECT
      a.id,
      a.title,
      a.status,
      a.due_at,
      a.effort_minutes,
      a.priority_score,
      a.summary,
      a.description,
      a.deliverable,
      a.recommended_next_step,
      a.requirements_json,
      a.quick_prompts_json,
      c.name AS course_name,
      c.code AS course_code
    FROM assignments a
    JOIN courses c ON c.id = a.course_id
    WHERE a.id = ?
  `);

  const attachmentsStatement = db.prepare(`
    SELECT id, name, kind, meta
    FROM attachments
    WHERE assignment_id = ?
    ORDER BY name ASC
  `);

  const artifactsStatement = db.prepare(`
    SELECT id, kind, title, content
    FROM artifacts
    WHERE assignment_id = ?
    ORDER BY title ASC
  `);

  return {
    listAssignments() {
      return listAssignmentsStatement.all().map((row) =>
        mapAssignmentRow(row, row.attachment_count),
      );
    },

    getAssignmentById(id) {
      const row = getAssignmentStatement.get(id);
      if (!row) return null;

      const attachments = attachmentsStatement.all(id);
      const artifacts = artifactsStatement.all(id);
      const base = mapAssignmentRow(row, attachments.length);

      return {
        ...base,
        description: row.description,
        deliverable: row.deliverable,
        requirements: JSON.parse(row.requirements_json),
        quickPrompts: JSON.parse(row.quick_prompts_json),
        attachments,
        starterArtifacts: artifacts,
      };
    },
  };
}

module.exports = {
  createDatabase,
  createRepository,
  databasePath,
};
