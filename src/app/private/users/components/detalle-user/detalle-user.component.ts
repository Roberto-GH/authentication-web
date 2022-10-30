import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalleUserResponseModel } from 'src/app/core/models/detalle-user-response.model';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-detalle-user',
  templateUrl: './detalle-user.component.html',
  styleUrls: ['./detalle-user.component.scss']
})
export class DetalleUserComponent implements OnInit {

  user!: DetalleUserResponseModel;  
  errorMessage: string = '';

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,    
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.detalleUser(id);    
  }  
  
  detalleUser(id: number): void {    
    this.userService.getUser(id).subscribe({
      next: (response) => this.user = response,
      error: (error) => {
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        this.volver();
      }
    })
  } 

  volver(): void {
    this.router.navigate(['/web/users']);
  }

}