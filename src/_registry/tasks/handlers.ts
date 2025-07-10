import { ModuleActions } from "../module-registery";
import { TaskActions } from "./group";

export const tasksModule = ModuleActions.make("tasks", TaskActions);

tasksModule.registerHandler({
  create: async ({ input }) => {
    return {
      ...input,
      status: true,
      id: "",
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
  admin: {
    deleteAll: async ({ context }) => {
      return true;
    },
  },
});
