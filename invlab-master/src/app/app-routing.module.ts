import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusViewComponent } from './cus-view/cus-view.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  {path: 'item', component: ItemListComponent},
  {path:'cusview',component:CusViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
