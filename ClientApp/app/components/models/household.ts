import { Http } from '@angular/http';
import { FamilyMember } from '../models/familymember';
import { GoodType } from '../models/goodtype';

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
            var temp_arr = result.json() as any[];
            this.goodTypes = temp_arr.map(input => new GoodType().from(input));
        });
    }

    public addGoodType(http: Http, baseUrl: string, good_type: GoodType, reload_from_server: boolean) {

        http.put(baseUrl + 'api/Household/AddGoodType/' + this.id, good_type).subscribe(result => {
            
            if(reload_from_server) 
                this.loadGoodTypes(http, baseUrl);

        }, error => console.error(error));
    }

    public addFamilyMember(http: Http, baseUrl: string, family_member: FamilyMember, reload_from_server: boolean) {

         //Link newHousehold to the UI and send its info off to api/Households/Add
         http.put(baseUrl + 'api/Household/AddFamilyMember/' + this.id, family_member).subscribe(result => {

            if(reload_from_server)
                this.loadFamilyMembers(http, baseUrl);

        }, error => console.error(error));
    }

    public deleteFamilyMember(http: Http, baseUrl: string, family_member: FamilyMember, reload_from_server: boolean) {

        http.delete(baseUrl + 'api/Household/DeleteFamilyMember/' + family_member.id).subscribe(result => {

            if(reload_from_server)
                this.loadFamilyMembers(http, baseUrl);

        }, error => console.error(error));
    }
}