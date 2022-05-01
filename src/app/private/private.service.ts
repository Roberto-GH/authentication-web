import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from 'rxjs/operators'

@Injectable()
export class PrivateService {  

  constructor(private http: HttpClient){}  

  private handleError(error: Response) {    
    const msg = JSON.stringify(error);
    return throwError(() => msg);
  }

}