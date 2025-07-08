import type z from "zod";

class ActionShape<
  InputSchema extends z.ZodTypeAny,
  OutputSchema extends z.ZodTypeAny,
> {
  _input?: InputSchema;
  _output?: OutputSchema;

  constructor(public readonly identifier: string) {}

  input<T extends z.ZodTypeAny>(schema: T): ActionShape<T, OutputSchema> {
    this._input = schema as InputSchema;

    return this as any;
  }

  output(schema: z.ZodTypeAny) {
    this._output = schema;

    return this;
  }
}

export function A(identifier: string) {
  return new ActionShape(identifier);
}
