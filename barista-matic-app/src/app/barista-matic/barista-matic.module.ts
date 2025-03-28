import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaristaMaticRoutingModule } from './barista-matic-routing.module';
import { IngredientsInventoryComponent } from './components/ingredients-inventory/ingredients-inventory.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    IngredientsInventoryComponent,
    MenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BaristaMaticRoutingModule
  ]
})
export class BaristaMaticModule { }
