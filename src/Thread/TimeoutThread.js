import type { ThreadInterface } from './ThreadInterface';

export default class TimeoutThread implements ThreadInterface {

    threadFunc: Function;

    constructor(threadFunc: Function) {
        this.threadFunc = threadFunc;
    }

    static isSupported(): boolean {
        try {
            return setTimeout && typeof setTimeout === 'function' || false;
        } catch (e) {
            return false;
        }
    }

    exec(...args: Array<any>): Promise {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.threadFunc(...args)), 0);
        });
    }

    close(): Promise {
        this.threadFunc = () => {};
        return Promise.resolve(true);
    }

    terminate(): void {
        this.threadFunc = () => {};
    }
}
