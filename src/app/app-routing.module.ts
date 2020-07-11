import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrayMethodsComponent } from './components/array-methods/array-methods.component';

const routes: Routes = [
  {
    path: 'data-structures/arrays',
    component: ArrayMethodsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
