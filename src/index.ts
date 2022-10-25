import { DateTime } from 'luxon';
import { LangSpec } from './lib/model/LangSpec';
import { DayData } from './lib/model/DayData';
import { IDated } from './lib/interfaces/IDated';

export class J0RLiteCalendar<TEventData extends IDated>{
    public luxDate: DateTime;
    public langSpec: LangSpec;

    private cursor: DateTime;
    private events: TEventData[] = [];

    private calendarElement: HTMLElement;

    constructor(public jsDate: Date, public elementId: string){
        this.luxDate = DateTime.fromJSDate(jsDate);
        this.cursor = this.luxDate.startOf("month");
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

    setEvents(newEvents: TEventData[]){
        this.events = newEvents;
        this.render();
    }

    setLangSpec(newSpec: LangSpec){
        this.langSpec = newSpec;
    }

    generateMonthArray(dateTime: DateTime){
        let monthArray = [];
        let leftOffset: number = dateTime.weekday + 1;
        let localCursor = dateTime.minus({ days: leftOffset });
        while(localCursor.month < dateTime.month + 1){
            let weekArray: DayData<TEventData>[] = [];
            for(let i = 0; i < 7; i++){
                localCursor = localCursor.plus({ days: 1});
                let unx = localCursor.startOf("day").toUnixInteger();
                let dayta: DayData<TEventData> = new DayData<TEventData>(localCursor.day, 
                    localCursor.toJSDate(), 
                    this.events.filter( x => DateTime.fromJSDate(x.date).startOf("day").toUnixInteger() == unx));
                weekArray.push(dayta);
            }
            monthArray.push(weekArray);
        }
        return monthArray;
    }

    // Pendiente de implementar
    render(){ }
}