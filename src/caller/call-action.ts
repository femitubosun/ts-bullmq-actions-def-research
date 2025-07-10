import {ActionDef} from "@/helpers/action";
import {ExtractActionTypes} from "@/types";
import {actionRegistry} from "@/registry/action-registry";
import z from "zod";

export const callAction = async <T extends ActionDef<any, any>>(action: T, input: {
    context: any,
    input: z.infer<ExtractActionTypes<T, "input">>
}): Promise<any> => {
    const job = await actionRegistry.addJob(action.name, input);
    return job;
};



// Action.call()
// Action.enqueue()