import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

	error: string | null = null;
	message: string | null = null;
	counter: number = 3;


	registerForm = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
		email: new FormControl(''),
		name: new FormControl('')
	});


	authService = inject(AuthService);
	private navbarService = inject(NavbarService);
	private router = inject(Router);

	ngOnInit() {
		this.navbarService.hide();
	}

	onSubmit() {
		this.authService.register({
			name: this.registerForm.value.name!,
			username: this.registerForm.value.username!,
			email: this.registerForm.value.email!,
			password: this.registerForm.value.password!
		}).subscribe({
			next: data => {
				this.message = `User Registered. Redirecting in ${this.counter} seconds`;
				setInterval(() => {
					if(this.counter == 1) {
						this.router.navigate(['/confirm', {email: this.registerForm.value.email}]);
					} else {
						this.counter--;
					}
					this.message = `Password reset. Redirecting in ${this.counter} seconds`;
				}, 1000);
			},
			error: err => {
				
				this.error = err.error.message;
			}
		})
	}
}
