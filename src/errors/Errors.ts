const errors = {
    BadRequest: {
        message: 'Bad Request',
        customCode: 'BAD_REQUEST',
        statusCode: 400,
    },
    Unauthorized: {
        message: 'Authorization Required.',
        customCode: 'UNAUTHORIZED',
        statusCode: 401,
    },
    Forbidden: {
        message: 'Access Denied',
        customCode: 'FORBIDDEN',
        statusCode: 403,
    },
    NoRecordFound: {
        message: 'No Record Found',
        customCode: 'NO_RECORD_FOUND',
        statusCode: 404,
    },
    NotAllowed: {
        message: 'Method Not Allowed',
        customCode: 'METHOD_NOT_ALLOWED',
        statusCode: 405,
    },
    Conflict: {
        message: 'Conflict',
        customCode: 'CONFLICT',
        statusCode: 409,
    },
    Duplicate: {
        message: 'Duplicate Key',
        customCode: ' DUPLICATE',
        statusCode: 409,
    },
    PreConditionFailed: {
        message: 'Validation errors/Invalid arguments',
        customCode: 'VALIDATION_ERROR',
        statusCode: 412,
    },
    PayloadTooLargeError: {
        message: 'Request Entity Too Large',
        customCode: 'PAYLOAD_TO_LARGE',
        statusCode: 413,
    },
    Internal: {
        message: 'Internal Server Error',
        customCode: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
    },
    BadGateway: {
        message: 'Bad Gateway',
        customCode: 'BAD_GATEWAY',
        statusCode: 502,
    },
    ServiceUnavailable: {
        message: 'Sservice Not Available',
        customCode: 'SERVICE_UNAVAILABLE_ERROR',
        statusCode: 503,
    },
    GatewayTimeout: {
        message: 'Gateway Timeout',
        customCode: 'GATEWAY_TIMEOUT',
        statusCode: 504,
    },
};

export default errors;
