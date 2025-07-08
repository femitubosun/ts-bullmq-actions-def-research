import z from "zod";
import { A } from "./helpers/action";
import type { ActionHandler } from "./types";

const actionDef = {
  create: A("documentation.create")
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        sourceUrl: z.string(),
      }),
    )
    .output(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        sourceUrl: z.string(),
      }),
    ),
  // .settings(),
} as const;

const actionHandler: ActionHandler<typeof actionDef.create> = ({
  context,
  input,
  logger,
}) => {
  console.log(context.userId);

  return {
    ...input,
    id: "",
  };
};
