// Mock BullMQ Worker interface
export interface BullMQWorker {
    name: string;
    process: (job: BullMQJob) => Promise<any>;
    close: () => Promise<void>;
}

export interface BullMQJob {
    id: string;
    name: string;
    data: any;
    opts: any;
}

export interface BullMQQueue {
    name: string;
    add: (name: string, data: any, opts?: any) => Promise<BullMQJob>;
    close: () => Promise<void>;
}

// Mock implementations
export class MockBullMQWorker implements BullMQWorker {
    constructor(
        public name: string,
        public process: (job: BullMQJob) => Promise<any>
    ) {}

    async close(): Promise<void> {
        console.log(`Mock worker ${this.name} closed`);
    }
}

export class MockBullMQQueue implements BullMQQueue {
    constructor(public name: string) {}

    async add(name: string, data: any, opts?: any): Promise<BullMQJob> {
        return {
            id: `${Date.now()}`,
            name,
            data,
            opts: opts || {}
        };
    }

    async close(): Promise<void> {
        console.log(`Mock queue ${this.name} closed`);
    }
}
