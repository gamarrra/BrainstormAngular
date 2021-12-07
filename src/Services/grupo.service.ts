import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igrupo } from '../app/Models/grupo';
import { Iuser } from '../app/Models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
  
export class GrupoService {

  constructor(private _http: HttpClient, private TokenService: TokenService) { }

tokenStruct = this.TokenService.getToken();
  JWT = this.tokenStruct.body.id_token;

HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'false',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.JWT
  })
}

  SendGrupo(obj: any): Observable<Igrupo> {
    return this._http.post<Igrupo>('/api/grupos' , obj, this.HEADERS)
  }

  GetAllGroups() {
    return this._http.get<Igrupo[]>('/api/grupos');
  };

  
  GetUserIfExist(obj: any) {
    return this._http.post<Iuser>('/api/usuarios/' , obj, this.HEADERS);
  };

  GetGroupById(groupId: number) {
    return this._http.get<Igrupo>('/api/grupos/' + groupId);
  };

  DeleteGroup(groupId: number): Observable<Igrupo> {
    return this._http.delete<Igrupo>('/api/grupos/' + groupId, this.HEADERS);
  };
  
  EditGroup(obj: any): Observable<Igrupo> {
    return this._http.put<Igrupo>('/api/grupos', obj, this.HEADERS);
  };

  EditGroupStatus(groupId: number, obj: any): Observable<Igrupo> {
    return this._http.put<Igrupo>('/api/grupos/' + groupId, obj, this.HEADERS); };
}
