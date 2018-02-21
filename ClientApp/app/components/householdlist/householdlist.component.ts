import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FamilyMember, GoodType } from '../householddetails/householddetails.component';

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

        this.newHousehold = new Household();
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
  
export class Household {
    id: number;
    name: string;
    code: string;
    familyMembers: Array<FamilyMember> | null;
    goodTypes: Array<GoodType> | null;

    constructor() {

        this.id = 0;
        this.name = "";
        this.code = "";
        this.familyMembers = null;
        this.goodTypes = null;
    }

    public from(household: Household) {

        this.id = household.id;
        this.name = household.name;
        this.code = household.code;

        return this;
    }

    public loadFamilyMembers(http: Http, baseUrl: string) {
        http.get(baseUrl + 'api/Household/ListFamilyMembers/' + this.id).subscribe(result => {
            var temp_arr = result.json() as any[];
            this.familyMembers = temp_arr.map(input => new FamilyMember().from(input));
        });
    }

    public loadGoodTypes(http: Http, baseUrl: string) {
        http.get(baseUrl + 'api/Household/ListGoodTypes/' + this.id).subscribe(result => {
            debugger;
            var temp_arr = result.json() as any[];
            this.goodTypes = temp_arr.map(input => new GoodType().from(input));
        });
    }
}
