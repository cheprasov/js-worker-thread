import NoopThread from './NoopThread';

describe('NoopThread', () => {

    it('should implements ThreadInterface', () => {
        expect(typeof NoopThread.isSupported).toEqual('function');
        const thread = new NoopThread();
        expect(typeof thread.exec).toEqual('function');
        expect(typeof thread.close).toEqual('function');
        expect(typeof thread.terminate).toEqual('function');
    });

    describe('isSupported', () => {
        it('should return true', () => {
            expect(NoopThread.isSupported()).toBeTruthy();
        });
    });

    describe('exec', () => {
        it('should return resolved promise', (done) => {
            const thread = new NoopThread();
            const promise = thread.exec();
            expect(promise).toBeInstanceOf(Promise);
            promise.then(result => {
                expect(result).toBeUndefined();
                done();
            });
        });
    });

    describe('close', () => {
        it('should return resolved promise', (done) => {
            const thread = new NoopThread();
            const promise = thread.close();
            expect(promise).toBeInstanceOf(Promise);
            promise.then(result => {
                expect(result).toBeTruthy();
                done();
            });
        });
    });

    describe('terminate', () => {
        it('should return void', () => {
            const thread = new NoopThread();
            expect(thread.terminate()).toBeUndefined();
        });
    });

});
