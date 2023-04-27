import { Request, Response } from 'express';
import constants from './utility/constants/StatusConstants';
import errors from './errors';

/**
 * response using successfull result of service
 * @param {object} serviceResult
 * @returns {object} object with 'result' and success 'status'
 */
function constructResponse(serviceResult: any) {
    const status = serviceResult?.status_code || constants.SOURCE_OK;

    if (serviceResult?.status_code) delete serviceResult.status_code;

    const result = {
        body: serviceResult || null,
        headers: serviceResult || {},
        status: status,
    };

    return result;
}

/**
 * This method will help in adding headers to the request
 * @param {*} res
 * @param {*} headers
 */
function safelySetHeaders(res: Response, headers: any) {
    if (res.headersSent) return;

    res.header(headers);
}

/**
 * resolves an exception to appropriate response
 * @param {object} err
 * @returns {object} with 'body' and 'status' keys
 */
function constructErrorResponse(err: any) {
    if (!(err instanceof Error)) {
        console.warn(
            'WARNING: Expecting Error',
            JSON.stringify(err) ||
                (err.tostring && err.toString()) ||
                'invalid argument'
        );
    }

    if (err.name === 'PayloadTooLargeError') {
        err = new errors.PayloadTooLargeError();
    }

    if (
        typeof errors[err.name] === 'undefined' ||
        err.name === 'OffsetMaxServiceFatalError' ||
        !err.statusCode
    ) {
        // something went really wrong?
        // creating sanitized Internal Server Error'
        err = new errors.Internal();
    }

    const errResponse = toResponse(err);
    return errResponse;
}

/**
 * convert Error object to form required for response
 * @returns (object) with 'body', 'headers', 'status' keys.
 */
function toResponse(error: any) {
    const result = {
        body: { errors: error.errors },
        headers: error._headers,
        status: error.statusCode,
    };
    return result;
}

export { constructResponse, safelySetHeaders, constructErrorResponse };
