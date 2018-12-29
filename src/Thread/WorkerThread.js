import BlobFileFactory from '../Blob/BlobFileFactory';
import WorkerError from '../Error/WorkerError';

import type { ThreadInterface } from './ThreadInterface';
import type { OptionsType } from '../ThreadFactory';

const STATUS_OK = 'ok';
const STATUS_ERROR = 'error';

export const ERROR_TYPE_WORKER_ON_MESSAGE_ERROR = 'WorkerOnMessageError';
export const ERROR_TYPE_WORKER_WRONG_COMMAND = 'WorkerCommand';
export const ERROR_TYPE_WRONG_MESSAGE_STATUS = 'WrongMessageStatus';
export const ERROR_TYPE_ON_MESSAGE_ERROR = 'OnMessageError';

type PromiseCompletionsType = {
    resolve: Function,
    reject: Function,
}

type ErrorDataType = {
    name: string,
    message: string,
}

const COMMAND_EXEC = 'exec';
const COMMAND_CLOSE = 'close';

type MessageType = {
    command: COMMAND_EXEC | COMMAND_CLOSE,
    promiseId?: string,
    args?: Array<any>,
};

export default class WorkerThread implements ThreadInterface {

    worker: Worker;
    promiseCompletionsMap: Map<string, PromiseCompletionsType>;
    options: OptionsType;

    constructor(threadFunc: Function | string, options: OptionsType = {}) {
        this.options = options;
        this.promiseCompletionsMap = new Map();

        this.worker = new Worker(
            WorkerThread.createWorkerBlobFile(threadFunc, options),
            {
                name: options.name,
                type: options.type,
                credentials: options.credentials,
            },
        );
        this.worker.onmessage = this._onMessage.bind(this);
        this.worker.onmessageerror = this._onMessageError.bind(this);
        this.worker.onerror = this._onError.bind(this);
    }

    static isSupported(): boolean {
        try {
            return URL && URL.createObjectURL && Blob && Worker && true || false;
        } catch (e) {
            return false;
        }
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
     */
    static createWorkerBlobFile(threadFunc: Function | string, options: OptionsType): string {
        const importScripts = options.importScripts
            ? `importScripts('${(options.importScripts.join("', '"))}');`
            : '';

        const threadFuncString = typeof threadFunc === 'function'
            ? Function.toString.call(threadFunc)
            : threadFunc;

        return BlobFileFactory.createJavaScriptObjectUrl(
            `'use strict';
            
                ${importScripts}
                
                var threadFunc = ${threadFuncString};

                var workerCommandExec = function(data) {
                    var result = threadFunc.apply(threadFunc, data.args);
                    self.postMessage({
                        status: '${STATUS_OK}',
                        promiseId: data.promiseId,
                        result: result
                    });
                };

                var workerCommandClose = function(data) {
                    self.postMessage({
                        status: '${STATUS_OK}',
                        promiseId: data.promiseId,
                        result: true
                    });
                    self.close();
                };

                var workerSendError = function(data, error) {
                    self.postMessage({
                        status: '${STATUS_ERROR}',
                        promiseId: data.promiseId,
                        error: {
                            type: error.name || 'Error',
                            message: error.message,
                        }
                    });
                };

                self.onmessage = function(event) {
                    try {
                        switch (event.data.command) {
                            case '${COMMAND_EXEC}':
                                workerCommandExec(event.data);
                                break;
                            case '${COMMAND_CLOSE}':
                                workerCommandClose(event.data);
                                break;
                            default:
                                workerSendError(event.data, {
                                    name: '${ERROR_TYPE_WORKER_WRONG_COMMAND}',
                                    message: 'Wrong command "' + event.data.command + '"' 
                                });
                        }
                    } catch (error) {
                        workerSendError(event.data, error);
                    }
                };

                // see: https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessageerror
                self.onmessageerror = function(event) {
                    var error = {
                        name: '${ERROR_TYPE_WORKER_ON_MESSAGE_ERROR}',
                        message: 'The onmessageerror event handler of the DedicatedWorkerGlobalScope interface is '
                            + 'an EventListener, called whenever an MessageEvent of type messageerror is fired on '
                            + 'the worker—that is, when it receives a message that cannot be deserialized.'
                    };
                    workerSendError(event.data, error);
                };
            `,
        );
    }

    /**
     * @private
     */
    _getNewPromiseId(): string {
        const now = Date.now();
        let promiseId;
        let i = 0;
        do {
            promiseId = `${now}-${i}`;
            i += 1;
        } while (this.promiseCompletionsMap.has(promiseId));
        return promiseId;
    }

    /**
     * @private
     */
    _createError(errorData: ErrorDataType) {
        return new WorkerError(errorData.type, errorData.message);
    }

    /**
     * @private
     */
    _onMessage(message: MessageEvent): void {
        const promiseId = message.data.promiseId;
        const promiseCompletions = this.promiseCompletionsMap.get(promiseId);
        if (!promiseCompletions) {
            return;
        }
        switch (message.data.status) {
            case STATUS_OK:
                promiseCompletions.resolve(message.data.result);
                break;
            case STATUS_ERROR:
                promiseCompletions.reject(this._createError(message.data.error));
                break;
            default:
                promiseCompletions.reject(
                    new WorkerError(
                        ERROR_TYPE_WRONG_MESSAGE_STATUS,
                        `Incorrect message status: ${message.data.status}`,
                        message.data,
                    ),
                );
                break;
        }
        this.promiseCompletionsMap.delete(promiseId);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Worker/onmessageerror
     * @private
     */
    _onMessageError(message: MessageEvent): void {
        const promiseId = message.data.promiseId;
        const promiseCompletions = this.promiseCompletionsMap.get(promiseId);
        if (promiseCompletions) {

            promiseCompletions.reject(new WorkerError(
                ERROR_TYPE_ON_MESSAGE_ERROR,
                'The onmessageerror event handler of the Worker interface is an EventListener, called whenever '
                + 'anMessageEvent of type messageerror is fired on the Worker instance — that is, when it receives a '
                + 'message that cannot be deserialized.',
                message,
            ));
        }
        this.promiseCompletionsMap.delete(promiseId);
    }

    /**
     * @private
     */
    _onError(error: ErrorEvent): void {
        this.promiseCompletionsMap.forEach((promiseCompletions: PromiseCompletionsType, promiseId: string) => {
            promiseCompletions.reject(error);
            this.promiseCompletionsMap.delete(promiseId);
        });
        if (this.options.onError) {
            this.options.onError(error);
        }
    }

    /**
     * @private
     */
    _postMessage(message: MessageType): Promise {
        return new Promise((resolve, reject) => {
            if (!message.promiseId) {
                message.promiseId = this._getNewPromiseId();
            }
            this.promiseCompletionsMap.set(message.promiseId, { resolve, reject });
            try {
                this.worker.postMessage(message);
            } catch (error) {
                reject(error);
            }
        });
    }

    exec(...args: Array<any>): Promise {
        const message: MessageType = {
            command: COMMAND_EXEC,
            args,
        };
        return this._postMessage(message);
    }

    close(): Promise {
        const message: MessageType = {
            command: COMMAND_CLOSE,
        };
        return this._postMessage(message);
    }

    terminate(): void {
        this.worker.terminate();
    }

}
