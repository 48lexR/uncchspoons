import { Component, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css'],
  providers: [FirestoreService],

})
export class LoggedinComponent {
  @Input() user = {
    name: "",
    uname: "",
    pword: "",
    kills: 0,
    isAdmin: false,
    target: null
  };
  
  constructor(private db: FirestoreService){ }

  async click(){
    let date = new Date();
    this.db.click(this.user, date, null);
  }
}
