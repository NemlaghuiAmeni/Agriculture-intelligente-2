import { Component , OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

const Swal = require('sweetalert2');


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService,
              private router: Router, private formBuilder: FormBuilder) {
    localStorage.clear();
  }
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
  data: any;
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  submitted = false;

  UserapiUrl = 'http://localhost:3000/api/v1/users/login';
  msg: string ;
 alert: boolean = false;
  alertdanger: boolean = false;
  onSubmit() {

    this.submitted = true ;
    if (this.loginForm.valid) {
      this.http.post(this.UserapiUrl,
        {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value,
        }).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === 'err') {
          this.msg = 'wrong password or email';
        } else {
          this.msg = '' ;
          this.router.navigate(['/pages/iot-dashboard']);
          localStorage.setItem('currentUser', JSON.stringify(resJSON.data.user));
          localStorage.setItem('email', JSON.stringify(resJSON.data.user.email));
         // console.log("UserEmail: "+JSON.stringify(resJSON.data.user.email));
          localStorage.setItem('token', resJSON.token.toString());
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successfully ',
            showConfirmButton: false,
            timer: 1500,
          });

        }

      }
      , error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please check information',
            showConfirmButton: false,
            timer: 1500,
          });
      });
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],

    });

  }

  get f() {
    return this.loginForm.controls;
  }

  closeAlert() {
    this.alert = false;
  }
}
