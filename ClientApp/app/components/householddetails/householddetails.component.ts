import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'householddetails',
    templateUrl: './householddetails.component.html',
    styleUrls: ['./householddetails.component.css']
})
export class HouseholdDetailsComponent {

    //public household: HouseholdListComponent.Household;
    public familyaMembers: FamilyMember[];
    public newFamilyMember: FamilyMember;
    private household_id: number;
    private http: Http;
    private baseUrl: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private _Activatedroute:ActivatedRoute) {

        this.household_id = this._Activatedroute.snapshot.params['id'];
        this.http = http;
        this.baseUrl = baseUrl;
        this.initNewFamilyMember();
        this.refreshFamilyMemberList();
    }

    private refreshFamilyMemberList() {

        this.http.get(this.baseUrl + 'api/Households/List').subscribe(result => {
            this.familyaMembers = result.json() as FamilyMember[];
        }, error => console.error(error));
    }

    private initNewFamilyMember() {

        this.newFamilyMember = <FamilyMember> {  
            id: 0,
            firstName: "",
            lastName: ""
        };
    }

    public requestCreateFamilyMember() {

        //Link newHousehold to the UI and send its info off to api/Households/Add
        this.http.put(this.baseUrl + 'api/Household/AddFamilyMember/' + this.household_id, this.newFamilyMember).subscribe(result => {
            this.refreshFamilyMemberList();
        }, error => console.error(error));

        this.initNewFamilyMember();
    }

    public requestDeleteFamilyMember(id: number) {

        this.http.delete(this.baseUrl + 'api/Households/DeleteFamilyMember/' + id).subscribe(result => {
            this.refreshFamilyMemberList();
        }, error => console.error(error));
    }
}

interface FamilyMember {
    id: number;
    firstName: string;
    lastName: string;
}
