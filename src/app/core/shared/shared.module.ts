import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatTabsModule,
    MatCardModule
  ],
  declarations: [
    NotFoundComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    NotFoundComponent,
    MatTabsModule,
    MatCardModule
  ],
  providers: []
})

export class SharedModule {
  constructor() {}
}