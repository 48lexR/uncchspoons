import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FirestoreService],

})

export class RegisterComponent {

  namec: FormControl = new FormControl("");
  unamec: FormControl = new FormControl("");
  user = {
    name: "",
    uname: "",
    pword: "",
    ID: "",
    target: null
  };

  constructor(private fs: FirestoreService) { }

  async submit(){
    this.user.name = this.namec.getRawValue();
    this.user.uname = this.unamec.getRawValue();
    this.user.pword = (Math.random()*256).toString(16);
    this.user.ID = (Math.random()*256).toString(16);

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
