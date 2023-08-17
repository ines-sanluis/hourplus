export const SHIFT_DURATION = 7 * 60 * 60 * 1000 + 30 * 60 * 1000

export const stringToMs = (string) => {
  const [hours, minutes] = string.split(":")
  return (parseInt(hours) * 60 + parseInt(minutes)) * 60000
}
export const msToString = (milliSeconds) => {
  const totalMinutes = Math.floor(milliSeconds / 60000)
  let hours = Math.floor(totalMinutes / 60)
  let minutes = totalMinutes % 60
  hours = (hours < 10 ? "0" : "") + hours
  minutes = (minutes < 10 ? "0" : "") + minutes
  return `${hours}:${minutes}`
}
export const getTotalHours = (startDate, endDate, breakTime) => {
  if (!startDate || !endDate) return
  let diffInMilliSeconds = endDate - startDate
  if (breakTime) {
    diffInMilliSeconds -= breakTime
  }
  return msToString(diffInMilliSeconds)
}

export const calculateExcess = function (
  totalHours,
  rangeStart,
  rangeEnd,
  rangeExcess,
  asString = false
) {
  const start = stringToMs(rangeStart)
  const end = stringToMs(rangeEnd)
  if (start >= totalHours) {
    return asString ? "00:00" : stringToMs("00:00")
  } else if (totalHours <= end) {
    return asString ? msToString(totalHours - start) : totalHours - start
  } else {
    return asString ? rangeExcess : stringToMs(rangeExcess)
  }
}

export const calculateCompensation = (
  userId,
  startDate,
  endDate,
  breakTime,
  shift,
  isFreeDay,
) => {
  const underworkedMs = {
    total: 0,
  }
  let isOverworked = false
  const overworkedMs = {
    total: 0,
    firstRange: 0,
    secondRange: 0,
    thirdRange: 0,
  }
  const compensatedMs = {
    total: 0,
    firstRange: 0,
    secondRange: 0,
    thirdRange: 0,
  }
  // Calculate total hours worked
  let totalMs = endDate - startDate
  if (breakTime) {
    totalMs -= breakTime
  }
  // On free days, calculate total hours worked
  if (isFreeDay) {
    compensatedMs.total = totalMs * 1.25
  } else if (hasOverworked(totalMs, shift)) {
    isOverworked = true
    overworkedMs.total = totalMs - shift
    overworkedMs.firstRange = calculateExcess(totalMs, "7:30", "09:00", "01:30")
    overworkedMs.secondRange = calculateExcess( totalMs, "09:00", "12:00", "03:00" )
    overworkedMs.thirdRange = calculateExcess( totalMs, "12:00", "14:00", "02:00" )
    compensatedMs.firstRange = overworkedMs.firstRange
    compensatedMs.secondRange = overworkedMs.secondRange * 1.5
    compensatedMs.thirdRange = overworkedMs.thirdRange * 2
    compensatedMs.total =
      compensatedMs.firstRange +
      compensatedMs.secondRange +
      compensatedMs.thirdRange
  } else {
    underworkedMs.total = shift - totalMs
  }

  return {
    userId,
    worked: {
      start: startDate,
      end: endDate,
      break: breakTime,
      shiftDuration: shift,
      total: totalMs,
    },
    overworked: overworkedMs,
    underworked: underworkedMs,
    compensated: compensatedMs,
    isFreeDay,
    hasOverworked: isOverworked,
  }
}

export const hasOverworked = function (msWorked, shiftDuration) {
  return msWorked > shiftDuration
}

export const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
})
