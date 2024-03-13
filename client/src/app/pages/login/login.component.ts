
import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../models/token';
import { TokenStorageService } from '../../services/token.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

	private authService = inject(AuthService);
	private tokenService = inject(TokenStorageService);
	private router = inject(Router);
	


	errorMessage?: string;
	success = false;
	loggedIn = false;
	message$ = this.authService.message$;

	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	}, Validators.required);


	// constructor(private authService : AuthService) {}

	ngOnInit() {
		if(this.tokenService.loggedIn()) {
			this.loggedIn = true;
		}
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
		// this.authService.changeState(this.loginForm.value.email!);
		// this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
		// .subscribe({next: data => {
		// 	if(data.access_token && data.refresh_token) {
				
		// 		this.tokenService.setToken(data.access_token);
		// 		this.tokenService.setRefresh(data.refresh_token);

		// 		this.authService.user().subscribe({
		// 			next: userData => {
		// 				this.tokenService.setUser(userData);
		// 				this.router.navigate(['/']);
		// 			},
		// 			error: err => {
		// 				console.error("Login Error: ", err);
		// 				this.errorMessage = err;
		// 			}
		// 		})
		// 	}
		// }, 
		// error: err => {
		// 	// console.error("Login Error: ", err.status);
		// 	if(err.status == 409) {
		// 		this.errorMessage = "Incorrect Login info";
		// 	} else {
		// 		this.errorMessage = "Internal Server Error";
		// 	}
		// }}) 

		// this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
      	// .subscribe((tokens: Token) => {
		//   if(tokens.access_token && tokens.refresh_token) {
		// 	this.tokenService.setToken(tokens.access_token);
		// 	this.tokenService.setRefresh(tokens.refresh_token);

		// 	this.authService.user().subscribe((user: User) => {
		// 		this.tokenService.setUser(user);
		// 		this.router.navigate(['/']);
		// 	}, (error) => {
		// 		console.error("Login Error: ", error);
		// 		this.errorMessage = error;
		// 	})
		//   }
		  
     	// },
      	// (error: any) => {
        //   console.error("Login Error: ", error);
        //   this.errorMessage = error;
      	// });
  	}

	  reloadPage(): void {
		window.location.reload();
	  }
}

