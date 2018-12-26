
import WorkerError from './WorkerError';

describe('WorkerError', () => {
    let error;

    beforeEach(() => {
        error = new WorkerError('SomeErrorType', 'Some error message', { foo: 'bar' });
    });

    describe('constructor', () => {
        it('should be instance of WorkerError', () => {
            expect(error).toBeInstanceOf(WorkerError);
        });

        it('should be instance of Error', () => {
            expect(error).toBeInstanceOf(Error);
        });

        it('should set message', () => {
            expect(error.message).toEqual('Some error message');
            expect((new WorkerError('foo', 'bar')).message).toEqual('bar');
        });

        it('should set type', () => {
            expect(error.type).toEqual('SomeErrorType');
            expect((new WorkerError('foo', 'bar')).type).toEqual('foo');
        });

        it('should set data', () => {
            expect(error.data).toEqual({ foo: 'bar' });
            expect((new WorkerError('foo', 'bar', 'test')).data).toEqual('test');
            expect((new WorkerError('foo', 'bar', 42)).data).toEqual(42);
        });
    });

    describe('getType', () => {
        it('should return type of error', () => {
            expect(error.getType()).toEqual('SomeErrorType');
            error.type = 'foo';
            expect(error.getType()).toEqual('foo');
        });
    });

    describe('getData', () => {
        it('should return data of error', () => {
            expect(error.getData()).toEqual({ foo: 'bar' });
            error.data = 'foo';
            expect(error.getData()).toEqual('foo');
        });
    });

});
