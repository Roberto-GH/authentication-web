import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from 'rxjs/operators'
import { environment } from "src/environments/environment";
import { DetalleUserResponseModel } from "src/app/core/models/detalle-user-response.model";

@Injectable()
export class UsersService {

  apiURL = environment.apiURL;  

  constructor(private http: HttpClient){}

  getUsersList(): Observable<any> {
    return this.http.get(this.apiURL+"users").pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.apiURL+`users/${id}`).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  updateUser(user: DetalleUserResponseModel, id: number): Observable<any> {
    return this.http.put(this.apiURL+`update-user/${id}`, user).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiURL+`delete-user/${id}`).pipe(
      //tap(console.log),
      catchError(this.handleError)
    )
  }

  private handleError(error: Response) {    
    const msg = JSON.stringify(error);
    console.log(error)
    return throwError(() => msg);
  }

}