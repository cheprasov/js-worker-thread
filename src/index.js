import ThreadFactory from './ThreadFactory';

// const thread1 = ThreadFactory.createThread((a, b) => a + b);
// thread1.exec(1, 2).then((result) => {
//     console.log('result', result);
// });
// thread1.exec(window, 2).catch((error) => {
//     console.log('Error', error);
// });
//
// const thread2 = ThreadFactory.createThread(
//     'a(a, b) => a + b',
//     {
//         onError: (error) => {
//             console.dir(error);
//         }
//     }
// );
//
// thread2.exec(1, 2).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });


// const thread3 = ThreadFactory.createThread(() => {
//     throw new Error('SOME ERROR');
// });
//
// thread3.exec(1, 2).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });


const thread4 = ThreadFactory.createThread(Function('a', `
    if (a === 0) {
        return 0;
    }
    if (a === 1) {
        return self;
    }
    if (a === 2) {
        throw new Error('SOME ERROR')
    }
    if (a === 3) {
        return a * b * c;
    }
    if (a === 4) {
        return new SharedArrayBuffer();
    }
    return a;
`));

// thread4.exec(0).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });
//
// thread4.exec(1).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });
//
// thread4.exec(2).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });
//
// thread4.exec(3).then((result) => {
//     console.log('result', result);
// }).catch((e) => {
//     console.log('error', e);
// });

thread4.exec(2).then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('error', e);
});
