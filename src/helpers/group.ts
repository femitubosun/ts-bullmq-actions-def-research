import type {ActionGroup, ActionStructure} from "@/types";
import { ActionDef } from "./action";

export class ActionGroupDef<GroupDef extends ActionGroup> {
  constructor(public def: GroupDef) {}



    _struct(): ActionStructure<GroupDef> {
      return Object.entries(this.def).reduce((acc, [key, value]) => {
          if(value instanceof ActionDef){
              return {
                  ...acc,
                  [key]: value.name
              };
          } else {
              return {
                  ...acc,
                  [key]: G(value)._struct()
              };
          }
      }, {} as ActionStructure<GroupDef>);
    }

  actions(input?: ActionGroup): ActionDef<any, any>[] {
    return Object.values(input ?? this.def).reduce<Array<ActionDef<any, any>>>(
      (acc, item) => {
        if (item instanceof ActionDef) {
          acc.push(item);
        } else {
          acc.push(...this.actions(item));
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
