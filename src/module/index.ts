/**
 *
 *
 *
 * A module needs to be able to register its actions.
 *
 */
import {ActionGroup, ActionGroupHandler} from "@/types";
import {MockBullMQWorker} from "@/bull-mq";
import {getActionStructure} from "@/helpers/group-utils";
import {actionRegistry} from "@/registry/action-registry";


export class Module<T extends ActionGroup> {
    public _handlers: Partial<ActionGroupHandler<T>> = {};


    constructor(public name: string, public _actionGroup: T) {
    }

    registerHandlers(config: Partial<ActionGroupHandler<T>>) {
        this._handlers = {
            ...this._handlers,
            ...config,
        };
    }

    _actionNames(){
        return getActionStructure(this._actionGroup)
    }



    _structure(){
        return mergeNameAndHandler(this._actionNames(), this._handlers)
    }

    registerQueues(){
        const structure = this._structure()
        
        this._createWorkersFromStructure(structure)
    }

    private _createWorkersFromStructure(structure: any) {
        for (const key in structure) {
            const item = structure[key];
            
            if (item && typeof item === 'object') {
                if (item.name && typeof item.name === 'string') {
                    const originalHandler = item.handler || (async () => {
                        console.log(`No handler for ${item.name}`);
                        return { data: null, context: {} };
                    });
                    
                    const wrappedHandler = async (job: any) => {
                        const { context, input } = job.data;
                        const logger = {
                            info: () => console.log(`[${item.name}] INFO`),
                            error: () => console.error(`[${item.name}] ERROR`),
                            warn: () => console.warn(`[${item.name}] WARN`),
                            debug: () => console.debug(`[${item.name}] DEBUG`)
                        };
                        
                        return await originalHandler({ input, context, logger });
                    };
                    
                    const worker = new MockBullMQWorker(item.name, wrappedHandler);
                    actionRegistry.registerWorker(item.name, worker);
                } else {
                    this._createWorkersFromStructure(item);
                }
            }
        }
    }




    static makeModule<T extends ActionGroup>(name: string, g: T ){
        return new Module(name, g)
    }

}

export function makeModule<T extends ActionGroup>(string: string, g: T): Module<T>{
    return new Module(string, g)

}



function mergeNameAndHandler(
    names: Record<string, any>,
    handlers: Record<string, any>,
): any {
    const result: Record<string, any> = {};

    for (const key of Object.keys(names)) {
        const nameVal = names[key];
        const handlerVal = handlers?.[key];

        if (typeof nameVal === 'string') {
            result[key] = {
                name: nameVal,
                handler: typeof handlerVal === 'function' ? handlerVal : undefined
            };
        } else if (
            typeof nameVal === 'object' &&
            nameVal !== null
        ) {
            result[key] = mergeNameAndHandler(nameVal, handlerVal || {});
        }
    }

    return result;
}

