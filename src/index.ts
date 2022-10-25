import { DateTime } from 'luxon';
import { LangSpec } from './lib/model/LangSpec';

export class J0RLiteCalendar{
    public luxDate: DateTime;
    public langSpec: LangSpec;

    private calendarElement: HTMLElement;

    constructor(public jsDate: Date, public elementId: string){
        this.luxDate = DateTime.fromJSDate(jsDate);
        let el = document.querySelector(`#${elementId}`);
        if(!el){
            let el = document.createElement("div");
            el.id = elementId;
        }
        this.calendarElement = el as HTMLElement;

        this.langSpec = new LangSpec(["S", "M", "T", "W", "T", "F", "S"],
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        ["January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"]);
    }

    get elementRef(): HTMLElement{
        return this.calendarElement.cloneNode(true) as HTMLElement;
    }

    setLangSpec(newSpec: LangSpec){
        this.langSpec = newSpec;
    }
}