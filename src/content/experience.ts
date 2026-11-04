import type { RoleRecord } from "./types";
import { roles as sharedRoles } from "./roles.mjs";

/**
 * Typed view of the shared work history. The underlying data is plain JS so
 * the résumé generator can import the same file.
 */
export const roles: RoleRecord[] = sharedRoles;

export function getRole(id: string): RoleRecord | undefined {
  return roles.find((role) => role.id === id);
}
