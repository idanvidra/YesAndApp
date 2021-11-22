import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://localhost:3000/api/adventuretime"

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  addGame(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/game/add-game`, body);
  }

  getAllGames(): Observable<any> {
    return this.http.get(`${BASEURL}/games`);
  }
}


