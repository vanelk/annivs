export function isSameMonth(date1, date2){
    return date1.getMonth() === date2.getMonth()
}
export function isEqual(date1, date2) {
    return (date1.getYear() === date2.getYear()) &&
        (date1.getMonth() === date2.getMonth()) &&
        (date1.getDate() === date2.getDate());
}
export function getDayOfWeek (date) {
    let d = new Date();
    if(isEqual(date, d)) return "Today";
    return new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
}
export function monthName(date){
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    return formatter.format(date);
}
export function dateToYMD(date){
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
export function changeMonth(date, val){
    return new Date(date.getFullYear(), date.getMonth()+val, 1);
}