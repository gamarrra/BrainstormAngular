import { Injectable } from '@angular/core';

const Token_key = '@@auth0spajs@@::NZlshn18g6678aJBSzkior1rI8sOzkGh::default::openid profile email offline_access';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  setToken(token: string) {
    window.localStorage.removeItem(Token_key);
    window.localStorage.setItem(Token_key, token);
  }

  getToken() {
    const token = JSON.parse(window.localStorage.getItem(Token_key));
    return token;
  }

}
