import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './dashboard/admin/layout/layout.component';
import { UserdashComponent } from './dashboard/user/userdash/userdash.component';
import { CompdashComponent } from './dashboard/company/compdash/compdash.component';
import { CompanyComponent } from './dashboard/admin/company/company.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: LayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: "company", component: CompanyComponent }
    ]
  },
  {
    path: "user", component: UserdashComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'user' },
  },
  {
    path: "company", component: CompdashComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'company' },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
