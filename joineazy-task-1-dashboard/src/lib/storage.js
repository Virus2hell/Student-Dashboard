import { initialAssignments, initialSubmissions, users } from "../data/seed.js";

export const storage = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(`je.${key}`)); } catch { return null; }
  },
  set(key, val) {
    localStorage.setItem(`je.${key}`, JSON.stringify(val));
  }
};

export function seedIfEmpty() {
  if (!storage.get("users")) storage.set("users", users);
  if (!storage.get("assignments")) storage.set("assignments", initialAssignments);
  if (!storage.get("submissions")) storage.set("submissions", initialSubmissions);
}

export function uid() {
  return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}
