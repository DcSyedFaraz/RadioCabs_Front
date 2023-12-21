import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './dashboard/admin/layout/layout.component';
import { UserdashComponent } from './dashboard/user/userdash/userdash.component';
import { CompdashComponent } from './dashboard/company/compdash/compdash.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ModuleModule } from './module/module.module';
import { CompanyComponent } from './dashboard/admin/company/company.component';
import { EditComponent } from './dashboard/admin/company/edit/edit.component';
import { EditADComponent } from './dashboard/admin/advertisment/editAD/editAD.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    UserdashComponent,
    CompdashComponent,
    EditComponent,
    EditADComponent
  ],
  imports: [
    ModuleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
