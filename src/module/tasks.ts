import {TaskActions} from "@/registry/tasks/group";
import {makeModule} from "@/module/index";

export const tasksModule = makeModule('tasks', TaskActions)