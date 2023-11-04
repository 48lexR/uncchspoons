import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../firestore.service';

export interface User{
  uname: string,
  pword: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FirestoreService],

})
export class FormComponent {
  login = new FormGroup({
    unamec: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(.*)@(.*)unc.edu/g
      )
    ]),
    pwordc: new FormControl('', Validators.required)
  });
 
  usr: any = {
    name : "",
    email: "",
    pass: "",
    kills: 0,
    isAdmin: false,
    target: null
  };
  userID = "";
  loggedin = false;

  constructor(private db: FirestoreService){ }

  async onSubmit(){
    let a = await this.db.onSubmit(this.login.controls['unamec'].getRawValue(), this.login.controls['pwordc'].getRawValue());
    
    if(!a) alert("Yeah, no user by that name.");
    else this.loggedin = true;
  }
}
