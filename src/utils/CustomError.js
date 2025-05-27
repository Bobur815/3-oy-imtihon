export default class CustomError extends Error {
    constructor(message, status=500, name="CustomError") {
        super(message);
        this.status = status;
        this.name = name;
    }
}
