import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Household } from '../models/household';
import { FamilyMember } from '../models/familymember';
import { GoodType } from '../models/goodtype';

@Component({
    selector: 'householddetails',
    templateUrl: './householddetails.component.html',
    styleUrls: ['./householddetails.component.css']
})
export class HouseholdDetailsComponent {

    //public household: HouseholdListComponent.Household;
    public household: Household;
    public newFamilyMember: FamilyMember = new FamilyMember();
    public newGoodType: GoodType = new GoodType();
    private household_id: number = 0;
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

        this.household.addFamilyMember(this.http, this.baseUrl, this.newFamilyMember, true);
        this.initNewFamilyMember();
    }

    public requestCreateGoodType() {
        
        this.household.addGoodType(this.http, this.baseUrl, this.newGoodType, true);
        this.initNewGoodType();
    }

    public requestDeleteFamilyMember(family_member: FamilyMember) {

        this.household.deleteFamilyMember(this.http, this.baseUrl, family_member, true);
    }
}


