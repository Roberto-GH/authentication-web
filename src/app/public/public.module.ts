import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/shared.module";
import { HomeComponent } from "./home/containers/home.component";
import { LoginComponent } from "./login/containers/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { PublicService } from "./public.service";

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
  providers: [
    PublicService
  ]
})

export class PublicModule {
  constructor() {}
}