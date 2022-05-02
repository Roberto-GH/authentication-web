import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, concatMap, Observable, throwError } from "rxjs";
import { TokenService } from "src/app/core/shared/services/token.service";
import { JwtResponseModel } from "../../models/jwt.model";
import { AuthenticationService } from "./authentication.service";

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }
    let intReq = req;
    const token = this.tokenService.getToken();   
    intReq =  this.addToken(req, token);
   
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtResponseModel = new JwtResponseModel(this.tokenService.getToken());
        return this.authenticationService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing...');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(() => err);
      }      
    }));
  }  


  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone(({headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)}))
  }


}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}]