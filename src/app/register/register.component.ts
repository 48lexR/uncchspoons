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
    )
  ])
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

    if(a) alert(`If an email, ${this.user.uname} exists, then an email has been sent.`);
    else alert("Sorry, your request to register could not be completed.")
  }
}
