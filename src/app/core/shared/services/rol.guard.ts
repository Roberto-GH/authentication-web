import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { TokenService } from "src/app/core/shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class RolGuardsService implements CanActivate {

  realRol: string = '';

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRol =route.data["expectedRol"];
    
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';

    if(!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;    
  }

}