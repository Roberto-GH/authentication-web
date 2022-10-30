import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetResponseModel } from 'src/app/core/models/asset-response.model';
import { DetalleUserResponseModel } from 'src/app/core/models/detalle-user-response.model';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

  user!: DetalleUserResponseModel;  
  asset!: AssetResponseModel;  
  errorMessage: string = '';
  file!: File;

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
      }
    })
  }

  onUpdate(id: number): void {    
    if (this.file) {      
      this.userService.updateUserFile(this.file).subscribe({   
        next: (response) => this.asset = response,        
        error: (error) => {
          this.errorMessage = JSON.parse(error).error.message;
          this.toastr.error(this.errorMessage, 'Error al enviar imagen', {
            timeOut: 6000,  positionClass: 'toast-top-center'
          });
          console.log(this.errorMessage)        
        },
        complete: () => {          
          this.user.profile_img = this.asset.url;
          this.updateUserData(id);
        }
      })
    }else {
      if(!this.user.profile_img){
        this.user.profile_img = "assets/perfil.png";
      }
      this.updateUserData(id);
    } 
  }

  updateUserData(id: number){
    this.userService.updateUser(this.user, id).subscribe({        
      error: (error) => {
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        console.log(this.errorMessage)
      },
      complete: () => {        
        this.toastr.success("Usuario actualizado", 'OK', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
      }
    })
  }

  volver(): void {
    this.router.navigate(['/web/users']);
  }
  
  capturarFile(e:any): void {    
    this.file = e.target.files[0];
  }
}