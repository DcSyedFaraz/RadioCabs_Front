import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './dashboard/admin/layout/layout.component';
import { UserdashComponent } from './dashboard/user/userdash/userdash.component';
import { CompdashComponent } from './dashboard/company/compdash/compdash.component';
import { CompanyComponent } from './dashboard/admin/company/company.component';
import { authGuard } from './auth.guard';
import { EditComponent } from './dashboard/admin/company/edit/edit.component';
import { AdvertismentComponent } from './dashboard/admin/advertisment/advertisment.component';
import { EditADComponent } from './dashboard/admin/advertisment/editAD/editAD.component';

const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: LayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: "company", component: CompanyComponent },
      {path: "company/edit/:id", component: EditComponent},
      { path: "advertisment", component: AdvertismentComponent },
      {path: "advertisment/edit/:id", component: EditADComponent},
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
