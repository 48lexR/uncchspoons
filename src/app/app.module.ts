import { Inject, Injectable, Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, Firestore, setDoc, collection, CollectionReference, doc } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { EmailService } from './email.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { InfoComponent } from './info/info.component';

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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    HttpClientModule
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})

export class AppModule { }
