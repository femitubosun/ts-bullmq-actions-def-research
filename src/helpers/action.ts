// import type z from "zod";

import type z from "zod";

export class ActionDef<
  Input extends z.ZodTypeAny,
  Output extends z.ZodTypeAny,
> {
  public readonly _kind = "action" as const;
  public readonly _identifier: string;
  public _defs: {
    input?: Input;
    output?: Output;
  } = {};

  constructor(identifier: string) {
    this._identifier = identifier;
  }

  input<T extends z.ZodTypeAny>(schema: T): ActionDef<T, Output> {
    this._defs = {
      input: schema as any,
      output: this._defs.output,
    };

    return this as any;
  }

  output<T extends z.ZodTypeAny>(schema: T): ActionDef<Input, T> {
    this._defs = {
      input: this._defs.input,
      output: schema as any,
    };

    return this as any;
  }
}

export function A(identifier: string) {
  return new ActionDef(identifier);
}
