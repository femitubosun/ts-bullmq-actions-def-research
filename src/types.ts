import type z from "zod";
import type { ActionDef } from "./helpers/action";
import type { ActionGroupDef } from "./helpers/group";

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
}) => Promise<z.infer<ExtractActionTypes<T, "output">>>;

type ExtractGroupDef<AgD> = AgD extends ActionGroupDef<infer Def> ? Def : never;

type ActionGroupDefHandler<Ag extends ActionGroup> = {
  [AgK in keyof Ag]: Ag[AgK] extends Action
    ? ActionHandler<Ag[AgK]>
    : Ag[AgK] extends ActionGroup
      ? ActionGroupDefHandler<Ag[AgK]>
      : never;
};

export type ActionGroupHandler<T> = ActionGroupDefHandler<ExtractGroupDef<T>>;
