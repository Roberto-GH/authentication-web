import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/shared.module";
import { HomeComponent } from "./home/containers/home.component";
import { LoginComponent } from "./login/containers/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";

@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule    
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [],
  providers: []
})

export class PublicModule {
  constructor() {}
}