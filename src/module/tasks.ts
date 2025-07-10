import {TaskActions} from "@/_registry/tasks/group";
import {makeModule} from "@/module/index";

export const tasksModule = makeModule('tasks', TaskActions)

TaskActions.def.admin.deleteAll