import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, or, where, setDoc, doc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

/** TODO: fucking solve the issue with HTTP CLIENT */
export class FirestoreService {
  constructor(private db: Firestore, private req: HttpClient) {
    this.req = req;
  }

  sendMessage(body: any){
    console.log(body);
    return this.req.post('http://uncchspoons.net/email', JSON.parse(JSON.stringify(body)), {
      headers: {
      'Content-Type': 'application/json'
    }
  }).subscribe((res) => {
    console.log(res);
  });
}


  async register(_user: { name: string; uname: string; pword: string; ID: string; target: null; }): Promise<boolean>{
    let a = false;
    await getDocs(query(
      collection(this.db, "/usrs"),
      or(where('name', '==', _user.name),
      where('email', '==', _user.uname))
    )).then((snapshot) => {
      if(snapshot.docs.length === 0){
        a = true;
      }
    });

    if(a){

      //implement sendmessage

      this.sendMessage(_user);

      await setDoc(doc(collection(this.db, "/usrs")), {
        email: _user.uname,
        pword: _user.pword,
        isAdmin: false,
        kills: 0,
        name: _user.name,
        target: null
      });

      return true;

    } else {
      return false;
    }
  }

  async click(user: { name: string; uname: string; pword: string; kills: number; isAdmin: boolean; target: null; }, date: Date, target: null) {
    await setDoc(doc(collection(this.db, "/kill")), {
      name: user,
      date: date,
      target: target
    })
  }

  async onSubmit(uname: string, pword: string): Promise<boolean> {

    return await getDocs(query(
      collection(this.db, "usrs"),
      where('email', '==', uname),
      where('password', '==', pword)
    ))
    .then((snapshot) => {
      if(snapshot.docs.length > 0){
        return true;
      } else {
        return false;
      }
    });

  }
}
