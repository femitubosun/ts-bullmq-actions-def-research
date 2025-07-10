import {makeModule, Module} from "@/module/index";
import {docsAction} from "@/actions/group";


export const docsModule = makeModule('docs', docsAction)

// docsModule.registerHandlers({
//     list: async ({input, context, logger}) => {
//
//         console.log(input.id)
//         return [{
//             id: 'url',
//             url: 'url'
//         }]
//     },
//
//     admin: {
//         listAll: async ({input}) => {
//             console.log(input.filters)
//
//             return []
//         }
//     }
//
// })