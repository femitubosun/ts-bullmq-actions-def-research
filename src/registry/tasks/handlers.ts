import type { TaskGroupHandler } from "./group";

export const handlers: TaskGroupHandler = {
  create: async ({ context, input, logger }) => {
    return {
      ...input,
      id: "",
      status: true,
    };
  },
  getById: async ({ input }) => {
    return {
      ...input,
      status: true,
      name: "",
    };
  },
  list: async ({ context }) => {
    return [];
  },
};
