import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs/Observable';
import { FuseContactsContactFormDialogComponent } from '../contact-form/contact-form.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../core/animations';
import { Subscription } from 'rxjs/Subscription';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
    selector     : 'fuse-contacts-contact-list',
    templateUrl  : './contact-list.component.html',
    styleUrls    : ['./contact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class FuseContactsContactListComponent implements OnInit
{
    @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

    dataSource: PatientsDataSource | null;
    displayedColumns = ['name', 'type', 'gender', 'phone', 'dob', 'address'];
    items: Observable<any[]>;

    // onContactsChangedSubscription: Subscription;
    // onSelectedContactsChangedSubscription: Subscription;
    // onUserDataChangedSubscription: Subscription;

    dialogRef: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private contactsService: ContactsService,
        public dialog: MatDialog,
        public db: AngularFireDatabase
    )
    {
        this.items = db.list('patients').valueChanges();
        // this.dataSource = db.list('patients').valueChanges();
        // this.dataSource = this.items;

        // this.onContactsChangedSubscription =
        //     this.contactsService.onContactsChanged.subscribe(contacts => {

        //         this.contacts = contacts;

        //         this.checkboxes = {};
        //         contacts.map(contact => {
        //             this.checkboxes[contact.id] = false;
        //         });
        //     });

        // this.onSelectedContactsChangedSubscription =
        //     this.contactsService.onSelectedContactsChanged.subscribe(selectedContacts => {
        //         for ( const id in this.checkboxes )
        //         {
        //             if ( !this.checkboxes.hasOwnProperty(id) )
        //             {
        //                 continue;
        //             }

        //             this.checkboxes[id] = selectedContacts.includes(id);
        //         }
        //         this.selectedContacts = selectedContacts;
        //     });

        // this.onUserDataChangedSubscription =
        //     this.contactsService.onUserDataChanged.subscribe(user => {
        //         this.user = user;
        //     });

    }

    ngOnInit()
    {
        this.dataSource = new PatientsDataSource(this.db);
    }
}

export class PatientsDataSource extends DataSource<any>
{
    constructor(public db: AngularFireDatabase)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.db.list('patients').valueChanges();
    }

    disconnect()
    {
    }
}


