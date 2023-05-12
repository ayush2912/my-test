/**
 * This method get format date from 'YYYY-MM-DD' to 'YYYY-MM-DDTHH:mm:ss.SSSZ'.
 * @param {Date} value date
 * @returns {date-time}  formatted date
 */
function formatDate(value: Date) {
    const date = new Date(value);
    const isoString = date.toISOString();
    return new Date(isoString.slice(0, 10) + 'T00:00:00.000Z');
}

/**
 * This method used to compare two nested object and return updated object with keys.
 * @param {object} obj1 object 1
 * @param {object} obj2 Object 2
 * @returns {object} objects with updated keys
 */
function compareAndUpdate(obj1: any, obj2: any) {
    const updated: any = {};
    for (const key in obj2) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (Array.isArray(value1) && Array.isArray(value2)) {
            if (!value1.every((v, i) => v === value2[i])) {
                updated[key] = value2;
            }
        } else if (value1 instanceof Date && value2 instanceof Date) {
            if (value1.getTime() !== value2.getTime()) {
                updated[key] = value2;
            }
        } else if (value1 !== value2) {
            updated[key] = value2;
        }
    }
    return updated;
}

export { formatDate, compareAndUpdate };
