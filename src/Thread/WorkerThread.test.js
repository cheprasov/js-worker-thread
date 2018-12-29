import WorkerThread, { ERROR_TYPE_ON_MESSAGE_ERROR, ERROR_TYPE_WRONG_MESSAGE_STATUS } from './WorkerThread';
import WorkerError from '../Error/WorkerError';
import BlobFileFactory from '../Blob/BlobFileFactory';

jest.mock('../Blob/BlobFileFactory');

describe('WorkerThread', () => {
    let threadFunc;
    let thread;

    beforeEach(() => {
        global.Worker = function () {
            this.postMessage = jest.fn();
            this.terminate = jest.fn();
        };
        global.URL.createObjectURL = jest.fn();
        threadFunc = (n => n * 2);
        thread = new WorkerThread(threadFunc);
    });

    it('should implements ThreadInterface', () => {
        expect(typeof WorkerThread.isSupported).toEqual('function');
        expect(typeof thread.exec).toEqual('function');
        expect(typeof thread.close).toEqual('function');
        expect(typeof thread.terminate).toEqual('function');
    });

    describe('constructor', () => {
        it('should init instance params', () => {
            expect(thread.options).toEqual({});
            expect(thread.promiseCompletionsMap).toBeInstanceOf(Map);
            expect(thread.worker).toBeInstanceOf(global.Worker);
        });

        it('should init listeners for worker', () => {
            expect(typeof thread.worker.onmessage).toEqual('function');
            expect(typeof thread.worker.onmessageerror).toEqual('function');
            expect(typeof thread.worker.onerror).toEqual('function');
        });
    });

    describe('isSupported', () => {
        it('should return true', () => {
            expect(WorkerThread.isSupported()).toBeTruthy();
        });

        it('should return false if Worker is not exist', () => {
            delete global.Worker;
            expect(WorkerThread.isSupported()).toBeFalsy();
        });

        it('should return false if URL.createObjectURL is not exist', () => {
            delete global.URL.createObjectURL;
            expect(WorkerThread.isSupported()).toBeFalsy();
        });
    });

    describe('_getNewPromiseId', () => {
        let originDateNow;

        beforeAll(() => {
            originDateNow = Date.now;
            Date.now = jest.fn(() => 42);
        });

        afterAll(() => {
            Date.now = originDateNow;
        });

        it('should generate new promise id', () => {
            expect(thread._getNewPromiseId()).toEqual('42-0');
        });

        it('should increment promise id if is is exist', () => {
            thread.promiseCompletionsMap.set('42-0', true);
            expect(thread._getNewPromiseId()).toEqual('42-1');
        });
    });

    describe('_createError', () => {
        it('should create new WorkerError', () => {
            const error = thread._createError({
                type: 'WrongFooBar',
                message: 'Foo is not bar',
            });
            expect(error).toBeInstanceOf(WorkerError);
            expect(error.type).toEqual('WrongFooBar');
            expect(error.message).toEqual('Foo is not bar');
        });
    });

    describe('_onMessage', () => {
        let resolve;
        let reject;

        beforeEach(() => {
            resolve = jest.fn();
            reject = jest.fn();
            thread.promiseCompletionsMap.set('42-0', { resolve, reject });
        });

        it('should resolve promise if message status is ok', () => {
            thread._onMessage({
                data: {
                    status: 'ok',
                    promiseId: '42-0',
                    result: ['foo', 'bar', 42],
                },
            });
            expect(resolve).toHaveBeenCalledWith(['foo', 'bar', 42]);
            expect(reject).not.toHaveBeenCalled();
            expect(thread.promiseCompletionsMap.has('42-0')).toBeFalsy();
        });

        it('should reject promise if message status is error', () => {
            thread._onMessage({
                data: {
                    status: 'error',
                    promiseId: '42-0',
                    error: {
                        type: 'SomethingWrong',
                        message: 'For bar 42',
                    },
                },
            });
            expect(reject).toHaveBeenCalled();
            expect(reject.mock.calls[0][0]).toBeInstanceOf(WorkerError);
            expect(reject.mock.calls[0][0].type).toEqual('SomethingWrong');
            expect(reject.mock.calls[0][0].message).toEqual('For bar 42');
            expect(resolve).not.toHaveBeenCalled();
            expect(thread.promiseCompletionsMap.has('42-0')).toBeFalsy();
        });

        it('should reject promise if message status is error', () => {
            thread._onMessage({
                data: {
                    status: 'wrong',
                    promiseId: '42-0',
                },
            });
            expect(reject).toHaveBeenCalled();
            expect(reject.mock.calls[0][0]).toBeInstanceOf(WorkerError);
            expect(reject.mock.calls[0][0].type).toEqual(ERROR_TYPE_WRONG_MESSAGE_STATUS);
            expect(reject.mock.calls[0][0].message).toEqual('Incorrect message status: wrong');
            expect(resolve).not.toHaveBeenCalled();
            expect(thread.promiseCompletionsMap.has('42-0')).toBeFalsy();
        });
    });

    describe('_onMessageError', () => {
        let resolve;
        let reject;

        beforeEach(() => {
            resolve = jest.fn();
            reject = jest.fn();
            thread.promiseCompletionsMap.set('42-0', { resolve, reject });
        });

        it('should reject promise if message status is wrong', () => {
            thread._onMessageError({
                data: {
                    status: 'wrong',
                    promiseId: '42-0',
                },
            });
            expect(reject).toHaveBeenCalled();
            expect(reject.mock.calls[0][0]).toBeInstanceOf(WorkerError);
            expect(reject.mock.calls[0][0].type).toEqual(ERROR_TYPE_ON_MESSAGE_ERROR);
            expect(reject.mock.calls[0][0].message).toEqual(
                'The onmessageerror event handler of the Worker interface is an EventListener, called whenever '
                + 'anMessageEvent of type messageerror is fired on the Worker instance — that is, when it receives a '
                + 'message that cannot be deserialized.',
            );
            expect(resolve).not.toHaveBeenCalled();
            expect(thread.promiseCompletionsMap.has('42-0')).toBeFalsy();
        });
    });

    describe('_onError', () => {
        let resolves;
        let rejects;

        beforeEach(() => {
            resolves = [jest.fn(), jest.fn()];
            rejects = [jest.fn(), jest.fn()];
            thread.promiseCompletionsMap.set('42-0', { resolve: resolves[0], reject: rejects[0] });
            thread.promiseCompletionsMap.set('43-0', { resolve: resolves[1], reject: rejects[1] });
        });

        it('should reject all promises on uncaught error', () => {
            thread._onError({ error: 'some error' });
            expect(rejects[0]).toHaveBeenCalledWith({ error: 'some error' });
            expect(rejects[1]).toHaveBeenCalledWith({ error: 'some error' });
            expect(resolves[0]).not.toHaveBeenCalled();
            expect(resolves[0]).not.toHaveBeenCalled();
            expect(thread.promiseCompletionsMap.has('42-0')).toBeFalsy();
            expect(thread.promiseCompletionsMap.has('43-0')).toBeFalsy();
        });

        it('should call onError callback if it is provided', () => {
            thread.options.onError = jest.fn();
            thread._onError({ error: 'some error' });
            expect(thread.options.onError).toHaveBeenCalledWith({ error: 'some error' });
        });
    });

    describe('createWorkerBlobFile', () => {
        const getCode = (func, options = {}): string => {
            BlobFileFactory.createJavaScriptObjectUrl = jest.fn();
            WorkerThread.createWorkerBlobFile(func, options);
            expect(BlobFileFactory.createJavaScriptObjectUrl).toHaveBeenCalled();
            return BlobFileFactory.createJavaScriptObjectUrl.mock.calls[0][0];
        };

        it('should add scripts for import when option is provided', () => {
            let code = getCode(() => {}, { importScripts: ['foo.js', 'bar.js', 'test.js'] });
            expect(code.indexOf("importScripts('foo.js', 'bar.js', 'test.js');")).not.toEqual(-1);

            code = getCode(() => {}, { importScripts: ['foo.js'] });
            expect(code.indexOf("importScripts('foo.js');")).not.toEqual(-1);
        });

        it('should not add scripts for import when option is not provided', () => {
            const code = getCode(() => {}, {}).indexOf('importScripts');
            expect(code).toEqual(-1);
        });

        describe('code for Worker', () => {
            let workerFuns;

            beforeEach(() => {
                const code = getCode((n) => {
                    if (n === 10) {
                        throw new Error('Foo bar error');
                    }
                    return n * 2;
                }).replace("'use strict';", '');

                workerFuns = Function(
                    `
                        const self = {};

                        ${code}

                        return {
                            self,
                            workerCommandExec,
                            workerCommandClose,
                            workerSendError,
                            threadFunc,
                        };
                    `,
                )();

                workerFuns.self.postMessage = jest.fn();
                workerFuns.self.close = jest.fn();
            });

            describe('threadFunc', () => {
                it('should init threadFunc', () => {
                    expect(typeof workerFuns.threadFunc).toEqual('function');
                    expect(workerFuns.threadFunc(2)).toEqual(4);
                });
            });

            describe('workerCommandExec', () => {
                it('should send message with result', () => {
                    expect(typeof workerFuns.workerCommandExec).toEqual('function');
                    workerFuns.workerCommandExec({ promiseId: '42', args: [22] });
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'ok',
                        promiseId: '42',
                        result: 44,
                    });
                });
            });

            describe('workerCommandClose', () => {
                it('should send message and close', () => {
                    expect(typeof workerFuns.workerCommandClose).toEqual('function');
                    workerFuns.workerCommandClose({ promiseId: '42' });
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'ok',
                        promiseId: '42',
                        result: true,
                    });
                    expect(workerFuns.self.close).toHaveBeenCalled();
                });
            });

            describe('workerSendError', () => {
                it('should send error message', () => {
                    expect(typeof workerFuns.workerSendError).toEqual('function');
                    workerFuns.workerSendError({ promiseId: '42' }, { name: 'foo', message: 'bar' });
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'error',
                        promiseId: '42',
                        error: {
                            type: 'foo',
                            message: 'bar',
                        },
                    });
                });
            });

            describe('self.onmessage', () => {
                it('should send message with result when command is "exec"', () => {
                    expect(typeof workerFuns.self.onmessage).toEqual('function');
                    workerFuns.self.onmessage(
                        {
                            data: {
                                command: 'exec',
                                promiseId: '42',
                                args: [22],
                            },
                        },
                    );
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'ok',
                        promiseId: '42',
                        result: 44,
                    });
                });

                it('should close worker when command is "close"', () => {
                    expect(typeof workerFuns.self.onmessage).toEqual('function');
                    workerFuns.self.onmessage(
                        {
                            data: {
                                command: 'close',
                                promiseId: '42',
                            },
                        },
                    );
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'ok',
                        promiseId: '42',
                        result: true,
                    });
                });

                it('should send error when command is wrong', () => {
                    expect(typeof workerFuns.self.onmessage).toEqual('function');
                    workerFuns.self.onmessage(
                        {
                            data: {
                                command: 'foo bar',
                                promiseId: '42',
                            },
                        },
                    );
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'error',
                        promiseId: '42',
                        error: {
                            type: 'WorkerCommand',
                            message: 'Wrong command "foo bar"',
                        },
                    });
                });

                it('should send error when error is thrown', () => {
                    expect(typeof workerFuns.self.onmessage).toEqual('function');
                    workerFuns.self.onmessage(
                        {
                            data: {
                                command: 'exec',
                                promiseId: '42',
                                args: [10],
                            },
                        },
                    );
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'error',
                        promiseId: '42',
                        error: {
                            type: 'Error',
                            message: 'Foo bar error',
                        },
                    });
                });
            });

            describe('self.onmessageerror', () => {
                it('should send error message', () => {
                    expect(typeof workerFuns.self.onmessageerror).toEqual('function');
                    workerFuns.self.onmessageerror(
                        {
                            data: {
                                promiseId: '42',
                            },
                        },
                    );
                    expect(workerFuns.self.postMessage).toHaveBeenCalledWith({
                        status: 'error',
                        promiseId: '42',
                        error: {
                            type: 'WorkerOnMessageError',
                            message: 'The onmessageerror event handler of the DedicatedWorkerGlobalScope interface '
                                + 'is an EventListener, called whenever an MessageEvent of type messageerror is fired '
                                + 'on the worker—that is, when it receives a message that cannot be deserialized.',
                        },
                    });
                });
            });

        });
    });

    describe('_postMessage', () => {
        it('should generate new promiseId if it is not provided', () => {
            thread._getNewPromiseId = jest.fn(() => '42-42');
            const message = {};
            const promise = thread._postMessage(message);
            expect(promise).toBeInstanceOf(Promise);
            expect(thread._getNewPromiseId).toHaveBeenCalled();
            expect(message.promiseId).toEqual('42-42');
        });

        it('should not generate new promiseId if it is provided', () => {
            thread._getNewPromiseId = jest.fn(() => '42-42');
            const message = { promiseId: '42-1' };
            const promise = thread._postMessage(message);
            expect(promise).toBeInstanceOf(Promise);
            expect(thread._getNewPromiseId).not.toHaveBeenCalled();
            expect(message.promiseId).toEqual('42-1');
        });

        it('should put resolve and reject functions to map by promiseId', () => {
            const promise = thread._postMessage({ promiseId: '42-1' });
            expect(promise).toBeInstanceOf(Promise);
            expect(thread.promiseCompletionsMap.has('42-1')).toBeTruthy();
            expect(typeof thread.promiseCompletionsMap.get('42-1').resolve).toEqual('function');
            expect(typeof thread.promiseCompletionsMap.get('42-1').reject).toEqual('function');
        });

        it('should return promise', () => {
            const message = { promiseId: '42-1' };
            const promise = thread._postMessage(message);
            expect(promise).toBeInstanceOf(Promise);
        });

        it('should post message to worker', () => {
            const message = { promiseId: '42-1' };
            const promise = thread._postMessage(message);
            expect(promise).toBeInstanceOf(Promise);
            expect(thread.worker.postMessage).toHaveBeenCalledWith(message);
        });

        it('should reject promise on catch error', (done) => {
            thread.worker.postMessage = jest.fn(() => {
                throw new Error('foo bar');
            });
            const message = { promiseId: '42-1' };
            const promise = thread._postMessage(message);
            expect(promise).toBeInstanceOf(Promise);
            expect(thread.worker.postMessage).toHaveBeenCalledWith(message);

            promise.catch((error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual('foo bar');
                done();
            });
        });
    });

    describe('exec', () => {
        it('should create and send message', () => {
            thread._postMessage = jest.fn();
            thread.exec(1, 2, 3);
            expect(thread._postMessage).toHaveBeenCalledWith({
                command: 'exec',
                args: [1, 2, 3],
            });
        });

        it('should return result of _postMessage', () => {
            const promise = Promise.resolve(42);
            thread._postMessage = jest.fn(() => promise);
            expect(thread.exec(1, 2, 3)).toEqual(promise);
        });
    });

    describe('close', () => {
        it('should create and send message', () => {
            thread._postMessage = jest.fn();
            thread.close();
            expect(thread._postMessage).toHaveBeenCalledWith({
                command: 'close',
            });
        });

        it('should return result of _postMessage', () => {
            const promise = Promise.resolve(true);
            thread._postMessage = jest.fn(() => promise);
            expect(thread.exec()).toEqual(promise);
        });
    });

    describe('terminate', () => {
        it('should call terminate for worker', () => {
            thread.terminate();
            expect(thread.worker.terminate).toHaveBeenCalled();
        });

        it('should return void answer', () => {
            expect(thread.terminate()).toBeUndefined();
        });
    });

});
