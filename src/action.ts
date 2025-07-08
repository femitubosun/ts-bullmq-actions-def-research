// import type z from "zod";

import type z from "zod";

export class ActionDef<
  Input extends z.ZodTypeAny,
  Output extends z.ZodTypeAny,
> {
  public _input?: Input;
  public _output?: Output;

  constructor(public identifier: string) {}

  input<T extends z.ZodTypeAny>(schema: T): ActionDef<T, Output> {
    this._input = schema as any;
    return this as any;
  }

  output<T extends z.ZodTypeAny>(schema: T): ActionDef<Input, T> {
    this._input = schema as any;

    return this as any;
  }
}

export function A(identifier: string) {
  return new ActionDef(identifier);
}
