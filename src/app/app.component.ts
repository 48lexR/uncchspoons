import { Component } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirestoreService]
})
export class AppComponent {
  title = 'uncchspoons';
  loggedin = false;
}
