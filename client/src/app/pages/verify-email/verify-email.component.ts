import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-verify-email',
	standalone: true,
	imports: [],
	templateUrl: './verify-email.component.html',
	styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
	private authService = inject(AuthService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);

	email: string | null = null;
	code: string | null = null;

	ngOnInit(): void {
		this.route.queryParams.subscribe((params: any) => {
			
			if (Object.keys(params).length) {
				this.email = params.email;
				this.code = params.code;
				
				this.authService.confirmEmail(this.email!, this.code!).subscribe({
					next: data => {
						this.router.navigateByUrl('/login');
					},
					error: err => {
						console.log(err);
						this.router.navigateByUrl('/login');
					}
				});

			} else {
				this.router.navigateByUrl('/login');
				// Do something else
			}
		});
	}
	
}
