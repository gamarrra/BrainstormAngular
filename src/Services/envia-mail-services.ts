
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinfo } from 'src/app/Models/info.mode';

const HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST,',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
}
const HOST = "0.0.0.0"

@Injectable({
  providedIn: 'root'
})
export class EnviaMailServicesService {


  constructor(private _http: HttpClient) { }

  sendEmail(obj: any): Observable<Iinfo> {
    return this._http.post<Iinfo>('https://nodemon-app.herokuapp.com/sendFormData', obj, HEADERS)
    //return this._http.post<Iinfo>('http://localhost:3000/sendFormData', obj, HEADERS)
  }
}
