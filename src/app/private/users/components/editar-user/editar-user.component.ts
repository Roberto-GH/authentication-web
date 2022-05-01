import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalleUserResponseModel } from 'src/app/core/models/detalle-user-response.model';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

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
    this.toEdit(id);    
  }  
  
  toEdit(id: number): void {    
    this.userService.getUser(id).subscribe({
      next: (response) => this.user = response,
      error: (error) => {
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        this.volver();
      },
      complete: () => console.log("get USER complete")
    })
  }

  onUpdate(id: number): void {    
    this.userService.updateUser(this.user, id).subscribe({   
      next: (response) => console.log(response),   
      error: (error) => {
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        console.log(this.errorMessage)        
      },
      complete: () => { 
        console.log("update USER complete")
        this.toastr.success("Usuario actualizado", 'OK', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
      }
    })
  } 

  volver(): void {
    this.router.navigate(['/web/users']);
  }

}