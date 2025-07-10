import { ActionDef } from "@/helpers/action";
import { BullMQQueue, BullMQWorker, MockBullMQQueue } from "@/bull-mq";

class ActionRegistry {
  private queues = new Map<string, BullMQQueue>();
  private workers = new Map<string, BullMQWorker>();
  
  registerQueue(actionName: string, queue: BullMQQueue) {
    this.queues.set(actionName, queue);
  }
  
  registerWorker(actionName: string, worker: BullMQWorker) {
    this.workers.set(actionName, worker);
  }
  
  getQueue(actionName: string): BullMQQueue | undefined {
    return this.queues.get(actionName);
  }
  
  getWorker(actionName: string): BullMQWorker | undefined {
    return this.workers.get(actionName);
  }
  
  async addJob(actionName: string, jobData: any): Promise<any> {
    const queue = this.getOrCreateQueue(actionName);
    
    const job = await queue.add(actionName, jobData);
    return job;
  }
  
  getOrCreateQueue(actionName: string): BullMQQueue {
    let queue = this.getQueue(actionName);
    if (!queue) {
      queue = new MockBullMQQueue(actionName);
      this.registerQueue(actionName, queue);
    }
    return queue;
  }
}

export const actionRegistry = new ActionRegistry();