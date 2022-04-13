
export class WorkerPool{
    #queue = [];
    #workersById = {};
    #activeWorkersById = {};

    constructor(workerPath, numberOfThreads) {
        this.#init();
    }

    #init() {
        if (this.numberOfThreads < 1) {
            return null;
        }
        for (let i = 0; i < this.numberOfThreads; i += 1) {
            const worker = new Worker(this.workerPath);
            this.workersById[i] = worker;
            this.activeWorkersById[i] = false;
        }
    }
}