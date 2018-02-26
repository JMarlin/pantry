import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HouseholdListComponent } from './components/householdlist/householdlist.component';
import { FamilyMembersComponent } from './components/familymembers/familymembers.component';
import { GoodTypesComponent } from './components/goodtypes/goodtypes.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HouseholdListComponent,
        FamilyMembersComponent,
        GoodTypesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'households', pathMatch: 'full' },
            { path: 'households', component: HouseholdListComponent },
            { path: 'family-members', component: FamilyMembersComponent },
            { path: 'good-types', component: GoodTypesComponent },
            { path: '**', redirectTo: 'households' }
        ])
    ]
})
export class AppModuleShared {
}
