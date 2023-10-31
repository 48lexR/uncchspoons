import { Component } from '@angular/core';
import { Firestore, getFirestore, where, collection, query, getDocs } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
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
  namec: FormControl = new FormControl('');
  unameMakec: FormControl = new FormControl("");
  uname: string = "";
  pword: string = "";
  name: string = "";
  unameMake: string = "";
  db: Firestore = getFirestore();
  usrsRef: any = collection(this.db, '/usrs');
  usrQ: any;
  snapshot: any;
  usr: any = {
    name : "",
    email: "",
    pass: "",
    kills: 0,
    isAdmin: false,
    target: null
  };
  userID: any;
  loggedin: boolean = false;
  constructor(public firestore: Firestore){ }

  async onsubmit(){
    this.uname = this.unamec.getRawValue();
    this.pword = this.pwordc.getRawValue();
    console.log(`Uname: ${this.uname}\nPword: ${this.pword}`);

    this.usrQ = query(
      this.usrsRef,
      where('email', '==', this.uname),
      where('password', '==', this.pword)
    );

    this.snapshot = await getDocs(this.usrQ).then((snapshot) => {
      if(snapshot.docs.length > 0){
        snapshot.forEach((doc) => {
          this.usr = doc.data();
        })
      } else {
        this.usr = null;
      }
    });
    
    if(this.usr === null) alert("Yeah, no user by that name.");
    else {
      this.loggedin = true;
    };
  }


}
