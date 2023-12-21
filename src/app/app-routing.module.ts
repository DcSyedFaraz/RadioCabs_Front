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
import { DriverComponent } from './dashboard/admin/driver/driver.component';
import { EditDriverComponent } from './dashboard/admin/driver/editDriver/editDriver.component';
import { CreateDriverComponent } from './dashboard/admin/driver/createDriver/createDriver.component';
import { CreateADComponent } from './dashboard/admin/advertisment/createAD/createAD.component';
import { FrontlayoutComponent } from './front/frontlayout/frontlayout.component';
import { HomeComponent } from './front/home/home.component';
import { CompanylistComponent } from './front/companylist/companylist.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: "home", component: FrontlayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "companyList", component: CompanylistComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  { path: "register", component: RegisterComponent },


  {
    path: "admin", component: LayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: "company", component: CompanyComponent },
      { path: "company/edit/:id", component: EditComponent },
      { path: "advertisment", component: AdvertismentComponent },
      { path: "advertisment/create", component: CreateADComponent },
      { path: "advertisment/edit/:id", component: EditADComponent },
      { path: "driver", component: DriverComponent },
      { path: "driver/create", component: CreateDriverComponent },
      { path: "driver/edit/:id", component: EditDriverComponent },
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
    children: [
      { path: "advertisment", component: AdvertismentComponent },
      { path: "advertisment/create", component: CreateADComponent },
      { path: "advertisment/edit/:id", component: EditADComponent },
      { path: "driver", component: DriverComponent },
      { path: "driver/create", component: CreateDriverComponent },
      { path: "driver/edit/:id", component: EditDriverComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
