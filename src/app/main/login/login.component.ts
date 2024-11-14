import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../../@services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;

  constructor(private router: Router, private userService: UserService) { }


  showFormData() {
    console.log(this.loginGroup.value)
  }

  loginGroup: FormGroup = new FormGroup({
    account: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  changePasswordIcon() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.userService.isAdmin = true;
    this.router.navigate(['/backList']);
  }
}
