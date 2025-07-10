// Requirements for Registry
//
// - Group defs should map to handlers.
// - Action Handlers are the workers for the A name.
//
// /   Registry[action.name] = {
//     input: action._input,
//     output: action._output,
//     name: action.name,
//     worker: {},
//     queue: {},
//   };

// const actions = [...DocsGroup.getActions(), ...TasksGroup.getActions()];

// const Registry: ActionRegistry = {};

// for (const action of actions) {
//   Registry[action.name] = {
//     input: action._input,
//     output: action._output,
//     name: action.name,
//     worker: {},
//     queue: {},
//   };

//   console.log(`${action.name} registered`);
// }
