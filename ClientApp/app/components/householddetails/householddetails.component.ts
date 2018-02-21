import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Household } from '../householdlist/householdlist.component';


@Component({
    selector: 'householddetails',
    templateUrl: './householddetails.component.html',
    styleUrls: ['./householddetails.component.css']
})
export class HouseholdDetailsComponent {

    //public household: HouseholdListComponent.Household;
    public household: Household;
    public newFamilyMember: FamilyMember;
    public newGoodType: GoodType;
    private household_id: number;
    private http: Http;
    private baseUrl: string;
    private sub: any;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

        this.http = http;
        this.baseUrl = baseUrl;
        this.household = new Household();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.household_id = +params['id'];

            this.initNewFamilyMember();
            this.initNewGoodType();
            this.loadHouseholdDetails();
        });
    }
        
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private loadHouseholdDetails() {

        this.http.get(this.baseUrl + 'api/Households/GetSingle/' + this.household_id).subscribe(result => {
            this.household = new Household().from(result.json());
            this.household.loadFamilyMembers(this.http, this.baseUrl);
            this.household.loadGoodTypes(this.http, this.baseUrl);
        }, error => console.error(error));
    }

    private initNewFamilyMember() {

        this.newFamilyMember = new FamilyMember();
    }

    private initNewGoodType() {

        this.newGoodType = new GoodType();
    }

    public requestCreateFamilyMember() {

        //Link newHousehold to the UI and send its info off to api/Households/Add
        this.http.put(this.baseUrl + 'api/Household/AddFamilyMember/' + this.household_id, this.newFamilyMember).subscribe(result => {
            this.household.loadFamilyMembers(this.http, this.baseUrl);
        }, error => console.error(error));

        this.initNewFamilyMember();
    }

    public requestCreateGoodType() {
        
        this.http.put(this.baseUrl + 'api/Household/AddGoodType/' + this.household_id, this.newGoodType).subscribe(result => {
            this.household.loadGoodTypes(this.http, this.baseUrl);
        }, error => console.error(error));

        this.initNewGoodType();
    }

    public requestDeleteFamilyMember(family_member: FamilyMember) {

        this.http.delete(this.baseUrl + 'api/Household/DeleteFamilyMember/' + family_member.id).subscribe(result => {
            this.household.loadFamilyMembers(this.http, this.baseUrl);
        }, error => console.error(error));
    }
}

export class GoodType {
    id: number;
    name: string;
    defaultmeasure: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.defaultMeasure = "";
    }

    public from(input: any) {

        this.id = input.id;
        this.name = input.name;
        this.defaultmeasure = input.defaultmeasure;

        return this;
    }
}

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
