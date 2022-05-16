import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; 
import { LoginComponent } from "./authentication/containers/login/login.component";
import { SignUpComponent } from "./authentication/containers/signup/sign-up.component";
import { HomeComponent } from "./home/containers/home.component";
import { PublicComponent } from "./public.component";
import { LoginGuard as loginGuard } from "../core/shared/services/login.guard";
import { SendEmailComponent } from "./authentication/components/send-email/send-email.component";
import { ChangePasswordComponent } from "./authentication/components/change-password/change-password.component";

const routes: Routes = [
  { path: '', component: PublicComponent, children:
    [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
      { path: 'signup', component: SignUpComponent, canActivate: [loginGuard] },
      { path: 'send-email', component: SendEmailComponent, canActivate: [loginGuard] },
      { path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [loginGuard] }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],  
  exports: [
    RouterModule
  ]  
})

export class PublicRoutingModule {
  constructor() {}
}