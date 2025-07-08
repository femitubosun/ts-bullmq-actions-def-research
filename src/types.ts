import type z from "zod";
import type { ActionDef } from "./helpers/action";

type Logger = {
  info: () => void;
  error: () => void;
  warn: () => void;
  debug: () => void;
};

export type Action = ActionDef<z.ZodTypeAny, z.ZodTypeAny>;
export type ActionGroup = {
  [key: string]: Action | ActionGroup;
};

type ExtractActionTypes<T, U extends "input" | "output"> = U extends "input"
  ? T extends ActionDef<infer Input, z.ZodTypeAny>
    ? Input
    : never
  : T extends ActionDef<z.ZodTypeAny, infer Output>
    ? Output
    : never;

export type ActionHandler<T extends Action> = (args: {
  input: z.infer<ExtractActionTypes<T, "input">>;
  context: {
    userId: string;
  };
  logger: Logger;
}) => z.infer<ExtractActionTypes<T, "output">>;

export type ActionGroupHandler<Ag extends ActionGroup> = {
  [AgK in keyof Ag]: Ag[AgK] extends Action
    ? ActionHandler<Ag[AgK]>
    : Ag[AgK] extends ActionGroup
      ? ActionGroupHandler<Ag[AgK]>
      : never;
};
