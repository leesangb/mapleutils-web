export class PasswordNotMatchError extends Error {
    constructor() {
        super('Password does not match');
    }
}

export class NotFoundError extends Error {
    constructor(name: string) {
        super(`${name} not found`);
    }
}
