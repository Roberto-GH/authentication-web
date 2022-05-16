import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDto } from 'src/app/core/models/change-password-dto';
import { EmailPasswordService } from 'src/app/core/shared/services/email-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: string = '';
  confirmPassword: string = ''; 
  tokenPassword: string = '';
  errorMessage: string = '';

  dto: ChangePasswordDto | undefined;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastr: ToastrService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {    
  }

  onChangePassword(): void {
    if(this.password != this.confirmPassword){      
        this.toastr.error("Las contraseñas no coinciden", 'FAIL', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
        return;
    }
    this.tokenPassword = this.activateRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDto(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe({
      next: (response) => {  
        this.toastr.success(response.message, 'OK', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);           
      },
      error: (error) => {             
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });
      }      
    })
    
  }

}
