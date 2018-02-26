import { Http } from '@angular/http';

export class FamilyMember {
    id: number;
    firstName: string;
    lastName: string;

    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
    }

    public from(input: any) {

        this.id = input.id;
        this.firstName = input.firstName;
        this.lastName = input.lastName;

        return this;
    }
}