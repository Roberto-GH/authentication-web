import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/core/shared/services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {  

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {    
  }

}