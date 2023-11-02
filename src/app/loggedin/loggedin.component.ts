import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent {
  @Input() user = {
    name: "",
    uname: "",
    pword: "",
    kills: 0,
    isAdmin: false,
    ID: "",
    target: null
  };
}
