import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component'

const routes: Routes = [
  {
    path: "",
    redirectTo: "/users",
    pathMatch: "full"
  },
  {
    path: "users",
    // component: UserComponent
    loadChildren: () => import("./components/user/user.module").then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
