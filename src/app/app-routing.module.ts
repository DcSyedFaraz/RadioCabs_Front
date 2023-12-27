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
import { AdlistComponent } from './front/adlist/adlist.component';
import { FeedbackComponent } from './front/feedback/feedback.component';
import { RequestsComponent } from './dashboard/admin/Requests/Requests.component';
import { DriverListComponent } from './front/DriverList/DriverList.component';
import { SearchComponent } from './front/search/search.component';
import { DriverdashComponent } from './dashboard/driverdash/driverdash.component';
import { AdminfeedbackComponent } from './dashboard/admin/adminfeedback/adminfeedback.component';
import { ShowfeedComponent } from './dashboard/admin/adminfeedback/showfeed/showfeed.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: "home", component: FrontlayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "companyList", component: CompanylistComponent },
      { path: "adList", component: AdlistComponent },
      { path: "drivers", component: DriverListComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "search", component: SearchComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  { path: "register", component: RegisterComponent },


  {
    path: "admin", component: LayoutComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: "requests", component: RequestsComponent },
      { path: "company", component: CompanyComponent },
      { path: "company/edit/:id", component: EditComponent },
      { path: "advertisment", component: AdvertismentComponent },
      { path: "advertisment/create", component: CreateADComponent },
      { path: "advertisment/edit/:id", component: EditADComponent },
      { path: "driver", component: DriverComponent },
      { path: "driver/create", component: CreateDriverComponent },
      { path: "driver/edit/:id", component: EditDriverComponent },
      { path: "feedback", component: AdminfeedbackComponent },
      { path: "feedback/show/:id", component: ShowfeedComponent },
    ]
  },

  {
    path: "user", component: UserdashComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'user' },
    children: [
      { path: "", component: AdvertismentComponent },
      { path: "edit/:id", component: EditADComponent },
    ]
  },
  {
    path: "driver", component: DriverdashComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'driver' },
    children: [
      { path: "", component: DriverComponent },
      { path: "edit/:id", component: EditDriverComponent },
    ]
  },
  {
    path: "company", component: CompdashComponent,
    canActivate: [authGuard],
    data: { expectedRole: 'company' },
    children: [
      { path: "", component: CompanyComponent },
      { path: "edit/:id", component: EditComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
