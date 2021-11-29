import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = "http://localhost:3000/api/adventuretime";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  // send message from sender to reciever
  SendMessage(senderId:any, receiverId:any, receiverName:any, message:any): Observable<any> {
    return this.http.post(`${BASEURL}/chat-message/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    })
  }
}
