import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private req: HttpClient) { }

  sendMessage(body: any){
    console.log(body);
    return this.req.post('http://uncchspoons.net/email', JSON.parse(JSON.stringify(body)), {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).subscribe((res) => {
    console.log(res);
  });
  }
}
