import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from 'rxjs/operators';
import { UserLoginRequestModel } from "../../models/user-login-request.model";
import { JwtResponseModel } from "../../models/jwt.model";
import { environment } from "src/environments/environment";
import { NewUserRequestModel } from "../../models/new-user-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationURL = environment.authenticationURL;

  constructor(private http: HttpClient){}

  signUp(userSignUp: NewUserRequestModel): Observable<any> {
    return this.http.post<any>(this.authenticationURL+'signup', userSignUp).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  login(userLogin: UserLoginRequestModel): Observable<any> {
    return this.http.post<JwtResponseModel>(this.authenticationURL+'login', userLogin).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  refresh(jwtResponseModel: JwtResponseModel): Observable<any> {
    return this.http.post<JwtResponseModel>(this.authenticationURL+'refresh', jwtResponseModel).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  private handleError(error: Response) {    
    const msg = JSON.stringify(error);
    return throwError(() => msg);
  }

}