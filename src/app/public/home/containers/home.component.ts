import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/core/shared/services/token.service";
import { PublicService } from "../../public.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isLogged = false
  nombreUsuario = '';
  characters: any;
  continents: any;

  constructor(private publicService: PublicService, private tokenService: TokenService) {}

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getEmail();
    }else{
      this.isLogged = false;
      this.nombreUsuario = '';
    }
    this.getCharacters();
    this.getContinents();
  }

  getCharacters() {
    this.publicService.getCharacters().subscribe({      
      next: (response) => this.characters = response,
      error: (error) => console.error(error),
      //complete: () => console.info(this.characters)
    })
  }

  getContinents() {
    this.publicService.getContinents().subscribe({
      next: (response) => this.continents = response,
      error: (error) => console.error(error),
      //complete: () => console.info(this.continents)
    })
  }

}