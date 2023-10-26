import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { FormControl } from '@angular/forms';
import { CollectionReference, collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  cheese = initializeApp(environment.firebase);

  namec: FormControl = new FormControl("");
  unamec: FormControl = new FormControl("");
  uname: string = "";
  name: string = "";
  pword: string = "";
  userID: string = "";
  db = getFirestore();
  usrsRef: CollectionReference = collection(this.db, "/usrs");


  async submit(){
    console.log(typeof(this.usrsRef));
    this.name = this.namec.getRawValue();
    this.uname = this.unamec.getRawValue();
    this.pword = (Math.random()*256).toString(16);
    this.userID = (Math.random()*256).toString(16);
    console.log("Here?");
    await setDoc(doc(this.usrsRef, this.userID), JSON.parse(JSON.stringify({
      email: this.uname,
      password: this.pword,
      isAdmin: false,
      kills: 0,
      name: this.name,
      target: null
    })));
  }

}
