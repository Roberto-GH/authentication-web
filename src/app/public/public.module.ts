import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/shared.module";
import { LoginFormComponent } from "./authentication/components/login-form/login-form.component";
import { AuthenticationNavComponent } from "./authentication/components/authentication-nav/authentication-nav.component";
import { LoginComponent } from "./authentication/containers/login/login.component";
import { SignUpComponent } from "./authentication/containers/signup/sign-up.component";
import { HomeComponent } from "./home/containers/home.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { PublicService } from "./public.service";
import { SignUpFormComponent } from "./authentication/components/sign-up-form/sign-up-form.component";



@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule    
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,    
    SignUpComponent,
    AuthenticationNavComponent,
    SignUpFormComponent
  ],
  exports: [],
  providers: [
    PublicService
  ]
})

export class PublicModule {
  constructor() {}
}