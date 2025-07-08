import type { Action, ActionGroup } from "../types";
import { ActionDef } from "./action";

class ActionGroupDef<GroupDef extends ActionGroup> {
  constructor(public def: GroupDef) {}

  getActions(input?: ActionGroup): Action[] {
    return Object.values(input ?? this.def).reduce<Array<Action>>(
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

export function G(def: ActionGroup) {
  return new ActionGroupDef(def);
}
