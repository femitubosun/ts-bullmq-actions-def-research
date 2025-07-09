import type { docsAction } from "./group";
import type { ActionGroupHandler } from "./types";

const groupHandlers: ActionGroupHandler<typeof docsAction> = {
  list: ({ context, logger, input }) => {
    return [];
  },
  admin: {
    listAll: ({ context, logger, input }) => {
      return [{ id: "", url: "" }];
    },
  },
};
