import TimeoutThread from './TimeoutThread';

jest.useFakeTimers();

describe('TimeoutThread', () => {

    it('should implements ThreadInterface', () => {
        expect(typeof TimeoutThread.isSupported).toEqual('function');
        const thread = new TimeoutThread();
        expect(typeof thread.exec).toEqual('function');
        expect(typeof thread.close).toEqual('function');
        expect(typeof thread.terminate).toEqual('function');
    });

    describe('isSupported', () => {
        it('should return true if setTimeout is function', () => {
            expect(TimeoutThread.isSupported()).toBeTruthy();
        });

        it('should return false if setTimeout is not function', () => {
            const originSetTimeout = global.setTimeout;
            global.setTimeout = undefined;
            expect(TimeoutThread.isSupported()).toBeFalsy();
            global.setTimeout = originSetTimeout;
        });
    });

    describe('exec', () => {
        it('should return promise & resolve it', (done) => {
            const func = jest.fn(n => n * 2);
            const thread = new TimeoutThread(func);
            const promise = thread.exec(2);
            expect(func).not.toHaveBeenCalled();
            expect(promise).toBeInstanceOf(Promise);

            promise.then(result => {
                expect(func).toHaveBeenCalledWith(2);
                expect(result).toEqual(4);
                done();
            });

            jest.runAllTimers();
        });
    });

    describe('close', () => {
        it('should return promise & resolve it', (done) => {
            const func = jest.fn(n => n * 2);
            const thread = new TimeoutThread(func);
            expect(thread.threadFunc).toEqual(func);

            const promise = thread.close();
            expect(func).not.toHaveBeenCalled();
            expect(promise).toBeInstanceOf(Promise);
            expect(thread.threadFunc).not.toEqual(func);

            promise.then(result => {
                expect(result).toBeTruthy();
                done();
            });

            jest.runAllTimers();
        });

        it('should not call threadFunc if thread is closed', (done) => {
            const func = jest.fn(n => n * 2);
            const thread = new TimeoutThread(func);
            const promiseClose = thread.close();
            const promiseExec = thread.exec(2);

            Promise.all([promiseClose, promiseExec]).then((values) => {
                expect(values).toEqual([true, undefined]);
                expect(func).not.toHaveBeenCalled();
                done();
            });

            jest.runAllTimers();
        });
    });

    describe('terminate', () => {
        it('should return void', () => {
            const thread = new TimeoutThread();
            expect(thread.terminate()).toBeUndefined();
        });

        it('should not call threadFunc if thread is terminated', (done) => {
            const func = jest.fn(n => n * 2);
            const thread = new TimeoutThread(func);
            thread.terminate();
            const promiseExec = thread.exec(2);

            promiseExec.then(value => {
                expect(value).toBeUndefined();
                expect(func).not.toHaveBeenCalled();
                done();
            });

            jest.runAllTimers();
        });
    });

});
