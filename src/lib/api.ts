import type { AssignmentDetail, AssignmentListItem } from "../types/assignment.ts";

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getAssignments(signal?: AbortSignal): Promise<AssignmentListItem[]> {
  const payload = await request<{ assignments: AssignmentListItem[] }>("/api/assignments", signal);
  return payload.assignments;
}

export async function getAssignmentById(id: string, signal?: AbortSignal): Promise<AssignmentDetail> {
  const payload = await request<{ assignment: AssignmentDetail }>(`/api/assignments/${id}`, signal);
  return payload.assignment;
}
