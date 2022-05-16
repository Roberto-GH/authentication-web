import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmailValuesDto } from 'src/app/core/models/email-values-dto';
import { EmailPasswordService } from 'src/app/core/shared/services/email-password.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {  

  mailTo:string = '';
  emailValuesDto: EmailValuesDto | undefined;
  errorMessage: string = '';

  constructor(
      private emailPasswordService: EmailPasswordService,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  onSendEmail(): void {
    this.emailValuesDto = new EmailValuesDto(this.mailTo);
    this.emailPasswordService.sendEmail(this.emailValuesDto).subscribe({
      next: (response) => {  
        this.toastr.success(response.message, 'OK', {
          timeOut: 6000, positionClass: 'toast-top-center'
        });            
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
