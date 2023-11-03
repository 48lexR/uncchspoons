import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
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
  unamec: FormControl = new FormControl('');
  pwordc: FormControl = new FormControl('');
  namec: FormControl = new FormControl('');
  unameMakec: FormControl = new FormControl("");
  uname = "";
  pword = "";
  name = "";
  unameMake = "";
  
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
    this.uname = this.unamec.getRawValue();
    this.pword = this.pwordc.getRawValue();

    let a = await this.db.onSubmit(this.uname, this.pword);
    
    if(!a) alert("Yeah, no user by that name.");
    else this.loggedin = true;
  }
}
