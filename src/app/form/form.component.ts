import { Component } from '@angular/core';
import { Firestore, getFirestore, where } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { collection, query } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { initializeApp } from '@angular/fire/app';

export interface User{
  uname: string,
  pword: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  cheese = initializeApp(environment.firebase);
  unamec: FormControl = new FormControl('');
  pwordc: FormControl = new FormControl('');
  uname: string = "";
  pword: string = "";
  db: Firestore = getFirestore(this.cheese);
  usrsRef: any;
  constructor(public firestore: Firestore){ }

  onsubmit(){
    this.uname = this.unamec.getRawValue();
    this.pword = this.pwordc.getRawValue();

    this.usrsRef = query(
      collection(this.db, 'usrs'),
      where('email', '==', this.uname),
      where('password', '==', this.pword)
    );
    if(!this.usrsRef) alert("Yeah, no user by that name.");
    else alert("It works! Yippee!");
  }

}
