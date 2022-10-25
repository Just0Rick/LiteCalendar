import { DateTime } from "luxon";
import { IDated } from "../interfaces/IDated";

export class DayData<TEventsObj extends IDated> {
    public unixTimestamp: number;
    public isActive: boolean = false;
    public luxDate: DateTime;

    constructor(
        public dateNumber: number,
        public date: Date,
        public events: TEventsObj[]
    ){
        this.luxDate = DateTime.fromJSDate(date);
        this.unixTimestamp = this.luxDate.toUnixInteger();
    }
}