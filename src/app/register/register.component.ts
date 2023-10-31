import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionReference, Firestore, collection, doc, getDocs, getFirestore, or, query, setDoc, where } from '@angular/fire/firestore';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [EmailService]
})

export class RegisterComponent {
  // cheese = initializeApp(environment.firebase);
  namec: FormControl = new FormControl("");
  unamec: FormControl = new FormControl("");
  user = {
    name: "",
    uname: "",
    pword: "",
    ID: ""
  };
  db: Firestore = getFirestore();
  usrs: CollectionReference = collection(this.db, "/usrs");

  constructor(private emailer: EmailService) { }

  async submit(){
    this.user.name = this.namec.getRawValue();
    this.user.uname = this.unamec.getRawValue();
    this.user.pword = (Math.random()*256).toString(16);
    this.user.ID = (Math.random()*256).toString(16);

    //make sure this user DOESN'T already exist
    let a = false;
    await getDocs(query(
      this.usrs,
      or(where('name', '==', this.user.name),
      where('email', '==', this.user.uname))
    )).then((snapshot) => {
      if(snapshot.docs.length === 0){
        a = true;
      }
    });

    if(a){
      this.emailer.sendMessage(this.user);
      await setDoc(doc(this.usrs, this.user.ID), JSON.parse(JSON.stringify({
        email: this.user.uname,
        pword: this.user.pword,
        isAdmin: false,
        kills: 0,
        name: this.user.name,
        target: null
      })));
    } else {
      alert("Sorry, that email or user already exists.");
    }
  }
}
