import type {ActionGroup} from "@/types";

export function G<T extends ActionGroup>(def: T): T {
  return def;
}
