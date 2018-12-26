import type { ThreadInterface } from './ThreadInterface';

export default class NoopThread implements ThreadInterface {

    static isSupported(): boolean {
        return true;
    }

    exec(...args: Array<any>): Promise {
        return Promise.resolve();
    }

    close(): Promise {
        return Promise.resolve(true);
    }

    terminate(): void {}

}
