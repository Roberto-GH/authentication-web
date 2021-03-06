import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const TOKEN_KEY = 'AuthToken';
const REFRESH_TOKEN_KEY = 'RefreshToken';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) {}

  public setTokens(token: string, refreshToken: string ): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY) || '';
  }

  public getTokenRefresh(): string {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY) || '';
  }

  public isLogged(): boolean {
    if(this.getToken()) {
      return true;
    }
    return false;
  }
  
  public getEmail(): string {
    if(!this.isLogged){
      return '';
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);    
    return values.sub;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;    
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}