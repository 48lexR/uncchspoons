import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FirestoreService],

})

export class RegisterComponent {

  register = new FormGroup({
    namec: new FormControl("",[ Validators.required, Validators.pattern(
      new RegExp("(.*) (.*)"))
    ]),
    unamec: new FormControl("", [Validators.required, Validators.pattern(
      new RegExp("(.*)@(.*)unc.edu")
    )])
  });
  user = {
    name: "",
    uname: "",
    pword: "",
    ID: "",
    target: null
  };

  constructor(private fs: FirestoreService) { }

  async submit(){
    if(
      this.register.controls["unamec"].errors || 
      this.register.controls['namec'].errors) 
      {
        alert(`Name ${this.register.controls['namec'].value} or Username ${this.register.controls['unamec'].value} invalid. Make sure to type your first and last name, then your @unc.edu email.`);
        console.log(`Username ${this.register.controls["unamec"].value} error`);
        console.log(`Name ${this.register.controls["namec"].value} error`);
        return;
      }
    this.user.name = String(this.register.controls['namec'].value);
    this.user.uname = String(this.register.controls['unamec'].value);
    console.log(this.user.uname);
    this.user.pword = (Math.random()*256).toString(16);

    let a = await this.fs.register(this.user);

    if(a) alert("An email has been sent to your account");
    else alert("Sorry, your request to register could not be completed.")
  }
    //make sure this user DOESN'T already exist


  //   let a = false;
  //   await getDocs(query(
  //     this.usrs,
  //     or(where('name', '==', this.user.name),
  //     where('email', '==', this.user.uname))
  //   )).then((snapshot) => {
  //     if(snapshot.docs.length === 0){
  //       a = true;
  //     }
  //   });

  //   if(a){
  //     this.emailer.sendMessage(this.user);
  //     await setDoc(doc(this.usrs), {
  //       email: this.user.uname,
  //       pword: this.user.pword,
  //       isAdmin: false,
  //       kills: 0,
  //       name: this.user.name,
  //       target: null
  //     });
  //   } else {
  //     alert("Sorry, that email or user already exists.");
  //   }
  // }
}
