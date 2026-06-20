import { CaseDetail, CaseSummary, HelpCenter, Message } from "./types";

// ---------------------------------------------------------------------------
// Phase 4 scaffold. Not wired up yet — pages currently use lib/mock-data.ts.
// When ready for U6.1–U6.3, swap the mock-data imports in each page for the
// matching function below. Keeping fetch() calls here (not in components)
// follows Rule 1: pages fetch, components render.
// ---------------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCases(): Promise<CaseSummary[]> {
  const res = await fetch(`${API_URL}/api/cases`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load cases");
  return res.json();
}

export async function fetchCaseMessages(id: string): Promise<{
  case: CaseDetail;
  messages: Message[];
}> {
  const res = await fetch(`${API_URL}/api/cases/${id}/messages`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load case messages");
  return res.json();
}

export async function resolveCase(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/cases/${id}/resolve`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to mark case resolved");
}

export async function fetchCenters(): Promise<HelpCenter[]> {
  const res = await fetch(`${API_URL}/api/centers`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load help centers");
  return res.json();
}
