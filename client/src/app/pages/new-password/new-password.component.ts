import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, skip, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
	selector: 'app-new-password',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './new-password.component.html',
	styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent implements OnInit {

	code: string | null = null;
	email: string | null = null;
	error: string | null = null;
	message: string | null = null;
	counter: number = 5;

	resetForm = new FormGroup({
		password: new FormControl(),
		confirmPassword: new FormControl()
	})

	private route: ActivatedRoute = inject(ActivatedRoute);
	private router = inject(Router);
	private authService = inject(AuthService);
	private navbarService = inject(NavbarService);


	constructor () { }

	ngOnInit(): void {
		this.route.queryParams.subscribe((params: any) => {
			
			if (Object.keys(params).length) {
				this.email = params.email;
				this.code = params.code;
				// Do something with the parameters
			} else {
				this.router.navigateByUrl('/login');
				// Do something else
			}
		});

		this.navbarService.hide();
	}

	onSubmit() {
		// console.log(this.resetForm.value);
		if(this.resetForm.value.password != this.resetForm.value.confirmPassword) {
			this.error = "Password doesn't match";
			return;
		}

		if(this.resetForm.value.password && this.resetForm.value.confirmPassword) {
			this.authService.newPassword({
				email: this.email!,
				code: this.code!,
				password: this.resetForm.value.password,
			}).subscribe({next: data => {
				this.message = `Password reset. Redirecting in ${this.counter} seconds`;
				setInterval(() => {
					if(this.counter == 1) {
						this.router.navigateByUrl('login');
					} else {
						this.counter--;
					}
					this.message = `Password reset. Redirecting in ${this.counter} seconds`;
				}, 1000);
				// setTimeout(() => {

				// }, 5000);
			}, error: err => {
				console.error(err.message);
				this.error = err.error;
			}})

			
		}
	}

}
