export const SHIFT_DURATION = 7 * 60 * 60 * 1000 + 30 * 60 * 1000;

export const stringToMs = (string) => {
    const [hours, minutes] = string.split(':');
    return (parseInt(hours) * 60 + parseInt(minutes)) * 60000;
}
export const msToString = (milliSeconds) => {
    const totalMinutes = Math.floor(milliSeconds / 60000);
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    return `${hours}:${minutes}`
}
export const getTotalHours = (startDate, endDate, breakTime) => {
    if (!startDate || !endDate) return;
    let diffInMilliSeconds = endDate - startDate;
    if (breakTime) {
        diffInMilliSeconds -= breakTime;
    }
    return msToString(diffInMilliSeconds);
}

export const calculateExcess = function (totalHours, rangeStart, rangeEnd, rangeExcess, asString = true) {
    var start = stringToMs(rangeStart)
    var end = stringToMs(rangeEnd)
    if (start >= totalHours) {
        return asString? "00:00" : stringToMs("00:00")
    } else if (totalHours <= end) {
        return asString ? msToString(totalHours - start) : totalHours - start
    } else {
        return asString ? rangeExcess : stringToMs(rangeExcess)
    }
}

export const isMoreThanShift = function (total, shift) {
    return total > shift
}

