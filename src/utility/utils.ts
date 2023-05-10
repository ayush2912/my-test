import moment from 'moment';

/**
 * This method get format date from 'YYYY-MM-DD' to 'YYYY-MM-DDTHH:mm:ss.SSSZ'.
 * @param {Date} value date
 * @returns {date-time}  formatted date
 */
function formatDate(value: Date) {
    const date = new Date(value);
    const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return formattedDate;
}

export { formatDate };