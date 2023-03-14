import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthFormsModule } from '../../auth-forms/auth-forms.module';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    //Módulo personalizado de formularios de auth
    //Auth Forms Module para poder usar los componentes login y register forms
    AuthFormsModule
  ]
})
export class AuthModule { }
