import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [FirestoreService]
})
export class InfoComponent {

}
