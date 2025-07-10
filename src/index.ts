import {docsModule} from "@/module/docs";
import {callAction} from "@/caller/call-action";
import {docsAction} from "@/actions/group";

// console.log(tasksModule.getDefStructure())
//
// console.log(tasksModule._handlers)
// tasksModule.registerActionInQueue()
console.log(docsModule._actionNames())
console.log(docsModule._handlers)
console.log(docsModule._structure())
docsModule.registerQueues()

// console.log(docsModule.mergeNameAndHandler())
// docsModule.registerActionInQueue()




async function main(){
    const result = await callAction(docsAction.admin.listAll, {
        input: {
            filters: 'something'
        }, context: {}
    })

    console.log(`res from action`, result)
}


main()
