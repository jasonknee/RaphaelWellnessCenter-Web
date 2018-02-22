import { Injectable } from '@angular/core';
import * as firebase from "firebase";
// import { Patient } from "./patient.model";

@Injectable()
export class RaphaelsPatientsService
{
    // patients: Array<Patient>;


    constructor() {}

   public getPatient(userId) {
        return firebase.database().ref('/Patient/' + userId).once('value').then(function(snapshot) {
          var name = (snapshot.val() && snapshot.val().Name) || 'Anonymous';
          return name;
        });
    }


}