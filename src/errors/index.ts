import * as util from 'util';
import Errors from './Errors';

const format = util.format;
const extend = <T extends object>(target: T, ...sources: object[]): T => {
    return Object.assign(target, ...sources);
};

const errors: any = {};
let OffsetMaxServiceFatalError: any;

/**
 * @param {(string | Object)} msg error message
 * @param {object} errDesc error description
 * @param {object} errDesc.message - default error message
 * @param {number} errDesc.statusCode default status code
 * @param {number} errDesc.customCode default custom code
 * @throws {TypeError} JSON.stringify of circular object
 * @returns
 */
function OffsetMaxServiceError(msg: string, errDesc: any, data: any) {
    const error: any = new Error();
    Error.captureStackTrace(error, OffsetMaxServiceError);

    error.status = error.statusCode = errDesc.statusCode;
    error.customCode = errDesc.customCode;
    error.errors = [];
    error._headers = {};

    if (!msg) {
        error.message = errDesc.message;
    } else if (typeof msg === 'string') {
        error.message = msg;
    } else {
        error.message = JSON.stringify(msg);
    }
    if (data) {
        error.data = data;
    }

    /**
     * add multiple errors to Error Object
     * @param {string} msg error description or Error object
     * @param {number} custom error code
     */
    function push(msg: any, code: any) {
        if (msg && typeof errors[msg.name] !== 'undefined') {
            error.errors = error.errors.concat(msg.errors);
            error.header(msg._headers);
            return error;
        }
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        error.errors.push({ msg: msg, code: code || error.customCode });
        return error;
    }

    /**
     * add response headers for error
     * @param {String|object} key header name or hash with header names and values
     * @param {*} [value] header value]
     * @returns error
     */
    function header(key: any, value: any) {
        if (
            arguments.length === 1 &&
            !Array.isArray(key) &&
            typeof key === 'object'
        ) {
            extend(error._headers, key);
            return error;
        }

        error._headers[key] = value || value === 0 ? String(value) : '';
        return error;
    }

    error.push = push;
    error.header = header;

    return error;
}

/**
 * Factory to create new Errors:
 * @param {string} errName nase
 * @param {Object} errDesc - description of error
 */
function errorFactory(errName: string, errDesc: any) {
    if (!errDesc.statusCode && !errDesc.customCode) {
        throw new Error(`Invalid error definition for ${errName}`);
    }

    if (!errDesc.customCode) {
        errDesc.customCode = errDesc.statusCode;
    }

    function CustomOffsetMaxServiceError(msg: string, data: any) {
        const error = OffsetMaxServiceError(msg, errDesc, data);
        Object.setPrototypeOf(error, CustomOffsetMaxServiceError.prototype);
        error.name = errName;
        error.push(error.message, error.customCode);
        return error;
    }

    CustomOffsetMaxServiceError.prototype = Object.create(
        OffsetMaxServiceError.prototype
    );
    CustomOffsetMaxServiceError.prototype.constructor =
        CustomOffsetMaxServiceError;

    return CustomOffsetMaxServiceError;
}

OffsetMaxServiceFatalError = errors.OffsetMaxServiceFatalError = errorFactory(
    'OffsetMaxServiceFatalError',
    { statusCode: 500 }
);

/**
 * helper to create new errors and load to global errors
 * @param {object} obj
 */
function registerErrors(obj: any) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        throw new OffsetMaxServiceFatalError(
            'Invalid argument to registerErrors. Only accepts objects.'
        );
    }

    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof errors[i] !== 'undefined') {
                throw new OffsetMaxServiceFatalError(`${i} already exists.`);
            }
            errors[i] = errorFactory(i, obj[i]);
        }
    }
}

registerErrors(Errors);

errors.OffsetMaxServiceError = OffsetMaxServiceError;
errors.registerErrors = registerErrors;
errors.errorFactory = errorFactory;

export default errors;
