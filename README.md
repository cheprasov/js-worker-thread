[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/worker-thread
=========

The WorkerThread wraps a Web Worker with a Promise, also the class creates a worker script on the fly (without having to create separate worker files). You can "inline" your worker function in the same js file as main logic.

##### Features:
- Wraps a Web Worker with a Promise.
- You do not need to use separate js file for a Web Worker.
- You can use function or string with code to create a Web Worker.
- Will simulate a worker via timeout if Web Worker is not supported.
- Allows to throw an Error in Worker scope, and catch it by Promise.

### 1. How to install

```bash
> npm install @cheprasov/worker-thread
```

```javascript
import { ThreadFactory } from '@cheprasov/worker-thread';
```

### 2. Quick examples

Simple function for sum

```javascript
import { ThreadFactory } from '@cheprasov/worker-thread';

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
```

Thread functions can return objects, arrays and so on

```javascript
const threadDeepCopyObject = ThreadFactory.createThread(obj => obj);

const obj1 = { foo: 'bar', num: 42 };
threadDeepCopyObject.exec(obj1).then((copyObj) => {
    copyObj.foo = 'upd';
    console.log('Copy', copyObj, 'Orig', obj1);
    // Copy {foo: "upd", num: 42} Orig {foo: "bar", num: 42}
});
```

Several function in one thread

```javascript
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
```

Errors. Thread allows to throw an Errors and catch it by Promise

```javascript
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
// DataCloneError: Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': #<DedicatedWorkerGlobalScope> could not be cloned.
```

### 3. Documentation

#### Class `ThreadFactory`
It is a factory class for creating instances of WorkerThread, TimeoutThread, NoopTread.

##### `static` createThread(function, options): `WorkerInterface`
The method will creates an instance of `WorkerThread` if Web Worker is supported, otherwise it will create an instance of `TimeoutThread` if function `setTimeout` is supported, otherwise it will create an instance of `NoopThread`.

The method helps to run your code for wide range of browser by running workers code via timeout (`TimeoutThread`) if the browser does not support Web Workers.

**arguments:**

- `function` - the function that will be used for web worker. 
- `options` - `default = {}` Parameters for a new worker. See more here: https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
    - `importScripts` - `default = []` - Array of strings. A list of scripts which Web Worker for work. https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts
    - `name` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `type` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `credentials` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `onError`: Function - A function that will be called if an error is occurred on creating of Web Worker. The function receives `ErrorEvent` as argument.
    
Example: 
```javascript
import { ThreadFactory } from '@cheprasov/worker-thread';

const threadSum = ThreadFactory.createThread(
        (a, b) => a + b,
        {
            importScripts: ['foo.js', 'bar.js'],
            onError: (error) => {
                // it will be error, because it can import specified scripts 
                console.log('Error', error);
            },
        }
    );

```

##### `static` createWorkerThread(function | string, options): `WorkerThread`
The method creates an instance of `WorkerThread` without any checking for support.
See method `createThread` for description of arguments.  

##### `static` createTimeoutThread(function, options): `TimeoutThread`
The method creates an instance of `TimeoutThread` without any checking for support.
See method `createThread` for description of arguments.  

##### `static` createNoopThread(function, options): `NoopThread`
The method creates an instance of `NoopThread` without any checking for support.
See method `createThread` for description of arguments.  


#### Class `WorkerThread`
The WorkerThread wraps a Web Worker with a Promise, also the class creates a worker script on the fly (without having to create separate worker files). You can "inline" your worker function in the same js file as main logic.

See more https://developer.mozilla.org/en-US/docs/Web/API/Worker

##### `static` isSupported(): `boolean`
Method checks browser for support of `WorkerThread`

##### constructor(Function | string, options)
Also, please see `ThreadFactory`.

**arguments:**

- `function` - the function that will be used for web worker. Also, you can user string with code for worker.
- `options` - `default = {}` Parameters for a new worker. See more here: https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
    - `importScripts` - `default = []` - Array of strings. A list of scripts which Web Worker for work. https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts
    - `name` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `type` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `credentials` - see https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#Parameters
    - `onError`: Function - A function that will be called if an error is occurred on creating of Web Worker. The function receives `ErrorEvent` as argument.
    
##### exec(...args): `Promise`
The methods executes worker's function and passes arguments to it, and returns of `Promise`, which will be resolved when the function is finished.

##### close(): `Promise`
The method of the DedicatedWorkerGlobalScope interface discards any tasks queued in the DedicatedWorkerGlobalScope's event loop, effectively closing this particular scope. 

##### terminate(): `void`
The method immediately terminates the Worker. This does not offer the worker an opportunity to finish its operations; it is simply stopped at once.

Example:
```javascript
import { WorkerThread } from '@cheprasov/worker-thread';

const threadSum = new WorkerThread((a, b) => a + b);

threadSum.exec(2, 3).then((result) => {
    console.log('a + b =', result);
    // a + b = 5
    threadSum.close();
});
```
    
#### Class `TimeoutThread`
The `TimeoutThread` emulates `WorkerThread` via using `setTimeout` function.

See more https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

##### `static` isSupported(): `boolean`
Method checks browser for support of `TimeoutThread`

##### constructor(Function)
Also, please see `ThreadFactory`.

**arguments:**

- `function` - the function that will be used.
    
##### exec(...args): `Promise`
The methods executes work function and passes arguments to it, and returns of `Promise`, which will be resolved when the function is finished.

##### close(): `Promise`
The method immediately stops the work function. This does not offer an opportunity to finish its operations.

##### terminate(): `void`
The same like method `close()`, but without a `Promise`

Example:
```javascript
import { TimeoutThread } from '@cheprasov/worker-thread';

const threadSum = new TimeoutThread((a, b) => a + b);

threadSum.exec(2, 3).then((result) => {
    console.log('a + b =', result);
    // a + b = 5
});
```

#### Error class `WorkerError`
All thrown error in Web Worker's code will be returned to a `Promise` like instance of `WorkerError`.

The error has `type`, `message` and `data`.

```javascript
const threadError = ThreadFactory.createThread((num) => {
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

threadError.exec(0).then().catch(onError);
// Error: Some message

threadError.exec(42).then().catch(onError);
// DataCloneError: Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': #<DedicatedWorkerGlobalScope> could not be cloned.
```

The methods do nothing.

#### Class `NoopThread`
The `NoopThread` is a stub and it does nothing. 

##### `static` isSupported(): `boolean`
Always return `true`;

##### exec(...args): `Promise`
##### close(): `Promise`
##### terminate(): `void`

The methods do nothing.

## Something does not work

Feel free to fork project, fix bugs, tests and finally request for pull
