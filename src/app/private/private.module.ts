import { NgModule } from "@angular/core";
import { SharedModule } from "../core/shared/shared.module";
import { PrivateRoutingModule } from "./private-routing.module";
import { PrivateComponent } from "./private.component";
import { PrivateService } from "./private.service";
import { UsersService } from "./users/user.service";
import { UsersListComponent } from "./users/components/users-list/users-list.component";
import { RolGuardsService } from "../core/shared/services/rol.guard";
import { interceptorProvider } from "../core/shared/services/token-interceptor.service";
import { DetalleUserComponent } from "./users/components/detalle-user/detalle-user.component";
import { EditarUserComponent } from "./users/components/editar-user/editar-user.component";

@NgModule({
  imports: [
    PrivateRoutingModule,
    SharedModule    
  ],
  declarations: [
    PrivateComponent,
    UsersListComponent,
    DetalleUserComponent,    
    EditarUserComponent
  ],
  exports: [],
  providers: [
    PrivateService,
    UsersService,
    interceptorProvider,
    RolGuardsService
  ]
})

export class PrivateModule {
  constructor() {}
}