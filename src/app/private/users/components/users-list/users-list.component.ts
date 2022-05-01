import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserResponseModel } from 'src/app/core/models/all-user-response.model';
import { TokenService } from 'src/app/core/shared/services/token.service';
import { UsersService } from '../../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserResponseModel[] = [];
  isAdmin = false;
  errorMessage: string = '';

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.usersList();
    this.isAdmin = this.tokenService.isAdmin();
  }  
  
  usersList(): void {    
    this.userService.getUsersList().subscribe({
      next: (response) => this.users = response,
      error: (error) => this.errorMessage = JSON.parse(error).error.message,
      complete: () => console.log("get users complete")
    })
  } 

  onDelete(id: number): void {    
    this.userService.deleteUser(id).subscribe({   
      next: (response) => console.log(response),   
      error: (error) => {
        this.errorMessage = JSON.parse(error).error.message;
        this.toastr.error(this.errorMessage, 'FAIL', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        //console.log(this.errorMessage)        
      },
      complete: () => { 
        console.log("delete USER complete")
        this.toastr.success("Usuario eliminado", 'OK', {
          timeOut: 6000,  positionClass: 'toast-top-center'
        });
        this.usersList();
      }
    })
  } 

}
