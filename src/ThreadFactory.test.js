import ThreadFactory from './ThreadFactory';
import WorkerThread from './Thread/WorkerThread';
import TimeoutThread from './Thread/TimeoutThread';
import NoopThread from './Thread/NoopThread';

jest.mock('./Blob/BlobFileFactory');

describe('ThreadFactory', () => {
    global.Worker = function () {};
    const threadFunc = (a => a);

    describe('createThread', () => {
        beforeEach(() => {
            WorkerThread.isSupported = jest.fn(() => true);
            TimeoutThread.isSupported = jest.fn(() => true);
        });

        it('should create WorkerThread if it is supported', () => {
            const thread = ThreadFactory.createThread(threadFunc);
            expect(thread).toBeInstanceOf(WorkerThread);
        });

        it('should create TimeoutThread if WorkerThread is not supported', () => {
            WorkerThread.isSupported = jest.fn(() => false);
            const thread = ThreadFactory.createThread(threadFunc);
            expect(thread).toBeInstanceOf(TimeoutThread);
        });

        it('should create NoopThread if WorkerThread & TimeoutThread are not supported', () => {
            WorkerThread.isSupported = jest.fn(() => false);
            TimeoutThread.isSupported = jest.fn(() => false);
            const thread = ThreadFactory.createThread(threadFunc);
            expect(thread).toBeInstanceOf(NoopThread);
        });
    });

    describe('createWorkerThread', () => {
        it('should create WorkerThread', () => {
            const thread = ThreadFactory.createWorkerThread(threadFunc);
            expect(thread).toBeInstanceOf(WorkerThread);
        });
    });

    describe('createTimeoutThread', () => {
        it('should create WorkerThread', () => {
            const thread = ThreadFactory.createTimeoutThread(threadFunc);
            expect(thread).toBeInstanceOf(TimeoutThread);
        });
    });

    describe('createNoopThread', () => {
        it('should create NoopThread', () => {
            const thread = ThreadFactory.createNoopThread(threadFunc);
            expect(thread).toBeInstanceOf(NoopThread);
        });
    });

});
