import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup | undefined;
  
  constructor(private _fb: FormBuilder, private _authS: AuthService){

  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: '',
      surename: '',
      email: '',
      password: ''
    })
  }

  submitForm = ()=>{
    this._authS.register();
  }
}
