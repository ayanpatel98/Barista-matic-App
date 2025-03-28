import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'barista-matic',
    pathMatch: 'full'
  },
  {
    path: 'barista-matic',
    loadChildren: () => import('./barista-matic/barista-matic.module').then(m => m.BaristaMaticModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
