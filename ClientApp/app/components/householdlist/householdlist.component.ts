import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'householdlist',
    templateUrl: './householdlist.component.html'
})
export class HouseholdListComponent {

    public households: Household[];
    public newHousehold: Household;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        http.get(baseUrl + 'api/Households/List').subscribe(result => {
            this.households = result.json() as Household[];
        }, error => console.error(error));
    }

    public requestCreateHousehold() {

        //Link newHousehold to the UI and send its info off to api/Households/Add
    }
}

interface Household {
    id: number;
    name: string;
    code: string;
}
