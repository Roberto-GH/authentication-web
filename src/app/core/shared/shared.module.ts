import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "./services/authentication.service";
import { TokenService } from "./services/token.service";
import { FormsModule } from "@angular/forms";
import { MenuComponent } from "./components/menu/menu.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,    
    ToastrModule.forRoot()    
  ],
  declarations: [
    NotFoundComponent,
    MenuComponent    
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    NotFoundComponent,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    MenuComponent,    
    ToastrModule   
  ],
  providers: [
    AuthenticationService,
    TokenService,
    ToastrService   
  ]
})

export class SharedModule {
  constructor() {}
}