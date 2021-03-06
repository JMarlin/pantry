import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Household } from '../models/household';
import { FamilyMember } from '../models/familymember';
import { GoodType } from '../models/goodtype';
import * as Global from '../globals';

@Component({
    selector: 'householdlist',
    templateUrl: './householdlist.component.html',
    styleUrls: ['./householdlist.component.css']
})
export class HouseholdListComponent {

    public households: Household[] = [];
    public newHousehold: Household = new Household();
    private http: Http;
    private baseUrl: string;
    public globals: Global.GlobalSettings;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        this.globals = Global.s;
        this.http = http;
        this.baseUrl = baseUrl;
        this.initNewHousehold();
        this.refreshHouseholdList();
    }

    private refreshHouseholdList() {

        this.http.get(this.baseUrl + 'api/Households/List').subscribe(result => {
            var temp_arr = result.json() as any[];
            this.households = temp_arr.map(input => new Household().from(input));
        }, error => console.error(error));
    }

    public setActiveHousehold(household: Household) {

        this.globals.household = household;
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
  
