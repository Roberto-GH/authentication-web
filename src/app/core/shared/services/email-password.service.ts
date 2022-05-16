import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordDto } from '../../models/change-password-dto';
import { EmailValuesDto } from '../../models/email-values-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePasswordURL = environment.changePasswordURL;

  constructor(private HttpClient: HttpClient) { }

  sendEmail(emailValuesDto: EmailValuesDto): Observable<any> {
    return this.HttpClient.post<any>(this.changePasswordURL + 'send-email', emailValuesDto).pipe(
      //tap(console.log),
      catchError(this.handleError)
    );;
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<any> {
    return this.HttpClient.post<any>(this.changePasswordURL + 'change-password', changePasswordDto).pipe(
      //tap(console.log),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {    
    const msg = JSON.stringify(error);
    return throwError(() => msg);
  }

}
