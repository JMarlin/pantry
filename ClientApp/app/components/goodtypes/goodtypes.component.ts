import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Household } from '../models/household';
import { FamilyMember } from '../models/familymember';
import { GoodType } from '../models/goodtype';
import * as Global from '../globals';

@Component({
    selector: 'goodtypes',
    templateUrl: './goodtypes.component.html',
    styleUrls: ['./goodtypes.component.css']
})
export class GoodTypesComponent {

    public globals: Global.GlobalSettings;
    public newGoodType: GoodType = new GoodType();
    private http: Http;
    private baseUrl: string;


    constructor(http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {

        this.globals = Global.s;
        this.http = http;
        this.baseUrl = baseUrl;
        this.initNewGoodType();
        this.globals.household.loadGoodTypes(this.http, this.baseUrl);
    }

    private initNewGoodType() {

        this.newGoodType = new GoodType();
    }

    public requestCreateGoodType() {
        
        Global.s.household.addGoodType(this.http, this.baseUrl, this.newGoodType, true);
        this.initNewGoodType();
    }
}


