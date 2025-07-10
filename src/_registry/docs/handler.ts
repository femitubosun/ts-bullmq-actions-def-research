import { ModuleActions } from "../module-registery";
import { DocsGroup } from "./group";

export const docsModule = ModuleActions.make("docs", DocsGroup);

docsModule.registerHandler({
  create: async ({ logger, input, context }) => {
    return {
      ...input,
      id: "",
    };
  },
});
