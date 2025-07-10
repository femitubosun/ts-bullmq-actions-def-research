import type { ActionGroupDef } from "@/helpers/group";
import type { ActionGroupHandler } from "@/types";
import z from "zod";

const AsyncFunction = (async () => {}).constructor;

export class ModuleActions<Module extends ActionGroupDef<any>> {
  _handlers: Partial<ActionGroupHandler<Module>> = {};

  constructor(
    public name: string,
    public module: Module,
  ) {}

  static make<T extends ActionGroupDef<any>>(
    name: string,
    module: T,
  ): ModuleActions<T> {
    return new ModuleActions(name, module);
  }

  #getQueues() {}

  registerHandler(config: Partial<ActionGroupHandler<Module>>) {
    this._handlers = {
      ...this._handlers,
      ...config,
    };
  }

  logHandlers() {
    console.log(this._handlers);
  }

  logModule() {
    console.log(this.module.def);
  }

  buildModuleActionConfig(): Array<string> {
    return this.#getActionParentNodes(this.module);
  }

  getAllActionNames(): string[] {
    return this.#getActionNames(this.module.def);
  }

  getActionHandler(actionName: string): Function | undefined {
    return this.#getHandlerByPath(this._handlers, actionName);
  }

  getAllActionHandlers(): Record<string, Function> {
    const actionNames = this.getAllActionNames();
    const handlers: Record<string, Function> = {};
    
    for (const actionName of actionNames) {
      const handler = this.getActionHandler(actionName);
      if (handler) {
        handlers[actionName] = handler;
      }
    }
    
    return handlers;
  }

  #getActionNames(input: any, prefix: string = ""): string[] {
    return Object.entries(input).reduce<string[]>((acc, [key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && value._input && value._output) {
        // This is an action
        acc.push(fullKey);
      } else if (value && typeof value === 'object' && !value._input && !value._output) {
        // This is a nested group
        acc.push(...this.#getActionNames(value, fullKey));
      }
      
      return acc;
    }, []);
  }

  #getHandlerByPath(handlers: any, path: string): Function | undefined {
    const parts = path.split('.');
    let current = handlers;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }
    
    return typeof current === 'function' ? current : undefined;
  }

  #getActionParentNodes(input: ActionGroupDef<any>): Array<string> {
    return Object.entries(input).reduce<Array<string>>((acc, [key, value]) => {
      if (value instanceof AsyncFunction) {
        acc.push(key);
      } else {
        acc.push(`${key}.${this.#getActionParentNodes(value).join(".")}`);
      }
      return acc;
    }, []);
  }
}



















Module.make("name", handlers)
// Register queues.

// module.registerQueues
// module.callerDef






















