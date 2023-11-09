import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, or, where, setDoc, doc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/** TODO: fucking solve the issue with HTTP CLIENT */
export class FirestoreService {
  constructor(private db: Firestore, private req: HttpClient) {
    this.req = req;
  }

  /**
   * 
   * @param body The body of an email address as a JSON file
   * @returns an Observable which can be subscribed
   */
  // sendMessage(body: any): boolean{
  //   console.log(body);
  //   this.req.post('http://uncchspoons.net/email', JSON.parse(JSON.stringify(body)), {
  //     headers: {
  //     'Content-Type': 'application/json'
  //   }
  //   }).subscribe({
  //     next : v => {
  //       console.log(v);
  //     }, 
  //     error : e => {
  //       alert(e.message)
  //       console.log(e);
  //       return false;
  //     }
  //   });
  //   return true;
  //   }

/**
 * 
 * @param _user an object with several properties
 * @returns A promise which evaluates to either true (user registered) or false (user not registered)
 */
  async register(_user: { name: string; uname: string; pword: string; ID: string; target: null; }): Promise<boolean>{
    let a = false;

    //check if user doesn't exist
    await getDocs(query(
      collection(this.db, "/usrs"),
      or(where('name', '==', _user.name),
      where('email', '==', _user.uname))
    )).then((snapshot) => {
      if(snapshot.docs.length === 0){
        a = true;
      }
    });

    if(!a) return false;
    a=true;
      //implement sendmessage

    this.req.post('http://uncchspoons.net/email', JSON.parse(JSON.stringify(_user)), {
        headers: {
        'Content-Type': 'application/json'
      }
      })
      .subscribe({
        next : async v => {
          console.log(v);   
          return await setDoc(doc(collection(this.db, "/usrs")), {
            email: _user.uname,
            pword: _user.pword,
            isAdmin: false,
            kills: 0,
            name: _user.name,
            target: null
          })
          .then(res => {
            console.log(res);
            return true;
          })
          .catch(err=>{
            alert(err.message);
            return false;
          });
       
        }, 
        error : e => {
          alert("Failed to send email: " + e.message);
          console.log(e);
          return false;
        }
      });
      return false;

    }

/**
 * @param user a user argument to be submitted
 * @param date current time
 * @param target target killed (defaults to null)
 */
  async click(user: { name: string; uname: string; pword: string; kills: number; isAdmin: boolean; target: null; }, date: Date, target: null) {
    await setDoc(doc(collection(this.db, "/kill")), {
      name: user,
      date: date,
      target: target
    })
  }

  /**
   * 
   * @param uname the username (email) of a hypothetical user
   * @param pword the password (pword) of a hypothetical user
   * @returns true (user exists/logged in) or false (user does not exist/not logged in)
   * @throws TypeError: not a string (for either uname or pword)
   */
  async onSubmit(uname: any, pword: any): Promise<boolean> {
    if(typeof uname !== "string") throw new TypeError("uname is not a string!!!");
    if(typeof pword !== "string") throw new TypeError("pword is not a string!!!");
    console.log(`${uname}, ${pword}`);
    return await getDocs(query(
      collection(this.db, "usrs"),
      where('email', '==', uname),
      where('pword', '==', pword)
    ))
    .then((snapshot) => {
      console.log(snapshot.docs.length);
      if(snapshot.docs.length > 0){
        return true;
      } else {
        return false;
      }
    });

  }
}
