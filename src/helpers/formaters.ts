 export function getFormatedDate(dateRaw: Date) {
        const date = new Date(dateRaw);
        const day = getPadedNumber(date.getDate());
        const month = getPadedNumber(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${day}.${month}.${year}` 
    }

export function getPadedNumber(number: number) {
    return number < 10 ? `0${number}` : number;
}