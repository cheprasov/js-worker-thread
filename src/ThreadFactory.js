// @flow strict

import WorkerThread from './Thread/WorkerThread';
import TimeoutThread from './Thread/TimeoutThread';
import NoopThread from './Thread/NoopThread';
import type { ThreadInterface } from './Thread/ThreadInterface';

/**
 * See options
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
 */
export type OptionsType = {
    importScripts?: Array<string>;
    name?: string,
    type?: string,
    credentials?: string,
    onError?: Function,
}

export default class ThreadFactory {

    static createThread(threadFunc: Function, options: OptionsType = {}): ThreadInterface {
        if (WorkerThread.isSupported()) {
            return this.createWorkerThread(threadFunc, options);
        }
        if (TimeoutThread.isSupported()) {
            return this.createTimeoutThread(threadFunc, options);
        }
        return this.createNoopThread(threadFunc, options);
    }

    static createWorkerThread(threadFunc: Function | string, options: OptionsType = {}) {
        return new WorkerThread(threadFunc, options);
    }

    static createTimeoutThread(threadFunc: Function, options: OptionsType = {}) {
        return new TimeoutThread(threadFunc, options);
    }

    static createNoopThread(threadFunc: Function, options: OptionsType = {}) {
        return new NoopThread(threadFunc, options);
    }

}
