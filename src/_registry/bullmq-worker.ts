import type { ModuleActions } from './module-registery';
import type { ActionGroupDef } from '@/helpers/group';
import {BullMQJob, BullMQQueue, BullMQWorker, MockBullMQQueue, MockBullMQWorker} from "@/bull-mq";


// Utility to create BullMQ workers from ModuleActions
export function createWorkersFromModule<T extends ActionGroupDef<any>>(
  moduleActions: ModuleActions<T>
): BullMQWorker[] {
  const workers: BullMQWorker[] = [];
  const actionNames = moduleActions.getAllActionNames();
  
  for (const actionName of actionNames) {
    const handler = moduleActions.getActionHandler(actionName);
    if (handler) {
      const worker = new MockBullMQWorker(
        `${moduleActions.name}.${actionName}`,
        async (job: BullMQJob) => {
          try {
            const result = await handler({
              input: job.data,
              context: { userId: 'mock-user' },
              logger: {
                info: () => console.log(`[${actionName}] INFO`),
                error: () => console.error(`[${actionName}] ERROR`),
                warn: () => console.warn(`[${actionName}] WARN`),
                debug: () => console.debug(`[${actionName}] DEBUG`)
              }
            });
            return result;
          } catch (error) {
            console.error(`Error in worker ${actionName}:`, error);
            throw error;
          }
        }
      );
      workers.push(worker);
    }
  }
  
  return workers;
}

// Utility to get all action names and handlers from multiple modules
export function getAllActionsFromModules(
  modules: ModuleActions<any>[]
): { actionName: string; handler: Function; moduleName: string }[] {
  const allActions: { actionName: string; handler: Function; moduleName: string }[] = [];
  
  for (const module of modules) {
    const actionNames = module.getAllActionNames();
    for (const actionName of actionNames) {
      const handler = module.getActionHandler(actionName);
      if (handler) {
        allActions.push({
          actionName,
          handler,
          moduleName: module.name
        });
      }
    }
  }
  
  return allActions;
}

// Registry for managing all workers
export class BullMQWorkerRegistry {
  private workers: BullMQWorker[] = [];
  private queues: BullMQQueue[] = [];

  addModule<T extends ActionGroupDef<any>>(moduleActions: ModuleActions<T>): void {
    const workers = createWorkersFromModule(moduleActions);
    this.workers.push(...workers);
    
    // Create a queue for each action
    const actionNames = moduleActions.getAllActionNames();
    for (const actionName of actionNames) {
      const queue = new MockBullMQQueue(`${moduleActions.name}.${actionName}`);
      this.queues.push(queue);
    }
  }

  getAllWorkers(): BullMQWorker[] {
    return this.workers;
  }

  getAllQueues(): BullMQQueue[] {
    return this.queues;
  }

  async closeAll(): Promise<void> {
    await Promise.all([
      ...this.workers.map(worker => worker.close()),
      ...this.queues.map(queue => queue.close())
    ]);
  }
}