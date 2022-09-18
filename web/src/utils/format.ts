export function convertMinutesToTime(duration: number) {
    const hours = Math.floor(duration / 60)
    const minutes = Math.floor(duration % 60)
    const timeString = [hours, minutes]
    .map(value => String(value).padStart(2, '0'))
    .join(':')
    return timeString
}

export function convertHoursToMinutes(time: string) {
    const [hours, minutes] = time.split(':')
    return (parseInt(hours) * 60 + parseInt(minutes))
}

export function getDateFormatJson(date: string) {
    const dateArray = date.split('-').map(d => d.trim())
    return `${ dateArray[2] }/${ dateArray[1] }/${ dateArray[0] }`
}

export function formatWeekDaysToString(weekDays: boolean[]) {
    return weekDays.map(
        (weekDay, index) => weekDay && index
    ).filter(day => day !== false).join(',')
}