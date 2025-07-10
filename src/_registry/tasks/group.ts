import z from "zod";
import { A } from "@/helpers/action";
import { G } from "@/helpers/group";
import type { ActionGroupHandler } from "@/types";

const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.boolean(),
});

export const TaskActions = G({
  create: A("tasks.create")
    .input(
      TaskSchema.pick({
        name: true,
      }),
    )
    .output(TaskSchema),

  getById: A("tasks.getById")
    .input(
      TaskSchema.pick({
        id: true,
      }),
    )
    .output(TaskSchema),

  list: A("tasks.list").output(TaskSchema.array()),

  admin: {
    deleteAll: A("tasks.admin.deleteAll").output(z.boolean()),
  },
});

export type TaskGroupHandler = ActionGroupHandler<typeof TaskActions>;
