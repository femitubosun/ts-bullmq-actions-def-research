import z from "zod";
import { A } from "../helpers/action";

export const actionDef = {
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
};
