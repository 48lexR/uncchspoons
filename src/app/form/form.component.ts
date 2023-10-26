import { Component, EventEmitter, Output } from '@angular/core';
import { usr } from '../form';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  unamec: FormControl = new FormControl('');
  pwordc: FormControl = new FormControl('');
  uname: string = "";
  pword: string = "";
  user: any = null;
  @Output() usrEmit = new EventEmitter<usr>();

  onsubmit(){
    this.uname = this.unamec.getRawValue();
    this.pword = this.pwordc.getRawValue();
    this.user = new usr(this.uname, this.pword);
    this.usrEmit.emit(this.user);

  }
}
