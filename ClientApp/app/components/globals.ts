import { Household } from './models/household';

export class GlobalSettings {
    
    public household: Household;

    constructor() {
        
        this.household = new Household();
    }
}

export var s: GlobalSettings = new GlobalSettings();
