import { Http } from '@angular/http';

export class GoodType {
    id: number;
    name: string;
    defaultMeasure: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.defaultMeasure = "";
    }

    public from(input: any) {

        this.id = input.id;
        this.name = input.name;
        this.defaultMeasure = input.defaultMeasure;

        return this;
    }
}
