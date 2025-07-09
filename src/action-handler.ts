import type { actionDef } from "./action";
import type { ActionHandler } from "./types";

const actionHandler: ActionHandler<typeof actionDef.create> = ({
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
