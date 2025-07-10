import type { ActionGroupHandler } from "../types";
import type { docsAction } from "./group";

const groupHandlers: ActionGroupHandler<typeof docsAction> = {
  list: async ({ context, logger, input }) => {
    return {
      data: [],
      context,
    };
  },
  admin: {
    listAll: async ({ context, logger, input }) => {
      return {
        data: [{ id: "", url: "" }],
        context,
      };
    },
  },
};
