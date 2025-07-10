import z from "zod";
import { A } from "@/helpers/action";
import { G } from "@/helpers/group";
import type { ActionGroupHandler } from "@/types";

const DocsSchema = z.object({
  id: z.string(),
  name: z.string(),
  sourceUrl: z.boolean(),
  type: z.enum(["repo", "text"]),
});

export const DocsGroup = G({
  create: A("docs.create")
    .input(
      DocsSchema.pick({
        name: true,
        sourceUrl: true,
        type: true,
      }),
    )
    .output(DocsSchema),
});

export type DocsGroupHandler = ActionGroupHandler<typeof DocsGroup>;
