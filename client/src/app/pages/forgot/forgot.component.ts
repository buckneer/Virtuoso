import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
	selector: 'app-forgot',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './forgot.component.html',
	styleUrl: './forgot.component.scss'
})
export class ForgotComponent implements OnInit{

	authService = inject(AuthService);
	private navbarService = inject(NavbarService);
	ngOnInit(): void {
		this.navbarService.hide();
	}

	message: string | null = null;
	error: string | null = null;

	forgotForm = new FormGroup({
		email: new FormControl('')
	}, Validators.required);

	

	onSubmit() {
		if(this.forgotForm.valid) {
			this.authService.sendForgot(this.forgotForm.value.email!).subscribe(
			{next: data => {
				console.log(data);
				this.message = "Email Sent."
			},
			error: err => {
				this.error = err.message;
				console.error(err.message);
			}});
		} else {
			this.error = "All filds are required";
		}
	}
}
