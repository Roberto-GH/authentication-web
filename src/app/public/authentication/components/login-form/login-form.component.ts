import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLoginRequestModel } from 'src/app/core/models/user-login-request.model';
import { AuthenticationService } from 'src/app/core/shared/services/authentication.service';
import { TokenService } from 'src/app/core/shared/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit { 
  
  loginUser: UserLoginRequestModel = {email: '', password: ''};
  email: string = '';
  password: string = '';
  roles: string[] = [];
  errorMessage: string = '';

  constructor(private tokenService: TokenService, 
              private authenticationService: AuthenticationService, 
              private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {    
  }

  onLogin(): void {
    this.loginUser = new UserLoginRequestModel(this.email, this.password);
    this.authenticationService.login(this.loginUser).subscribe({
      next: (response) => {        
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);        
      },
      error: (error) => {             
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
      },
      complete: () => {        
        this.toastr.success('Bienvenido '+ this.email, 'OK', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });      
      }
    })
  }  

}
