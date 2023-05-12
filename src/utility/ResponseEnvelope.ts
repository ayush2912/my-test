import constants from './constants/ResponseConstants';
import SuccessResponse from '../interfaces/successResponse.interface';

/**
 * @description This method will return a envelope for success response
 * @param { Object } { data, status_code, msg, customCode }
 * @returns { Object } { status, status_code, message, data, customCode }
 */
function formatSuccessResponse({
    data = {},
    statusCode,
    msg = constants.DEFAULT_SUCCESS_MESSAGE,
    customCode = 'DEFAULT_SUCCESS_MESSAGE',
    count,
}: SuccessResponse) {
    return {
        status: constants.SUCCESS,
        statusCode: statusCode,
        message: msg,
        data: data,
        count: count,
        customCode: customCode,
    };
}

export default formatSuccessResponse;
