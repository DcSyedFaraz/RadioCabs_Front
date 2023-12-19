import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './dashboard/admin/layout/layout.component';
import { UserdashComponent } from './dashboard/user/userdash/userdash.component';
import { CompdashComponent } from './dashboard/company/compdash/compdash.component';

const routes: Routes = [
  {path:"",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"admin/dashboard",component:LayoutComponent},
  {path:"user/dashboard",component:UserdashComponent},
  {path:"company/dashboard",component:CompdashComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
