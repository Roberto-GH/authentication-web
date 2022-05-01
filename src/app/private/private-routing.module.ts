import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { UsersListComponent } from "./users/components/users-list/users-list.component";
import { RolGuardsService as rolGuard } from "../core/shared/services/rol.guard";
import { DetalleUserComponent } from "./users/components/detalle-user/detalle-user.component";
import { EditarUserComponent } from "./users/components/editar-user/editar-user.component";
import { CrearUserComponent } from "./users/components/eliminar-user/crear-user.component";


const routes: Routes = [
  { path: '', component: PrivateComponent, children:
    [       
      { path: 'users', component: UsersListComponent, canActivate: [rolGuard], data: { expectedRol: ['admin', 'user'] }},
      { path: 'user-detail/:id', component: DetalleUserComponent, canActivate: [rolGuard], data: { expectedRol: ['admin', 'user'] } },
      { path: 'user-create', component: CrearUserComponent, canActivate: [rolGuard], data: { expectedRol: ['admin'] } },      
      { path: 'user-edit/:id', component: EditarUserComponent, canActivate: [rolGuard], data: { expectedRol: ['admin'] } }         
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

export class PrivateRoutingModule {
  constructor() {}
}