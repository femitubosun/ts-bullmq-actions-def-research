import type { ActionGroupHandler } from "../types";
import type { docsAction } from "./group";

const groupHandlers: ActionGroupHandler<typeof docsAction> = {
  list: async ({ context, logger, input }) => {
    return [];
  },
  admin: {
    listAll: async ({ context, logger, input }) => {
      return [{ id: "", url: "" }];
    },
  },
};
