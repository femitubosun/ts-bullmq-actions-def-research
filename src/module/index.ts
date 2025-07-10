/**
 *
 *
 *
 * A module needs to be able to register its actions.
 *
 */
import {ActionGroupDef} from "@/helpers/group";
import {ActionGroup, ActionGroupHandler} from "@/types";
import {MockBullMQWorker} from "@/bull-mq";
import {ActionDef} from "@/helpers/action";



export class Module<Module extends  ActionGroupDef<any>> {
    public _handlers: Partial<ActionGroupHandler<Module>> = {};


    constructor(public name: string, public _actionGroup: Module) {
    }

    registerHandlers(config: Partial<ActionGroupHandler<Module>>) {
        this._handlers = {
            ...this._handlers,
            ...config,
        };
    }

    _actionNames(){
        return this._actionGroup._struct()
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
                    const handler = item.handler || (async (job: any) => {
                        console.log(`No handler for ${item.name}`);
                    });
                    
                    new MockBullMQWorker(item.name, handler);
                } else {
                    this._createWorkersFromStructure(item);
                }
            }
        }
    }




    static makeModule(name: string, g: ActionGroupDef<any> ){
        return new Module(name, g)
    }

}

export function makeModule<T extends ActionGroupDef<any>>(string: string, g: T): Module<T>{
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

