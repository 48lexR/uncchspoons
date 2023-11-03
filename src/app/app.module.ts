import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { InfoComponent } from './info/info.component';
import { FirestoreService } from './firestore.service';
import { HttpClientModule } from '@angular/common/http';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RegisterComponent,
    LoggedinComponent,
    InfoComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})

export class AppModule { }
