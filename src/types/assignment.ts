export type AssignmentStatus = "missing" | "not_started" | "in_progress" | "completed";

export type AssignmentListItem = {
  id: string;
  title: string;
  courseName: string;
  courseCode: string;
  status: AssignmentStatus;
  statusLabel: string;
  summary: string;
  dueAt: string;
  dueLabel: string;
  daysUntilDue: number;
  effortMinutes: number;
  effortLabel: string;
  priorityScore: number;
  recommendedNextStep: string;
  attachmentCount: number;
};

export type AssignmentAttachment = {
  id: string;
  name: string;
  kind: "pdf" | "docx" | "slides" | "link";
  meta: string;
};

export type StarterArtifact = {
  id: string;
  kind: "outline" | "checklist" | "concept_map" | "notes";
  title: string;
  content: string;
};

export type AssignmentDetail = AssignmentListItem & {
  description: string;
  deliverable: string;
  requirements: string[];
  attachments: AssignmentAttachment[];
  starterArtifacts: StarterArtifact[];
  quickPrompts: string[];
};
