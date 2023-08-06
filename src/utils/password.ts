import * as crypto from 'crypto';

const generateSalt = () => {
    return crypto.randomBytes(16);
};

export const hashPassword = (password: string, salt: Buffer = generateSalt()) => {
    const iterations = 250000;
    const keyLength = 256 / 8;

    const hashed = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');

    return {
        hashed: hashed.toString('base64'),
        salt: salt.toString('base64'),
    };
};

export const verifyPassword = (password: string, hashed: string, salt: string) => {
    const saltBuffer = Buffer.from(salt, 'base64');
    const hashResult = hashPassword(password, saltBuffer);
    return hashResult.hashed === hashed;
};
