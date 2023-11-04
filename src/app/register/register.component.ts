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
    namec: new FormControl("", Validators.required),
    unamec: new FormControl("", [Validators.required, Validators.pattern(
      /(.*)@(.*)unc.edu/g
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
    this.user.name = String(this.register.controls['namec'].value);
    this.user.uname = String(this.register.controls['unamec'].value);
    this.user.pword = (Math.random()*256).toString(16);

    let a = await this.fs.register(this.user);

    if(a) alert("An email has been sent to your account");
    else alert("Sorry, that user already exists.")
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
