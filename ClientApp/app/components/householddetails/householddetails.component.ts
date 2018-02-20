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
    public familyMembers: FamilyMember[];
    public newFamilyMember: FamilyMember;
    private household_id: number;
    private http: Http;
    private baseUrl: string;
    private sub: any;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

        this.http = http;
        this.baseUrl = baseUrl;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.household_id = +params['id'];

            this.initNewFamilyMember();
            this.refreshFamilyMemberList();
        });
    }
        
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private refreshFamilyMemberList() {

        this.http.get(this.baseUrl + 'api/Household/ListFamilyMembers/' + this.household_id).subscribe(result => {
            this.familyMembers = result.json() as FamilyMember[];
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
