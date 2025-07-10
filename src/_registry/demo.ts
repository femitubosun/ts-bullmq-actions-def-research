import { docsModule } from './docs/handler';
import { tasksModule } from './tasks/handlers';
import { BullMQWorkerRegistry, getAllActionsFromModules } from './bullmq-worker';

// Demo: Get all action names from a module
console.log('=== Docs Module Actions ===');
console.log('Action names:', docsModule.getAllActionNames());
console.log('All handlers:', Object.keys(docsModule.getAllActionHandlers()));

console.log('\n=== Tasks Module Actions ===');
console.log('Action names:', tasksModule.getAllActionNames());
console.log('All handlers:', Object.keys(tasksModule.getAllActionHandlers()));

// Demo: Get specific handler
console.log('\n=== Specific Handler Demo ===');
const createHandler = tasksModule.getActionHandler('create');
console.log('Has create handler:', !!createHandler);

const adminDeleteHandler = tasksModule.getActionHandler('admin.deleteAll');
console.log('Has admin.deleteAll handler:', !!adminDeleteHandler);

// Demo: Get all actions from multiple modules
console.log('\n=== All Actions from Multiple Modules ===');
const allActions = getAllActionsFromModules([docsModule, tasksModule]);
console.log('All actions:', allActions.map(a => ({ 
  module: a.moduleName, 
  action: a.actionName 
})));

// Demo: BullMQ Worker Registry
console.log('\n=== BullMQ Worker Registry Demo ===');
const registry = new BullMQWorkerRegistry();
registry.addModule(docsModule);
registry.addModule(tasksModule);

console.log('Workers:', registry.getAllWorkers().map(w => w.name));
console.log('Queues:', registry.getAllQueues().map(q => q.name));

// Demo: Simulate processing a job
async function simulateJob() {
  const workers = registry.getAllWorkers();
  const createWorker = workers.find(w => w.name.includes('create'));
  
  if (createWorker) {
    console.log('\n=== Simulating Job Processing ===');
    const mockJob = {
      id: '123',
      name: 'create',
      data: { name: 'Test Task' },
      opts: {}
    };
    
    try {
      const result = await createWorker.process(mockJob);
      console.log('Job result:', result);
    } catch (error) {
      console.error('Job error:', error);
    }
  }
}

simulateJob().catch(console.error);