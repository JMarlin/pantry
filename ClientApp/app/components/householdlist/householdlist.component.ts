import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'householdlist',
    templateUrl: './householdlist.component.html',
    styleUrls: ['./householdlist.component.css']
})
export class HouseholdListComponent {

    public households: Household[];
    public newHousehold: Household;
    private http: Http;
    private baseUrl: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        this.http = http;
        this.baseUrl = baseUrl;
        this.initNewHousehold();
        this.refreshHouseholdList();
    }

    private refreshHouseholdList() {

        this.http.get(this.baseUrl + 'api/Households/List').subscribe(result => {
            this.households = result.json() as Household[];
        }, error => console.error(error));
    }

    private initNewHousehold() {

        this.newHousehold = <Household> {  
            id: 0,
            name: "",
            code: "",
            familyMembers: null
        };
    }

    public fixupCodeLength() {

        if(this.newHousehold.code.length > 5) {

            this.newHousehold.code =
                this.newHousehold.code.substring(0, 5);
        }
    }

    public requestCreateHousehold() {

        //Link newHousehold to the UI and send its info off to api/Households/Add
        this.http.put(this.baseUrl + 'api/Households/Add', this.newHousehold).subscribe(result => {
            this.refreshHouseholdList();
        }, error => console.error(error));

        this.initNewHousehold();
    }

    public requestDeleteHousehold(id: number) {

        this.http.delete(this.baseUrl + 'api/Households/Delete/' + id).subscribe(result => {
            this.refreshHouseholdList();
        }, error => console.error(error));
    }
}
  
interface Household {
    id: number;
    name: string;
    code: string;
    familyMembers: Array<object> | null;
}
