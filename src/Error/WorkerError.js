// @flow strict

export default class WorkerError extends Error {

    type: string;
    data: any;

    constructor(type: string, message: ?string = '', data: any = null) {
        super(message);
        this.type = type;
        this.data = data;
    }

    getType(): string {
        return this.type;
    }

    getData(): string {
        return this.data;
    }

}
