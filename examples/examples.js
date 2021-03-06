import { ThreadFactory, TimeoutThread } from '../src/index';

// Simple function for sum

const threadSumAB = ThreadFactory.createThread((a, b) => a + b);

threadSumAB.exec(2, 3).then((result) => {
    console.log('a + b =', result);
    // a + b = 5
});

const threadSumMulti = ThreadFactory.createThread((...args) => {
    return args.reduce((result, value) => result + value, 0);
});

threadSumMulti.exec(1, 2, 3, 4, 5).then((result) => {
    console.log('a1 + ... + aN =', result);
    // a1 + ... + aN = 15
});

// Thread functions can return objects, arrays and so on

const threadDeepCopyObject = ThreadFactory.createThread(obj => obj);

const obj1 = { foo: 'bar', num: 42 };
threadDeepCopyObject.exec(obj1).then((copyObj) => {
    copyObj.foo = 'upd';
    console.log('Copy', copyObj, 'Orig', obj1);
    // Copy {foo: "upd", num: 42} Orig {foo: "bar", num: 42}
});

// Several function in one thread

const threadMultiCmd = ThreadFactory.createThread((cmd, a, b) => {
    switch (cmd) {
        case 'sum': return a + b;
        case 'max': return Math.max(a, b);
        default: return null;
    }
});

threadMultiCmd.exec('sum', 1, 2).then((result) => {
    console.log('Cmd: sum, a + b =', result);
    // Cmd: sum, a + b = 3
});


// Errors

// Thread allows to throw Errors

const throwError = ThreadFactory.createThread((num) => {
    if (!num) {
        throw new Error('Some message');
    }
    if (num === 42) {
        // the code works in DedicatedWorkerGlobalScope
        // see https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
        return self;
    }
    return 1 / num;
});

const onError = (error) => {
    console.log(`${error.type}: ${error.message}`);
};

throwError.exec(0).then().catch(onError);
// Error: Some message

throwError.exec(42).then().catch(onError);
// DataCloneError: Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': #<DedicatedWorkerGlobalScope>
// could not be cloned.
