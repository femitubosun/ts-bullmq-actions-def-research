import type { DocsGroupHandler } from "./group";

export const DocsActionHandler: DocsGroupHandler = {
  create: async ({ input }) => {
    return {
      ...input,
      id: "",
    };
  },
};
