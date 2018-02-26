import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Household } from '../models/household';
import { FamilyMember } from '../models/familymember';
import { GoodType } from '../models/goodtype';
import * as Global from '../globals';

@Component({
    selector: 'familymembers',
    templateUrl: './familymembers.component.html',
    styleUrls: ['./familymembers.component.css']
})
export class FamilyMembersComponent {

    public globals: Global.GlobalSettings;
    public newFamilyMember: FamilyMember = new FamilyMember();
    private http: Http;
    private baseUrl: string;


    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

        this.globals = Global.s;
        this.http = http;
        this.baseUrl = baseUrl;
        this.initNewFamilyMember();
        this.globals.household.loadFamilyMembers(this.http, this.baseUrl);
    }

    private initNewFamilyMember() {

        this.newFamilyMember = new FamilyMember();
    }

    public requestCreateFamilyMember() {

        Global.s.household.addFamilyMember(this.http, this.baseUrl, this.newFamilyMember, true);
        this.initNewFamilyMember();
    }

    public requestDeleteFamilyMember(family_member: FamilyMember) {

        Global.s.household.deleteFamilyMember(this.http, this.baseUrl, family_member, true);
    }
}


