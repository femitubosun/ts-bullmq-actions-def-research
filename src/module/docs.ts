import {makeModule, Module} from "@/module/index";
import {docsAction} from "@/actions/group";
import {callAction} from "@/caller/call-action";


export const docsModule = makeModule('docs', docsAction)


docsModule.registerHandlers({
    list: async ({input, context, logger}) => {

        console.log(input.id)
        return {
            context,
            data: [{
                id: 'url',
                url: ''
            }]
        }
    },

    admin: {
        listAll: async ({input, context}) => {
            console.log(input.filters)
            return {
              context,
                data: []
            }
        }
    }

})

