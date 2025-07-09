import type { ActionGroup } from "@/types";
import { ActionDef } from "./action";

export class ActionGroupDef<GroupDef extends ActionGroup> {
  constructor(public def: GroupDef) {}

  getActions(input?: ActionGroup): ActionDef<any, any>[] {
    return Object.values(input ?? this.def).reduce<Array<ActionDef<any, any>>>(
      (acc, item) => {
        if (item instanceof ActionDef) {
          acc.push(item);
        } else {
          acc.push(...this.getActions(item));
        }
        return acc;
      },
      [],
    );
  }
}

export function G<T extends ActionGroup>(def: T): ActionGroupDef<T> {
  return new ActionGroupDef(def);
}
