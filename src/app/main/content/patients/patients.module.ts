import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { RaphaelsPatientsService } from './patients.service';
import { RaphaelsPatientsComponent } from './patients.component';
import { ContactsService } from './contacts.service';
import { FuseContactsMainSidenavComponent } from './sidenavs/main/main.component';
import { FuseContactsContactListComponent } from './contact-list/contact-list.component';
import { FuseContactsSelectedBarComponent } from './selected-bar/selected-bar.component';
import { FuseContactsContactFormDialogComponent } from './contact-form/contact-form.component';

const routes = [
    {
        path     : 'patients',
        component: RaphaelsPatientsComponent
    }
];

@NgModule({
    declarations: [
        RaphaelsPatientsComponent,
         FuseContactsContactListComponent,
         FuseContactsSelectedBarComponent,
         FuseContactsMainSidenavComponent,
         FuseContactsContactFormDialogComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        RaphaelsPatientsComponent,
        FuseContactsContactListComponent,
        FuseContactsSelectedBarComponent,
        FuseContactsMainSidenavComponent,
        FuseContactsContactFormDialogComponent
    ],
    providers: [
        RaphaelsPatientsService,
        ContactsService
    ],
    entryComponents: [FuseContactsContactFormDialogComponent]
})

export class RaphaelsPatientsModule
{
}
