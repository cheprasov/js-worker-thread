// @flow strict

export interface ThreadInterface {

    /* static */ isSupported(): boolean;

    exec(...args: Array<any>): Promise;

    close(): Promise;

    terminate(): void;

}
