export class LangSpec{
    constructor(
        public days: Array<string>,
        public daysLong: Array<string>,
        public months: Array<string>,
        public monthsLong: Array<string>
    ) {
        const inRange = (arr: Array<string>, type: boolean = true) => {
            let upperLim = type ? 7 : 12;
            return arr.length > 0 && arr.length <= upperLim;
        };

        if(!inRange(days) || !inRange(daysLong) || !inRange(months, false) || !inRange(monthsLong, false)){
            throw new Error("Not enough elements in one or more of the langSpec arrays");
        }
    }
}