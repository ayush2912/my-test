import constants from './constants/ResponseConstants';
import SuccessResponse from '../interfaces/successResponse.interface';

/**
 * @description This method will return a envelope for success response
 * @param { Object } { data, status_code, msg, custom_code }
 * @returns { Object } { status, status_code, message, data, custom_code }
 */
function formatSuccessResponse({
    data = {},
    status_code,
    msg = constants.DEFAULT_SUCCESS_MESSAGE,
    custom_code = 'DEFAULT_SUCCESS_MESSAGE',
}: SuccessResponse) {
    return {
        status: constants.SUCCESS,
        status_code: status_code,
        message: msg,
        data: data,
        custom_code: custom_code,
    };
}

export default formatSuccessResponse;
