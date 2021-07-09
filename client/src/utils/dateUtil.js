export function isSameMonth(date1, date2){
    if(!date1 || !date2) return false;
    return date1.getMonth() === date2.getMonth()
}
export function isSameDateInYear (date1, date2){
    if(!date1 || !date2) return false;
    return isSameMonth(date1, date2) && (date1.getDate() === date2.getDate())
}
export function isEqual(date1, date2) {
    if(!date1 || !date2) return false;
    return (date1.getYear() === date2.getYear()) &&
        (date1.getMonth() === date2.getMonth()) &&
        (date1.getDate() === date2.getDate());
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