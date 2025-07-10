import {ActionDef} from "@/helpers/action";
import {ExtractActionTypes} from "@/types";
import z from "zod";

export const callAction = <T extends ActionDef<any, any>>(action: T, input: {
    context: any,
    input: z.infer<ExtractActionTypes<T, "input">>
}): Promise<z.infer<ExtractActionTypes<T, "output">>> => {
   // should add to the queue
    return {} as any
};



// Action.call()
// Action.enqueue()