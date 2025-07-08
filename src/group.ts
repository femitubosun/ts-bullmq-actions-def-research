import z from "zod";
import { A } from "./helpers/action";
import { G } from "./helpers/group";

export const docsAction = G({
  list: A("docs.list")
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .output(
      z
        .object({
          id: z.string(),
          url: z.string().url(),
        })
        .array(),
    ),

  admin: {
    listAll: A("docs.admin.listAll")
      .input(
        z.object({
          filters: z.string(),
        }),
      )
      .output(
        z
          .object({
            id: z.string(),
            url: z.string().url(),
          })
          .array(),
      ),
  },
});
