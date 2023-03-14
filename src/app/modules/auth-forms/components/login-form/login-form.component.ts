import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{

  loginForm: FormGroup | undefined;

  constructor(private _fb: FormBuilder, private _authService: AuthService){

  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userName: '',
      email: ''
    })
  }

  submitForm = () =>{
    this._authService.login();
  }


}
