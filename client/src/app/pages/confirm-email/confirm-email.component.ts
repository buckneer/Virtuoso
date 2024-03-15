import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-confirm-email',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './confirm-email.component.html',
	styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {


	email: string | null = null;
	sub: Subscription;
	error: string | null;
	message: string | null;
	disabled: boolean = true;

	emailForm = new FormGroup({
		email: new FormControl({value: this.email, disabled: this.disabled})
	})

	private route = inject(ActivatedRoute);
	private navbarService = inject(NavbarService);
	private authService = inject(AuthService);

	ngOnInit(): void {
		this.navbarService.hide();

		this.sub = this.route.params.subscribe(params => {
			this.email = params['email'];
			this.emailForm.setValue({
				email: this.email
			})
		});
	}
	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}


	onSubmit() {
		this.authService.sendConfirm(this.email!).subscribe({
			next: data => {
				this.message = "Email sent. Please check your email";
			},
			error: err => {
				console.log(err);
				this.error = err.message;
			}
		})
	}

}
