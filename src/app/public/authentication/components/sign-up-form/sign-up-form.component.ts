import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUserRequestModel } from 'src/app/core/models/new-user-request.model';
import { AuthenticationService } from 'src/app/core/shared/services/authentication.service';
import { TokenService } from 'src/app/core/shared/services/token.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit { 
  
  newUser!: NewUserRequestModel;
  profile_img: string ="assets/perfil.png";
  name!: string;
  lastName!: string;
  phone!: string;  
  email!: string;  
  password!: string;  
  roles: string[] = [];
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {    
  }

  onSignUp(): void {
    this.newUser = new NewUserRequestModel(this.profile_img, this.name, this.lastName, this.phone, this.email, this.password, this.roles);
    this.authenticationService.signUp(this.newUser).subscribe({      
      error: (error) => {        
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
      },
      complete: () => {
        this.toastr.success('Cuenta creada', 'OK', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);              
      }
    })
  }  

}