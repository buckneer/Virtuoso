import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TokenStorageService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarService } from '../services/navbar.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, CommonModule, NgIf],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	private tokenService = inject(TokenStorageService);
	private authService = inject(AuthService);
	public navbarService = inject(NavbarService);
	private router = inject(Router);

	user$: Observable<User | null>;

	ngOnInit() {
		this.user$ = this.authService.user$;
		const user = this.tokenService.getUser();

		if (user) {
			this.authService.setUser(user);
		}
	}

	onSearch(query: string) {
		if (query.trim()) {
			this.router.navigate(['/search'], { queryParams: { query } });
		}
	}

	logoutUser() {
		this.authService.logout().subscribe(
			(resp) => {
				console.log(resp);
			},
			(error: any) => {
				console.error(error);
			}
		);
	}
}
