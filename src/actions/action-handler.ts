import type { ActionHandler } from "../types";
import type { actionDef } from "./action";

const actionHandler: ActionHandler<typeof actionDef.create> = async ({
  context,
  input,
  logger,
}) => {
  console.log(context.userId);

  return {
    ...input,
    id: "",
  };
};
