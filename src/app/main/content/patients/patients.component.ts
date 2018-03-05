import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { ContactsService } from './contacts.service';
import { fuseAnimations } from '../../../core/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseContactsContactFormDialogComponent } from './contact-form/contact-form.component';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Patient } from './patient.model';
import { RaphaelsPatientsService } from './patients.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { locale as english } from './i18n/en';
import { locale as korean } from './i18n/kr';

@Component({
    selector   : 'rap-patients',
    templateUrl: './patients.component.html',
    styleUrls  : ['./patients.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RaphaelsPatientsComponent implements OnInit, OnDestroy
{
    hasSelectedContacts: boolean;
    searchInput: FormControl;
    dialogRef: any;
    onSelectedContactsChangedSubscription: Subscription;

    constructor(
        private raphaelsPatientService: RaphaelsPatientsService,
        private contactsService: ContactsService,
        public dialog: MatDialog
    )
    {

        raphaelsPatientService.getPatient(1).then(function(data) {
            console.log(data);
        });
        this.searchInput = new FormControl('');
    }

    newContact()
    {
        this.dialogRef = this.dialog.open(FuseContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this.contactsService.updateContact(response.getRawValue());

            });

    }

    ngOnInit()
    {
        this.onSelectedContactsChangedSubscription =
            this.contactsService.onSelectedContactsChanged
                .subscribe(selectedContacts => {
                    this.hasSelectedContacts = selectedContacts.length > 0;
                });

        this.searchInput.valueChanges
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.contactsService.onSearchTextChanged.next(searchText);
            });
    }

    ngOnDestroy()
    {
        this.onSelectedContactsChangedSubscription.unsubscribe();
    }
}
