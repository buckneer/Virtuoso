
import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../models/token';
import { TokenStorageService } from '../../services/token.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

	private authService = inject(AuthService);
	private tokenService = inject(TokenStorageService);
	private router = inject(Router);
	private navbarService = inject(NavbarService);
	


	errorMessage?: string;
	success = false;
	loggedIn = false;

	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	}, Validators.required);


	// constructor(private authService : AuthService) {}

	ngOnInit() {
		if(this.tokenService.loggedIn()) {
			this.loggedIn = true;
		}

		this.navbarService.hide();
	}

	onSubmit() {
		this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(
			{next: data => {
				this.router.navigateByUrl('/');
			},
			error: err => {
				if(err.status == 409) {
					this.errorMessage = "Incorrect Login info";
				} else {
					this.errorMessage = "Internal Server Error";
				}
			}}
		)
  	}

	  reloadPage(): void {
		window.location.reload();
	  }
}

